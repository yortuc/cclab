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
const rect = new Rect(500, 500, 50, 50, 20, [0,0,255], 0.5)

const rotate360 = new GradientNumericLinear("angle", 0, 300, 6)
const mutator = new Mutator(rect, 6, [rotate360])
mutator.rotationPoint = [-100, -100]

const mut2 = new Mutator(mutator, 6, [rotate360])

return mut2 
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