import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";

class Canvas extends Component {

  render() {
    return (
      <CanvasDraw onChange={() => console.log("onChange")}
                  hideGrid={true}
                  hideInterface={true}
                  lazyRadius={0} />
    );
  }
}

export default Canvas