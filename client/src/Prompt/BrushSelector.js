import React from 'react';
import classNames from 'classnames';
import './Prompt.css';


export default function BrushSelector({ setBrushSize, selectedBrushSize, brushColor }) {
  return (
    <div className="swatchContainer">
      { [14, 10, 6].map(size => {
        return (
          <div className={classNames("swatch brushSwatch", { "selectedSwatch": selectedBrushSize === size})}
               onClick={() => setBrushSize(size)}
               key={size}>
            <span className="dot" style={{ backgroundColor: brushColor, height: `${size}px`, width: `${size}px`}}/>
          </div>
        )
      })}
    </div>
  );
}
