import React from "react"
import HtmlInput from "./HtmlInput"
import BoxInspector from "./BoxInspector"

import { Slider } from 'antd';


export default class ShapeInspector extends React.Component {

    renderGroup(groupName, group){
        // box group is rendered differently
        if (groupName === "box") return;

        // render the rest of the groups
        const groupControls = Object.keys(group).map(propName => 
            this.renderProperty(propName, group[propName]))

        return (
            <div className="control-group">
                {/* group name can be displayed here */}
                <div>{groupControls}</div>
            </div>
        )
    }

    renderProperty(propName, prop){
        let propType
        if (typeof prop == "string"){
            propType = prop
        } 
        else{
            propType = prop["type"]
        }
        switch (propType) {
            case "slider":
                return <Slider defaultValue={30} min={prop["min"]} max={prop["max"]} onChange={(value)=> this.props.onChange(propName, value)} />
            case "float":
                return <HtmlInput inputType="number" propName={propName} onChange={this.props.onChange} />
            case "color":
                return <HtmlInput inputType="color" propName={propName} onChange={this.props.onChange} />
            case "fontFamily":
                return <HtmlInput inputType="text" propName={propName} onChange={this.props.onChange} />
            default:
                return <HtmlInput inputType="text" propName={propName} onChange={this.props.onChange} />
        }
    }

    getShapeProps(){
        const shapeProps = this.props.shape.properties
        return Object.keys(shapeProps).map(groupName => 
            this.renderGroup(groupName, shapeProps[groupName]))
    }

    render(){
        return (
            <div>
                <button onClick={this.props.onMutateClicked}>Mutate</button>
                <BoxInspector shape={this.props.shape} onChange={this.props.onChange}/>
                { this.getShapeProps() }
            </div>
        )
    }
}