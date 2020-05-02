import React, { useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import SwatchSelector from './SwatchSelector'
import './Prompt.css';

export default function Canvas(props) {

  const [brushColor, setBrushColor] = useState('#FF0000')
  const [backgroundColor, setBackgroundColor] = useState('#000000')

  return (
    <>
      <div className="selectorContainer">
        <SwatchSelector setColor={setBrushColor}
                        selectedColor={brushColor}
                        colors={['#FF0000','#00FF00','#0000FF']} />
        <SwatchSelector setColor={setBackgroundColor}
                        selectedColor={backgroundColor}
                        colors={['#000000','#6B6B6B','#080175','#5a2a00']}/>
      </div>
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
