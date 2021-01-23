import React from "react";
import Rect from "../lib/Rect"
import Mutator from "../lib/Mutator"
import GradientNumericLinear from "../lib/GradientNumericLinear"
import "./Editor.css"


export default class Editor extends React.Component {

    constructor(){
        super()

        this.state = {
            code : `
const rect = new Rect(300, 300, 100, 20, 0, [20,120,255], 0.8)

// clone vertically
const vertical= new GradientNumericLinear("y", 0, 300, 6)
const vertBar = new Mutator(rect, 6, [vertical], [50, 0])

// rotate
const rotate360 = new GradientNumericLinear("angle", 0, 300, 6)
const rotatedVertBar = new Mutator(vertBar, 6, [rotate360])

return rotatedVertBar  
            `
        }
    }

    renderFromCode(){
        const code = this.state.code
        let newSdl = null
    
        try{
            const funcCreateObj = new Function("Rect", "Mutator", "GradientNumericLinear", code)
            const obj = funcCreateObj(Rect, Mutator, GradientNumericLinear)
            newSdl = obj.sdl()

            console.log("rendering: ", newSdl)
        }
        catch{
            console.log("error in the code!")
        }
    
        if (newSdl){
            this.props.ctx.clearScreen()
            this.props.ctx.drawGrid()
            this.props.ctx.draw(newSdl)
            // saveCode(code)
        }
    }

    handleCodeChange(event) {
        this.setState({code: event.target.value})
    }

    handleLiveEditingChange(event) {    
        this.setState({ liveEditing: event.target.checked })
    }

    render(){
        return (
            <div className="editor">
                <textarea value={this.state.code} onChange={this.handleCodeChange.bind(this)}></textarea>
                <button onClick={this.renderFromCode.bind(this)}>Render</button>
            </div>
        )
    }
}