import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
function SnakeGame() {
  const [grid, setGrid] = useState(new Array(20).fill(new Array(20).fill()));
  const [snakeBody, setSnakeBody] = useState([
    [5, 5],

  ]);
  console.log(grid);
  function isSnakeBody(x, y) {
    return snakeBody?.some(([xc, yc]) => {
      return xc === x && yc === y;
    });
  }
  const generateFood = () => {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return [x, y];
  };
  console.log(snakeBody);
  const moveRef = useRef([1, 0]);
  const foodRef = useRef(generateFood());
  console.log(moveRef);
  useEffect(() => {
    const timer = setInterval(() => {
      setSnakeBody((prevSnakeBody) => {
        const head = [
          prevSnakeBody[0][0] + moveRef.current[0],
          prevSnakeBody[0][1] + moveRef.current[1],
        ];
        
        if (
          head[1] >= grid.length ||
          head[1] < 0 ||
          head[0] >= grid.length ||
          head[0] < 0 || prevSnakeBody.some(([x,y])=>{
            return head[0] === x && head[1] === y;
          })
        ) {
          moveRef.current = [-1, 0];
          return [
            [5, 5],
            
          ];
        }
        const copySnakeBody = prevSnakeBody?.map((elem) => {
          return [...elem];
        });
        if(head[0] === foodRef.current[0] && head[1] === foodRef.current[1]){
          foodRef.current = generateFood();
      }
      else{
        
        copySnakeBody.pop();
      }
        copySnakeBody.unshift(head);
        console.log("copy", copySnakeBody);
        return copySnakeBody; // Return the new snake body so that the state gets updated
      });
    }, 100);
    const handleDirection = (e) => {
      const key = e.key;
      console.log(key);
      if (key === "ArrowLeft" && moveRef.current[1] != 1) {
        moveRef.current = [0, -1];
      } else if (key === "ArrowUp" && moveRef.current[0] != 1) {
        moveRef.current = [-1, 0];
      } else if (key === "ArrowRight" && moveRef.current[1] != -1) {
        moveRef.current = [0, 1];
      } else if (key === "ArrowDown" && moveRef.current[0] != -1) {
        moveRef.current = [1, 0];
      }
    };
    window.addEventListener("keydown", handleDirection);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="container">
        {grid.map((row, x) => {
          return row.map((elem, y) => {
            return (
              <div
                className={`cell ${isSnakeBody(x, y) && "snake"} ${
                  foodRef.current[0] === x && foodRef.current[1] === y
                    ? "food"
                    : ""
                }`}
              ></div>
            );
          });
        })}
      </div>
    </>
  );
}

export default SnakeGame;

// import { useEffect, useRef, useState } from "react";

// function App() {
//   const divRef = useRef(null);
//   const [position, setPosition] = useState({
//     left: 200,
//     top: 200,
//   });
//   const [score, setScore] = useState(0);
//   const [direction, setDirection] = useState("up");
//   const [foodPosition, setFoodPosition] = useState({
//     top: 0,
//     left: 0,
//   });
//   const [isEat, setIsEat] = useState(false);
//   const [Timer , setTimer] = useState(100);
//   const handleDirection = (e) => {
//     if (e.key === "ArrowRight") {
//       setDirection("right");
//     } else if (e.key === "ArrowLeft") {
//       setDirection("left");
//     } else if (e.key === "ArrowUp") {
//       setDirection("up");
//     } else if (e.key === "ArrowDown") {
//       setDirection("down");
//     }
//   };

//   const moveSnakeDown = () => {
//     setPosition((prevPos) => {
//       const newTop = prevPos.top + 5;
//       if (newTop <= 390) return { ...prevPos, top: newTop };
//       else{
//         resetGame();
//       }
//       return prevPos;
//     });
//   };

//   const moveSnakeLeft = () => {
//     setPosition((prevPos) => {
//       const newLeft = prevPos.left - 5;
//       if (newLeft >= 0) return { ...prevPos, left: newLeft };
//       else{
//         resetGame();
//       }
//       return prevPos;
//     });
//   };

//   const moveSnakeRight = () => {
//     setPosition((prevPos) => {
//       const newLeft = prevPos.left + 5;
//       if (newLeft <= 390) return { ...prevPos, left: newLeft };
//       else{
//         resetGame();
//       }
//       return prevPos;
//     });
//   };

//   const moveSnakeUp = () => {
//     setPosition((prevPos) => {
//       const newTop = prevPos.top - 5;
//       if (newTop >= 0) return { ...prevPos, top: newTop };
//       else{
//         resetGame();
//       }
//       return prevPos;
//     });
//   };

//   useEffect(() => {
//     getSnackFood();
//   }, [isEat]);

//   const getSnackFood = () => {
//     let foodXposition = Math.floor(Math.random() * 78) * 5;
//     let foodYposition = Math.floor(Math.random() * 78) * 5;
//     setFoodPosition({ top: foodYposition, left: foodXposition });
//     setIsEat(false);
//   };

//   const isFoodEat = () => {
//     if (position.top === foodPosition.top && position.left === foodPosition.left) {
//       setScore((prev) => prev + 1);
//       setIsEat(true);
//       Timer > 50 && setTimer(prev=> prev-30);
//     }
//   };
//   function resetGame(){
//     window.location.reload();

//   }
//   useEffect(() => {
//     divRef.current.focus();
//     let timer = null;
//     if (direction === "right") {
//       timer = setInterval(() => {
//         moveSnakeRight();
//         isFoodEat();
//       }, Timer);
//     } else if (direction === "left") {
//       timer = setInterval(() => {
//         moveSnakeLeft();
//         isFoodEat();
//       }, Timer);
//     } else if (direction === "up") {
//       timer = setInterval(() => {
//         moveSnakeUp();
//         isFoodEat();
//       }, Timer);
//     } else if (direction === "down") {
//       timer = setInterval(() => {
//         moveSnakeDown();
//         isFoodEat();
//       }, Timer);
//     }
//     return () => {
//       clearInterval(timer);
//     };
//   }, [direction, position]);

//   return (
//     <>
//       <div
//         ref={divRef}
//         style={{
//           height: "400px",
//           width: "400px",
//           border: "1px solid black",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           position: "relative",
//         }}
//         tabIndex={0}
//         onKeyDown={handleDirection}
//       >
//         <div
//           style={{
//             height: "10px",
//             width: "10px",
//             backgroundColor: "blue",
//             position: "absolute",
//             top: `${position.top}px`,
//             left: `${position.left}px`,
//           }}
//         ></div>
//         <div
//           style={{
//             height: "10px",
//             width: "10px",
//             backgroundColor: "red",
//             position: "absolute",
//             top: `${foodPosition.top}px`,
//             left: `${foodPosition.left}px`,
//           }}
//         ></div>
//       </div>
//       <div>Score: {score}</div>
//     </>
//   );
// }

// export default App;
