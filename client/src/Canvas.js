import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";
import './Prompt.css';

class Canvas extends Component {

  constructor(props){
    super(props)
    this.state = {
      brushColor: "FF0000"
    }
  }

  setColor = (brushColor) => {
    console.log(brushColor)
    this.setState({brushColor})
  }

  // TODO: extract swatch component.
  // It should indicate whether or not it's selected.
  render() {
    return (
      <>
        <div className="swatchContainer">
          <div style={{backgroundColor: '#FF0000', color: '#FF0000'}}
               className="colorSwatch"
               onClick={() => this.setColor('#FF0000')}/>
          <div style={{backgroundColor: '#00FF00', color: '#00FF00'}}
               className="colorSwatch"
               onClick={() => this.setColor('#00FF00')}/>
          <div style={{backgroundColor: '#0000FF', color: '#0000FF'}}
               className="colorSwatch"
              onClick={() => this.setColor('#0000FF')}/>
        </div>
        <div className="canvasContainer">
          <CanvasDraw onChange={() => console.log("onChange")}
                      hideGrid={true}
                      hideInterface={true}
                      lazyRadius={0}
                      brushColor={this.state.brushColor} />
        </div>
      </>
    );
  }
}

export default Canvas