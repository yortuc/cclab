import React from 'react';
import Rect from '../lib/Rect';
import Text from '../lib/Text';

import "./ToolBar.css"

// Create inspector for given shapeClass automatically
//   there should be a way of definig types of properties of shape classes
//   e.g    
//      Rect.fillColor -> color    inspector should be created accordingly
//  
//  1)
//  one idea: Property adapter class --> not flexible for new shape definitions 
// 
//  RectPropertyAdapter = { 
//     props: [
//         {"name": "fillColor", }
//         ] 
//     }
// 
// //  2) explore es6 decorators and decorate props?
// //      class Rect {
//              @property("color")    
//              fillColor(){
//              }
//         }
//      so that it will appear in the inspector for even dynamically created shapes.
//         
//      in this regard, draw function for each share could be put into class definition
//          instead of sdl ? 
// 
// 

class ShapeInspector extends React.Component {
    constructor(){
        super()
        this.a = ""
    }

    render(){
        return (<div></div>)
    }
}

export default class ToolBar extends React.Component {
    constructor(){
        super()
        this.state = {
            shapes: [],
            activeShape: null
        }        
    }

    handleRectAdd(){
        const offset = this.shapes.length * 20
        const newRect = new Rect(100 + offset, 100 + offset, 200, 200, 0, [120, 0, 255], 0.8)
        this.state.shapes.push(newRect)
        this.setState({
            shapes: [...this.state.shapes, newRect],
            activeShape: newRect
        })
        this.renderToCanvas()
    }

    handleTextAdd(){
        const offset = this.shapes.length * 20
        const newText =  new Text(100+offset, 100+offset, "Hello world!")
        this.setState({
            shapes: [...this.state.shapes, newText],
            activeShape: newText
        })
        this.renderToCanvas()
    }

    renderToCanvas(){
        const newSdl = this.shapes.map(s => s.sdl())
        this.props.ctx.clearScreen()
        this.props.ctx.drawGrid()
        this.props.ctx.draw(newSdl)
    }

    renderActiveObjectInspector(){
        if(!this.state.activeShape){
            return null
        }

        switch(this.activeShape.constructor.name){
            case "Text":
            case "Rect":

            default:
                throw new Error("not implemented")
        }
    }

    render(){
        return (
            <div className="toolbar">
                <div className="section"> 
                    <b>Add Shape</b>
                    <button onClick={this.handleRectAdd.bind(this)}>Rect</button>
                    <button onClick={this.handleTextAdd.bind(this)}>Text</button>
                </div>
                <div className="section">
                    <b>Active Object</b>
                    {this.renderActiveObjectInspector()} 
                </div>

            </div>
        )
    }
}