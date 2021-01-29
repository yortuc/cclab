import React from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './editor/CodeEditor';
import ToolBar from './editor/ToolBar';
import CanvasRenderer from "./lib/CanvasRenderer"


const ctx = new CanvasRenderer(
    document.getElementById("c").getContext("2d"), 800, 600
)

// initialize editor 
ReactDOM.render(
    <ToolBar ctx={ctx} />,
  document.getElementById('root')
);