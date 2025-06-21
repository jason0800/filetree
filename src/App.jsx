import React from "react";
import { Stage, Layer, Rect, Text } from "react-konva";

function App() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Hello Konva" fontSize={24} x={50} y={50} />
        <Rect
          x={20}
          y={80}
          width={150}
          height={100}
          fill="skyblue"
          draggable
          shadowBlur={5}
        />
      </Layer>
    </Stage>
  );
}

export default App;
