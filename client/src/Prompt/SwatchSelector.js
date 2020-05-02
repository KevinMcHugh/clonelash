import React from 'react';
import Swatch from './Swatch'
import './Prompt.css';

export default function SwatchSelector({ setColor, selectedColor, colors }) {
  // TODO: take color options as prop
  return (
    <div className="swatchContainer">
      { colors.map(color => {
        return <Swatch color={color} setColor={setColor} selectedColor={selectedColor}/>
      })}
    </div>
  );
}
