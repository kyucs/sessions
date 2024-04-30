/**
 * Introduction to Game Development
 *              with 
 *          HTML5 Canvas
 *               &
 *           JavaScript
 */

// get reference to the canvas
const canvas = document.querySelector('canvas');

// get rendering context
const ctx = canvas.getContext('2d');

// store canvas dimensions
const width = canvas.width;
const height = canvas.height;

// game state
const state = {
    score: 0,
    playing: false,
    bounce: false,
    gameover: false,
    reset() {
        this.score = 0;
        this.playing = true;
        this.gameover = false;
        player.reset();
        walls.reset();
    },
    render() {
        ctx.beginPath();
        ctx.fillStyle = '#999';
        ctx.font = '1rem serif';
        ctx.textAlign = 'left';
        ctx.fillText('Score: ' + this.score, 10, 20);
        ctx.closePath();
    }
};

// game objects

// bottom - ground
const ground = {
    x: 0,
    y: height * 0.9,
    h: height * 0.1,
    w: width,
    color: '#333',
    render() {
        ctx.beginPath();
        ctx.fillStyle = '#444';
        ctx.fillRect(this.x, this.y, this.w, this.y + 0.2 * this.h);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y + 0.2 * this.h, this.w, 0.8 * this.h);
        ctx.closePath();
    }
};

// character
const player = {
    x: width * 0.5,
    y: height * 0.5,
    radius: 12,
    color: '#00ff00',
    friction: 0.9,
    gravity: 0.9,
    vx: 1,
    vy: 1,
    frames: (() => {
        const idle = new Image();
        idle.src = '/img/ducky-idle.png';
        const walk = new Image();
        walk.src = '/img/ducky-walk.png';
        return [idle, walk];
    })(),
    frame: {
        width: 50,
        height: 50,
        current: 0,
    },
    reset() {
        this.x = width * 0.5;
        this.y = height * 0.5;
        this.vx = 1;
        this.vy = 1;
    },
    render() {
        //ctx.beginPath();
        // ctx.strokeStyle = this.color;
        // ctx.arc(this.x, this.y, this.radius, -Math.PI, Math.PI);
        // ctx.fill();
        // ctx.stroke();
        // ctx.closePath();
        const sprite = this.frames[this.vy === 0 ? 0 : 1];
        ctx.drawImage(sprite, 0, 0, this.frame.width, this.frame.height, this.x - this.radius*1.5, this.y - this.radius*2.5, this.frame.width, this.frame.height);
    },
    update(dt) {
        this.vy += this.gravity;
        this.y += this.vy * dt;

        // this.x += this.vx * dt;

        // collisions
        // - horizontal
        if (this.x < this.radius) {
            this.x = this.radius;
            this.vx *= -this.friction;
        }
        if (this.x > width - this.radius) {
            this.x = width - this.radius;
            this.vx *= -this.friction;
        }
        // - vertical
        if (this.y < this.radius) {
            this.y = this.radius;
            this.vy *= -this.friction;
        }
        if (this.y > ground.y - this.radius) {
            this.y = ground.y - this.radius;
            // this.vy *= -this.friction;
            this.vy *= 0;

            if (state.bounce) {
                state.bounce = false;
                if (Math.ceil(this.vy) === 0) this.vy = -15;
                this.vy *= 1.25;
            }
            // console.log(Math.ceil(this.vy), this.vy, Math.floor(this.vy));
        }
    }
};

// obstacles
const walls = {
    speed: 4,
    maxH: 100,
    minH: 10,
    maxW: 30,
    minW: 10,
    color: 'coral',
    blocks: [],
    reset() {
        this.blocks = [
            { x: width * 0.9, y: ground.y - 60, height: 60, width: 10 },
            { x: width * 1.6, y: ground.y - 40, height: 40, width: 5 }
        ];
    },
    render() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        this.blocks.forEach(block => {
            ctx.fillRect(block.x, block.y, block.width, block.height);
        });
        ctx.closePath();
    },
    update() {
        this.blocks.forEach(block => {
            block.x -= walls.speed;
            if (block.x < -10) {
                block.x = width + 10;
                block.height = Math.floor(Math.random() * walls.maxH + walls.minH);
                block.width = Math.floor(Math.random() * walls.maxW + walls.minW);
                block.y = ground.y - block.height;
                // increase player's score
                ++state.score;
            }
            if (this.rectCircleColliding(block, player)) {
                state.gameover = true;
                state.playing = false;
            }
        });
    },
    rectCircleColliding(rect, circle) {
        // find the closest point to the circle within the rectangle
        const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

        // calculate the distance between the circle's center and this closest point
        const distanceX = circle.x - closestX;
        const distanceY = circle.y - closestY;

        // if the distance is less than the circle's radius, they have collided
        return (distanceX * distanceX + distanceY * distanceY) < (circle.radius * circle.radius);
    }
};

// function to render objects on the screen
function render() {
    // clear previous frame
    ctx.clearRect(0, 0, width, height);

    // display the ground
    ground.render();

    // render wall blocks
    walls.render();

    // display the player
    player.render();

    // display score
    state.render();

    // if the game is over
    if (state.gameover) {
        ctx.beginPath();
        ctx.fillStyle = 'yellow';
        ctx.font = '2rem serif';
        ctx.textAlign = 'center';
        ctx.fillText("Game Over", width * 0.5, height * 0.5)
        ctx.closePath();
    }

}

// function to update state of objects
function update(dt) {
    // check state
    if (!state.playing) {
        return;
    }

    // update blocks
    walls.update();

    // update player's motion
    player.update(dt);
}

// game loop
let handle;

function loop() {
    update(1); // assume dt = 1 unit
    render();
    handle = requestAnimationFrame(loop);
}

// cleanup resources
document.onbeforeunload = () => cancelAnimationFrame(handle);

// setup controls
document.addEventListener('keydown', (ev) => {
    const key = ev.key;
    // console.log(key);

    if (key == ' ') {
        ev.preventDefault();
        if (!state.playing) {
            state.reset();
        } else {
            state.bounce = true;
        }
    }
});

// initiate game loop
loop();
