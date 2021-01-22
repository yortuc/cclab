import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './editor/Editor';
import CanvasRenderer from "./lib/CanvasRenderer"


const ctx = new CanvasRenderer(
    document.getElementById("c").getContext("2d"), 800, 600
)

// initialize editor 
ReactDOM.render(
    <Editor ctx={ctx} />,
  document.getElementById('root')
);