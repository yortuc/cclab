import React from "react"
import HtmlInput from "./HtmlInput"
import BoxInspector from "./BoxInspector"

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

    renderProperty(propName, propType){
        switch (propType) {
            case "float":
                return <HtmlInput inputType="number" propName={propName} />
            case "color":
                return <HtmlInput inputType="color" propName={propName} />
            case "fontFamily":
                return <HtmlInput inputType="text" propName={propName} />
            default:
                return <HtmlInput inputType="text" propName={propName} />
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
                <BoxInspector shape={this.props.shape} onChange={this.props.onChange}/>
                { this.getShapeProps() }
            </div>
        )
    }
}