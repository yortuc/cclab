import Rect from "../lib/Rect"
import Text from "../lib/Text"

import GradientNumericLinear from "../lib/GradientNumericLinear"
import Mutator from "../lib/Mutator"


import Bus from "./Bus"

export default class Store {
    constructor(onStateChange, shapes=[], activeShape=null){
        this.onStateChange = onStateChange
        this.shapes = shapes
        this.activeShape = activeShape

        Bus.subscribe(Bus.messages.EDITOR_ADD_SHAPE, this.addShape.bind(this))
        Bus.subscribe(Bus.messages.EDITOR_PROPERTY_CHANGED, this.propertyChanged.bind(this))
        Bus.subscribe(Bus.messages.EDITOR_MUTATE_SHAPE, this.mutateShape.bind(this))

        this.onStateChange({shapes: [], activeShape: null})
    }

    setState(shapes, activeShape){
        this.shapes = shapes
        this.activeShape = activeShape

        this.onStateChange({shapes, activeShape})

        console.log("state changed", activeShape)
    }

    addShape(shapeType){
        let newShape

        switch (shapeType){
            case "rect":
                newShape = new Rect(100, 100, 200, 200, 0, [120, 0, 255], 0.8)
                break
            case "text":
                newShape =  new Text(100, 100, "Hello world!")
                break
            default:
                throw new Error("not supported shape type", shapeType)
        }

        this.setState([...this.shapes, newShape], newShape)
    }

    mutateShape(){
        // take the active shape out of shapes list
        const shapes = this.shapes.filter(s => s !== this.activeShape)

        // wrap the activeShape with mutator with a default mutator
        const rotate = new GradientNumericLinear("angle", 0, 300, 6)
        const rotatedShape = new Mutator(this.activeShape, 6, [rotate])

        // add back the mutated shape to shapes list
        shapes.push(rotatedShape)

        this.setState(shapes, rotatedShape)
    }

    propertyChanged({editedShape, propName, value}){
        editedShape[propName] = value
        
        this.setState(this.shapes, this.activeShape)
    }
}
