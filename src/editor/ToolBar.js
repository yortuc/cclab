import React from 'react';
import Rect from '../lib/Rect';
import Text from '../lib/Text';
import GradientNumericLinear from "../lib/GradientNumericLinear"
import Mutator from "../lib/Mutator"
import ShapeInspector from "./inspectors/ShapeInspector"

import "./ToolBar.css"
import "antd/dist/antd.css";
import Bus from './Bus';


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
                {this.props.shapes.map(shape => <button onClick={() => this.props.onItemClick(shape)}>{shape.name}</button>)}
            </div>
        )
    }
}

export default class ToolBar extends React.Component {
    handleRectAdd(){ Bus.publish(Bus.messages.EDITOR_ADD_SHAPE, "rect") }

    handleTextAdd(){ Bus.publish(Bus.messages.EDITOR_ADD_SHAPE, "text") }

    setActiveShape(shape){ Bus.publish(Bus.messages.EDITOR_SET_ACTIVE_SHAPE, shape) }

    handleCreateMutate(){ Bus.publish(Bus.messages.EDITOR_MUTATE_SHAPE, null) }

    renderActiveShape(){
        return (
            <div>
                <button onClick={this.handleCreateMutate.bind(this)}>Mutate</button>
                <ShapeInspector 
                    shape={this.props.activeShape} 
                    onChange={(propName, newValue)=> Bus.publish(Bus.messages.EDITOR_PROPERTY_CHANGED, {
                        editedShape: this.props.activeShape,
                        propName: propName,
                        value: newValue
                    })}
                />
            </div>
        )
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
                    <b>Shapes</b>
                    <ShapeList shapes={this.props.shapes} onItemClick={(shape) => this.setActiveShape(shape)}/>
                </div>
                <div className="section">
                    <b>Active Object</b>
                    {this.props.activeShape ? this.renderActiveShape() : "no selection" } 
                </div>

            </div>
        )
    }
}