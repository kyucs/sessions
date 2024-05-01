#include<stdio.h>
#include<stdlib.h>

int grid[4][4] = {
	{ 0, 1, 0, 1 },
	{ 0, 0, 1, 0 },
	{ 1, 0, 0, 1 },
	{ 0, 0, 1, 1 },
};

int player[2] = { 0, 0 };
int target[2] = { 3, 0 };

void getAction() {
	char c;
	scanf("%c", &c);
	switch(c) {
		case 'i': // top
			--player[0];
			break;
		case 'j': // left
			--player[1];
			break;
		case 'k': // bottom
			++player[0];
			break;
		case 'l': // right
			++player[1];
			break;
		case 'q': // quit
			printf("Bye!\n");
			exit(EXIT_SUCCESS);
			break;
		default:
			break;
	}
}

void render() {
	system("clear");
	for(int row = 0; row < 4; row++) {
		for(int col = 0; col < 4; col++) {
			if(row == player[0] && col == player[1]) {
				printf("| *");
				continue;
			}
			if (row == target[0] && col == target[1]) {
				printf("| =");
				continue;
			}
			int value = grid[row][col];
			if(value == 0) {
				printf("|  ");
			} else if (value == 1) {
				printf("| #");
			}
		}
		printf(" |\n");
	}
}

void gameloop() {
	render();
	getAction();
	checkForWin();
	gameloop();
}

void checkForWin() {
	if(player[0] == target[0] && player[1] == target[1]) {
		printf("*************\n");
		printf("**** WIN ****\n");
		printf("*************\n");
		exit(EXIT_SUCCESS);
	}
}


int main(void) {

	gameloop();

	return (0);
}
