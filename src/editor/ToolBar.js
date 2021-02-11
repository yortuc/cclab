import React from 'react';
import Rect from '../lib/Rect';
import Text from '../lib/Text';

import GradientNumericLinear from "../lib/GradientNumericLinear"
import Mutator from "../lib/Mutator"


import ShapeInspector from "./inspectors/ShapeInspector"

import "./ToolBar.css"
import "antd/dist/antd.css";


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


class ShapeList extends React.Component {
    render(){
        return (
            <div>
                {this.props.shapes.map(s => <button onClick={() => this.props.onItemClick(s)}>{s.name}</button>)}
            </div>
        )
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
        const offset = this.state.shapes.length * 20
        const newRect = new Rect(100 + offset, 100 + offset, 200, 200, 0, [120, 0, 255], 0.8)
        this.setState({
            shapes: [...this.state.shapes, newRect],
            activeShape: newRect
        })
    }

    handleTextAdd(){
        const offset = this.state.shapes.length * 20
        const newText =  new Text(100+offset, 100+offset, "Hello world!")
        this.setState({
            shapes: [...this.state.shapes, newText],
            activeShape: newText
        })
    }

    renderToCanvas(){
        const newSdl = this.state.shapes.map(s => s.sdl())
        this.props.ctx.clearScreen()
        this.props.ctx.drawGrid()
        this.props.ctx.draw(newSdl)
    }

    setActiveShape(shape){
        this.setState({activeShape: shape})
    }

    handleValueChange(propName, newValue) {
        console.log(propName, newValue)
        const shape = this.state.activeShape
        shape[propName] = newValue
        
        this.renderToCanvas()
    }

    handleCreateMutate(){
        // take the active shape out of shapes list
        const shapes = this.state.shapes.filter(s => s !== this.state.activeShape)

        // wrap the activeShape with mutator with a default mutator
        const rotate = new GradientNumericLinear("angle", 0, 300, 6)
        const rotatedShape = new Mutator(this.state.activeShape, 6, [rotate])

        // add back the mutated shape to shapes list
        shapes.push(rotatedShape)

        // update state
        this.setState({
            activeShape: rotatedShape,
            shapes: shapes
        })
    }

    render(){
        this.renderToCanvas()

        console.log(this.state)

        return (
            <div className="toolbar">
                <div className="section"> 
                    <b>Add Shape</b>
                    <button onClick={this.handleRectAdd.bind(this)}>Rect</button>
                    <button onClick={this.handleTextAdd.bind(this)}>Text</button>
                </div>
                <div className="section"> 
                    <b>Shapes</b>
                    <ShapeList shapes={this.state.shapes} onItemClick={(shape) => this.setActiveShape(shape)}/>
                </div>
                <div className="section">
                    <b>Active Object</b>
                    {this.state.activeShape ? 
                        <ShapeInspector 
                            shape={this.state.activeShape} 
                            onChange={this.handleValueChange.bind(this)} 
                            onMutateClicked={this.handleCreateMutate.bind(this)}
                        /> : "no selection" } 
                </div>

            </div>
        )
    }
}