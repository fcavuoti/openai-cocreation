
import React from "react";
import ReactDOM from "react-dom";

import CanvasDraw from "react-canvas-draw";

import { useRef } from "react"
//ReactDOM.render(<CanvasDraw />, document.getElementById("root"));

// function downloadBase64File(contentType, base64Data, fileName) {
//     const linkSource = `data:${contentType};base64,${base64Data}`;
//     const downloadLink = document.createElement("a");
//     downloadLink.href = linkSource;
//     downloadLink.download = fileName;
//     downloadLink.click();
//  }

export default function canvas(){

    if(typeof window === 'undefined') {
        return <div>SSR...</div>
    }


    const canvasRef= useRef(null)
//const image = canvasRef.current.canvasContainer.childNodes[1].toDataURL()

//     let imageURL = this.refs.saveableCanvas.canvasContainer.childNodes[1].toDataURL()
// let downloadBtnRef = document.getElementById("downloadLink")
// downloadBtnRef.href = imageURL

function handleClick(){
   // console.log("save!")
    const image = canvasRef.current.canvasContainer.childNodes[1].toDataURL()
    console.log(image)
}

    return(
    <div>
  
 <button onClick={handleClick}>Save</button>
 <CanvasDraw
    ref={canvasRef}
        canvasHeight={1000}
        canvasWidth={1000}
 /> 
          </div>)
}