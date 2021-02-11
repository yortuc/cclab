import React from "react"

export default class HtmlInput extends React.Component {
    render(){
        return (
            <div className="inspector-row">
                <label>{this.props.propName}</label>
                <input type={this.props.inputType} onChange={(e) => this.props.onChange(this.props.propName, e.target.value)} />
            </div>
        )
    }
}