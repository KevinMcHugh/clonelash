import React from 'react';
import classNames from 'classnames';
import './Prompt.css';

export default function Swatch({color, setColor, selectedColor}) {
  return (
    <div style={{backgroundColor: color, color}}
         className={classNames("colorSwatch", {"selectedSwatch": color === selectedColor})}
         onClick={() => setColor(color)}/>
  )
}
