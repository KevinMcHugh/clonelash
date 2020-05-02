import React from 'react';
import ColorSwatch from './ColorSwatch'
import './Prompt.css';

export default function ColorSelector({ setColor, selectedColor, colors }) {
  return (
    <div className="swatchContainer">
      { colors.map(color => {
        return <ColorSwatch color={color} setColor={setColor} selectedColor={selectedColor}/>
      })}
    </div>
  );
}
