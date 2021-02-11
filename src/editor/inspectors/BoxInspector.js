import React from "react"

export default class BoxInspector extends React.Component {
    handleValueChange(propName, newValue){
        // there might be validation rules here
        this.props.onChange(propName, newValue)
    }

    render(){
        return (
            <div className="control-group">
                <label>Box</label>
                <div>   
                    <label>x</label>
                    <input type="range" min="0" max="800" step="50" onChange={(e)=> this.handleValueChange("x", e.target.value)}/>
                </div>
                <div>
                    <label>y</label>
                    <input type="range" min="0" max="800" step="50" onChange={(e)=> this.handleValueChange("y", e.target.value)} />
                </div>
                <div>
                    <label>width</label>
                    <input type="range" min="0" max="800" onChange={(e)=> this.handleValueChange("w", e.target.value)} />
                </div>
                <div>
                    <label>height</label>
                    <input type="range" min="0" max="800" onChange={(e)=> this.handleValueChange("h", e.target.value)} />
                </div>
                <div>
                    <label>angle</label>
                    <input type="range" min="0" max="800" onChange={(e)=> this.handleValueChange("angle", e.target.value)} />
                </div>
                <div>
                    <label>color</label>
                    <input type="color" onChange={(e)=> this.handleValueChange("color", e.target.value)} />
                </div>
                <div>
                    <label>opacity</label>
                    <input type="range" min="0" max="1.0" step="0.1" onChange={(e)=> this.handleValueChange("opacity", e.target.value)} />
                </div>
            </div>
        )
    }
}
