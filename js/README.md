# JavaScript
This is mainly intended for beginners looking into exploring the web development journey.

If you already have basic knowledge about JavaScript, this will serve as a re-introduction to the fundamentals.

## Guide
Below are the recommended resources to have you achieve fundamental understanding of JavaScript programming language.

1. Introduction to JavaScript: [Download Handbook](https://flaviocopes.pages.dev/books/js-handbook.pdf)
2. DOM manipulation: [Read article](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
3. Crash Course - Youtube: [Watch tutorial](https://www.youtube.com/watch?v=hdI2bqOjy3c)

At this point, you should be able to demonstrate basic understanding of the language fundamentals in building something of your own.

## Session
This section takes you through the project that was made during the session.

1. Open the browser on your computer.
2. Go to [LiveCode](https://henryhale.github.io/livecode) in a new tab.
3. Feel free to play with the existing demo and code.
4. Edit the files to contain the following examples - one at a time:

### 1. Counter

**index.html**

```html
<div>
 <h1>Hello Dev!</h1>
 <button id="btn">Count: 0</button>
</div>
```

**main.js**
```js
let count = 0;
let step = 1;

let btn = document.getElementById('btn');

function onClick() {
 count += step;
 btn.textContent = "Count: " + count;
}

btn.onclick = onClick;
```

### 2. Show/Hide

**index.html**

```html
<div>
 <h1>Hello Dev!</h1>
 <button id="btn">Show</button>
 <p id="content" style="display: none">The computer doesn't know that you are missing a semicolon. It sees what looks like two instructions in a row and assume you meant for them to be two separate instructions. But it could be something else, and the computer tells you about the problem so you make it clear what you want, instead of fixing it without telling you and ending up with a code that doesn't do what you want.</p>
</div>
```

**main.js**
```js
let display = false;

let btn = document.getElementById('btn');
let content = document.getElementById('content');

function onClick() {
  display = display ? false : true;
  content.style.display = display ? 'block' : 'none';
  btn.textContent = display ? 'Hide' : 'Show';
}

btn.onclick = onClick;
```

## Issues
In case of any issue or error, kindly [open an issue](https://github.com/kyucs/sessions/issues/new).
