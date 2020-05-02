import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";
import SwatchSelector from './SwatchSelector'
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
        <SwatchSelector setColor={this.setColor} />
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