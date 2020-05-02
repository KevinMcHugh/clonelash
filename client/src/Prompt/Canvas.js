import React, { useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import SwatchSelector from './SwatchSelector'
import './Prompt.css';

export default function Canvas(props) {

  const [brushColor, setBrushColor] = useState('#FF0000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')

  return (
    <>
      <SwatchSelector setColor={setBrushColor} color={brushColor} />
      <SwatchSelector setColor={setBackgroundColor} color={backgroundColor} />
      <div className="canvasContainer">
        <CanvasDraw hideGrid={true}
                    hideInterface={true}
                    lazyRadius={0}
                    brushColor={brushColor}
                    backgroundColor={backgroundColor} />
      </div>
    </>
  );
}
