import Rect from "../Rect"
import CanvasRenderer from "../CanvasRenderer"
import GradientNumericLinear from "../GradientNumericLinear"
import Mutator from "../Mutator"
import fs from 'fs';


class CtxRecorder {
    constructor(){
        this.steps = []
    }
    save() { this.steps.push("save") }
    beginPath(){ this.steps.push("beginPath") }
    translate(x,y){ this.steps.push(`translate_${x}_${y}`) }
    arc(x,y,r,start,finish,t){ this.steps.push(`arc_${x}_${y}_${start}_${finish}_${t}`) }
    fill(){ this.steps.push("fill") }
    rotate(a){ this.steps.push(`rotate_${a}`) }
    fillRect(x,y,w,h){ this.steps.push(`fillRect_${x}_${y}_${w}_${h}`) }
    restore(){ this.steps.push("restore") }
}


const expectedOutput = () => fs.readFile('./expected.txt', 'utf8', 
    (err, data) => {
      if (err) throw err;
    });


const recorder = new CtxRecorder()

const c = new CanvasRenderer(recorder, 800, 600)

const rect = new Rect(500, 500, 50, 50, 20, [0,0,255], 0.5)
const rotate360 = new GradientNumericLinear("angle", 0, 300, 6)
const mutator = new Mutator(rect, 6, [rotate360])

// user changes rotation mutator's rotation point manually
mutator.rotationPoint = [-100, -100]
const mut2 = new Mutator(mutator, 6, [rotate360])
const sdl = mut2.sdl()    
c.draw(sdl)

// console.log(recorder.steps)
console.assert(recorder.steps.join(",") === expectedOutput())