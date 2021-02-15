import React from "react"
import {HtmlInput, RangeInput} from "./HtmlInput"
import Bus from "../Bus"


export default class ShapeInspector extends React.Component {

    handlePropChange(editedShape, propName, value){
        Bus.publish(Bus.messages.EDITOR_PROPERTY_CHANGED, {
            editedShape, 
            propName, 
            value
        })
    }

    renderGroup(groupName, group){
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
            case "float":
            case "int":
                return <RangeInput 
                    propName={propName} 
                    onChange={(value)=> Bus.publish(Bus.messages.EDITOR_PROPERTY_CHANGED, { 
                        editedShape: this.props.shape, 
                        propName,
                        value 
                    })} />
            case "color":
                return <HtmlInput 
                    inputType="color" 
                    propName={propName} 
                    onChange={(value)=> Bus.publish(Bus.messages.EDITOR_PROPERTY_CHANGED, { 
                        editedShape: this.props.shape, 
                        propName,
                        value
                    })} />
            case "fontFamily":
                return <HtmlInput 
                    inputType="text" 
                    propName={propName}
                    onChange={(value)=> Bus.publish(Bus.messages.EDITOR_PROPERTY_CHANGED, { 
                        editedShape: this.props.shape, 
                        propName,
                        value 
                    })} />
            case "shape":
                return <ShapeInspector 
                shape={this.props.shape[propName]} 
                onChange={(changedShapePropName, value)=> Bus.publish(Bus.messages.EDITOR_PROPERTY_CHANGED, { 
                    editedShape: this.props.shape[propName], 
                    propName: changedShapePropName,
                    value: value
                })} />
            default:
                return <HtmlInput inputType="text" propName={propName} onChange={this.handlePropChange.bind(this)} />
        }
    }

    render(){
        const shapeProps = this.props.shape.properties
        return (
            <div>
                { 
                    Object.keys(shapeProps).map(groupName => 
                        this.renderGroup(groupName, shapeProps[groupName])) 
                }
            </div>
        )
    }
}