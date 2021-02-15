import React from 'react';
import ReactDOM from 'react-dom';
import Store from './editor/Store';
import ToolBar from './editor/ToolBar';
import CanvasRenderer from "./lib/CanvasRenderer"


const ctx = new CanvasRenderer(
    document.getElementById("c").getContext("2d"), 800, 600
)

function onStateChange(newState) {
  const newSdl = newState.shapes.map(s => s.sdl())
  ctx.clearScreen()
  ctx.drawGrid()
  ctx.draw(newSdl)

  console.log("newSdl", newSdl)

  // react render 
  ReactDOM.render(<ToolBar activeShape={newState.activeShape} shapes={newState.shapes} />, 
    document.getElementById('root'))
}

const stateStore = new Store(onStateChange)
