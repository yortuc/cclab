import React from "react"

export class HtmlInput extends React.Component {
    render(){
        return (
            <div className="inspector-row">
                <label>{this.props.propName}</label>
                <input type={this.props.inputType} onChange={(e) => this.props.onChange(e.target.value)} />
            </div>
        )
    }
}

export class RangeInput extends React.Component {
    render(){
        return (
            <div className="inspector-row">
                <label>{this.props.propName}</label>
                <input type="range" min="0" max="800" step="50" onChange={(e)=> this.props.onChange(parseFloat(e.target.value))}/>
            </div>
        )
    }
}