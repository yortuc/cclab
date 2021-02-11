import React from "react"

export default class HtmlInput extends React.Component {
    render(){
        return (
            <div>
                <label>{this.props.propName}</label>
                <input type={this.props.inputType}  />
            </div>
        )
    }
}