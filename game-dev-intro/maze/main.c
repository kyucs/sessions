/* *
 * game: maze
 *
 * This file contains source code for the console
 * maze game written in C
 *
 * controls:
 * 	i - UP
 *  j - LEFT
 *  k - DOWN
 *  l - RIGHT
 *
 *  q - exit/quit
 */

#include <stdio.h>	// for scanf(), printf(),
#include <stdlib.h> // for exit(), EXIT_SUCCESS, system()

/* *
 * A grid to represent the game's world space
 *
 * 	0 - space
 * 	1 - wall
 */
int grid[4][4] = {
	{0, 1, 0, 1},
	{0, 0, 1, 0},
	{1, 0, 0, 1},
	{0, 0, 1, 1},
};

/* *
 * Define the dimensions of the grid
 */
const int origin[2] = {0, 0};
const int width = 4;
const int height = 4;

/* *
 * Define the player and target initial positions within the space
 */
int player[2] = {0, 0};
int target[2] = {3, 0};

/* *
 * A function to check if the player's move match
 */
int wallCollision()
{
	return grid[player[0]][player[1]] == 1;
}

/* *
 * A function to capture user input and update the game state
 */
void getAction()
{
	char c;
	printf("\nmove: ");
	scanf("%c", &c);

	/* *
	 * check if the input character matches the expected options
	 * 
	 * movements:
	 * 	- apply movement
	 *  - check if player is off grid or collided with a wall
	 *  - if so, reverse the movement
	 */
	switch (c)
	{
	case 'i': // move top
		if (--player[0] < origin[0] || wallCollision())
		{
			++player[0];
		}
		break;
	case 'j': // move left
		if (--player[1] < origin[1] || wallCollision())
		{
			++player[1];
		}
		break;
	case 'k': // move bottom
		if (++player[0] == height || wallCollision())
		{
			--player[0];
		}
		break;
	case 'l': // move right
		if (++player[1] == width || wallCollision())
		{
			--player[1];
		}
		break;
	case 'q': // quit game
		printf("Bye!\n");
		exit(EXIT_SUCCESS);
		break;
	default:
		break;
	}
}

/* *
 * A function to display the current state of the game
 */
void render()
{
	// [hack] clear the entire screen on windows & unix based os
	system("cls=clear; clear");

	printf("\n");

	// go through each row in the grid
	for (int row = 0; row < 4; row++)
	{

		// go through each column in the row
		for (int col = 0; col < 4; col++)
		{

			// check if it's the player's position
			if (row == player[0] && col == player[1])
			{
				printf("| * ");
				continue;
			}

			// check if it is the target position
			if (row == target[0] && col == target[1])
			{
				printf("| = ");
				continue;
			}

			// check if there is a wall or not
			int value = grid[row][col];
			if (value == 0)
			{
				printf("|   ");
			}
			else if (value == 1)
			{
				printf("| # ");
			}
		}

		// move the next line after each row
		printf("|\n");
	}
}

/* *
 * A function to determine if the player has reached the target - win
 */
int hasWon()
{
	if (player[0] == target[0] && player[1] == target[1])
	{
		printf("\n");
		printf("*************\n");
		printf("**** WIN ****\n");
		printf("*************\n");
		printf("\n");
		return 1; // win - true
	}
	else
	{
		return 0; // win - false
	}
}

/* *
 * A function to start a game loop that breaks when the player wins
 */
void gameloop()
{
	while (!hasWon())
	{
		render();
		getAction();
	}
}

/**
 * program entry point
 */
int main(void)
{
	// start the game
	gameloop();

	return (0);
}
