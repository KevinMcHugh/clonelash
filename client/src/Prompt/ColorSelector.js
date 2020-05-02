import React from 'react';
import classNames from 'classnames';
import './Prompt.css';

export default function ColorSelector({ setColor, selectedColor, colors }) {
  return (
    <div className="swatchContainer">
      { colors.map(color => {
          return <div style={{backgroundColor: color, color}}
                      className={classNames("swatch", {"selectedSwatch": color === selectedColor})}
                      onClick={() => setColor(color)}
                      key={color}/>
      })}
    </div>
  );
}
