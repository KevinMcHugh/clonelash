import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";
import LZString from 'lz-string'
import ColorSelector from './ColorSelector'
import BrushSelector from './BrushSelector'
import './Prompt.css';

export default function Canvas({onSubmit, promptId}) {

  const [brushColor, setBrushColor] = useState('#FF0000')
  const [backgroundColor, setBackgroundColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(14)
  const [canvas, setCanvas] = useState(null)

  useEffect(() => {
    if (canvas) {
      canvas.clear()
    }
  }, [promptId])

  return (
    <>
      <div className="selectorContainer">
        <ColorSelector setColor={setBrushColor}
                       selectedColor={brushColor}
                       colors={['#FF0000','#00FF00','#0000FF']} />
        <BrushSelector setBrushSize={setBrushSize}
                       selectedBrushSize={brushSize}
                       brushColor={brushColor}/>
        <ColorSelector setColor={setBackgroundColor}
                       selectedColor={backgroundColor}
                       colors={['#000000','#6B6B6B','#080175','#5a2a00']}/>
        <div className="swatchContainer">
          <div className="swatch brushSwatch selectedSwatch"
               onClick={() => canvas.undo()}>
            <span>⎌</span>
          </div>
        </div>
      </div>
      <div className="canvasContainer">
        <CanvasDraw hideGrid={true}
                    hideInterface={true}
                    lazyRadius={0}
                    brushColor={brushColor}
                    backgroundColor={backgroundColor}
                    brushRadius={brushSize}
                    ref={canvasDraw => (setCanvas(canvasDraw))}/>
        <button onClick={() => {
          console.log(LZString.compress(canvas.getSaveData()));
          onSubmit({'response': {'binary_content': LZString.compress(canvas.getSaveData()),
                                 'text': backgroundColor}}, promptId)
        }}>
          foo
        </button>
      </div>
    </>
  );
}
