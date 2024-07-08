import { useCallback, useRef, useState } from "react";
import { COLS, createEmptyGrid, DIRECTIONS, ROWS } from "./utils/utils";
import { twMerge } from "tailwind-merge";
import { PlayPauseButton } from "./components/PlayPauseButton";
import { Button } from "./components/Button";

function App() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  const runGameOfLife = useCallback(() => {
    if (!playingRef.current) {
      return;
    }

    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((arr) => [...arr]);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          let neighbours = 0;
          DIRECTIONS.forEach(([directionX, directionY]) => {
            const newRow = row + directionX;
            const newCol = col + directionY;

            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
              neighbours += currentGrid[newRow][newCol] ? 1 : 0;
            }
          });

          if (neighbours < 2 || neighbours > 3) {
            newGrid[row][col] = 0;
          } else if (currentGrid[row][col] === 0 && neighbours === 3) {
            newGrid[row][col] = 1;
          }
        }
      }

      return newGrid;
    });

    setTimeout(runGameOfLife, 100);
  }, [playingRef, setGrid]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const toggleCellState = (row: number, col: number) => {
    const newGrid = grid.map((arr, rowIndex) =>
      arr.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (cell ? 0 : 1) : cell
      )
    );
    setGrid(newGrid);
  };
  const handleMouseEnter = (row: number, col: number) => {
    if (isMouseDown) {
      toggleCellState(row, col);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center p-4 bg-blue-500 flex-col gap-4">
      <h1 className="md:text-2xl text-xl">Conway's Game of Life</h1>
      <div className="flex gap-4 items-center">
        <PlayPauseButton
          isPlaying={isPlaying}
          onClick={() => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
              playingRef.current = true;
              runGameOfLife();
            }
          }}
        />
        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < ROWS; i++) {
              rows.push(
                Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Seed
        </Button>
        <Button
          onClick={() => {
            setGrid(createEmptyGrid());
            setIsPlaying(false);
          }}
        >
          Clear
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`,
          gridTemplateRows: `repeat(${ROWS}, 20px)`,
        }}
      >
        {grid.map((rows, originalRowIndex) =>
          rows.map((col, originalColIndex) => (
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={() => {
                handleMouseEnter(originalRowIndex, originalColIndex);
              }}
              onClick={() => {
                toggleCellState(originalRowIndex, originalColIndex);
              }}
              key={`${originalRowIndex} - ${originalColIndex}`}
              className={twMerge(
                "border border-[#9050e9]",
                grid[originalRowIndex][originalColIndex]
                  ? ["bg-[#9050e9]"]
                  : ["bg-[#240643]"]
              )}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
