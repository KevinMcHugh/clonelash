import React from 'react';
import classNames from 'classnames';
import './Prompt.css';

export default function ColorSwatch({color, setColor, selectedColor}) {
  return (
    <div style={{backgroundColor: color, color}}
         className={classNames("swatch", {"selectedSwatch": color === selectedColor})}
         onClick={() => setColor(color)}/>
  )
}
