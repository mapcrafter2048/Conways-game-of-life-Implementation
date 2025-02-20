# Conway's Game of Life

Welcome to the `conways-game-of-life` project! This repository contains an implementation of Conway's Game of Life, a cellular automaton devised by the mathematician John Horton Conway.

## What is Conway's Game of Life?

Conway's Game of Life is a zero-player game that simulates the evolution of a population of cells on a grid. The game follows a set of simple rules that determine the state of each cell in the next generation based on its current state and the states of its eight neighbors.

## Getting Started

To get started with the `conways-game-of-life` project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/conways-game-of-life.git`
2. Navigate to the project directory: `cd conways-game-of-life`
3. Install the dependencies: `npm install`
4. Run the game: `npm start`

## Rules of the Game

The rules of Conway's Game of Life are as follows:

1. Any live cell with fewer than two live neighbors dies, as if by underpopulation.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
