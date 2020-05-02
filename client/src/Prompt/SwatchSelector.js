import React, { Component } from 'react';
import './Prompt.css';

export default function SwatchSelector(props) {
  return (
    <div className="swatchContainer">
      <div style={{backgroundColor: '#FF0000', color: '#FF0000'}}
           className="colorSwatch"
           onClick={() => props.setColor('#FF0000')}/>
      <div style={{backgroundColor: '#00FF00', color: '#00FF00'}}
           className="colorSwatch"
           onClick={() => props.setColor('#00FF00')}/>
      <div style={{backgroundColor: '#0000FF', color: '#0000FF'}}
           className="colorSwatch"
           onClick={() => props.setColor('#0000FF')}/>
    </div>
  );
}
