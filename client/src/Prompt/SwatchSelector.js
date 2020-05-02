import React from 'react';
import Swatch from './Swatch'
import './Prompt.css';

export default function SwatchSelector({ setColor, color }) {
  return (
    <div className="swatchContainer">
      <Swatch color={'#FF0000'} setColor={setColor} selectedColor={color} />
      <Swatch color={'#00FF00'} setColor={setColor} selectedColor={color} />
      <Swatch color={'#0000FF'} setColor={setColor} selectedColor={color} />
    </div>
  );
}
