import Shape from "./Shape"

export default class Text extends Shape {
    constructor(x, y, text, fontSize=64, fontFamily="serif", angle=0, color=[0,0,0], opacity=1){
        super(x, y, null, null, angle, color, opacity)
        this.text = text
        this.fontSize = fontSize
        this.fontFamily = fontFamily
    }

    name = "Text"

    // extend properties on top of Shape
    properties = Object.assign(this.properties,  {text: { text: "string", fontFamily: "fontFamily", fontSize: {type: "slider", min: 10, max:80} }})

    sdl(){
        return {
            name: "text", x: this.x, y: this.y, angle: this.angle, 
            color:this.color, opacity: this.opacity, 
            text: this.text, fontSize: this.fontSize, fontFamily: this.fontFamily
        }
    }

    clone(){
        return new Text(
            this.x, this.y, this.text, this.fontSize, this.fontFamily, this.angle, 
            this.color, this.opacity
        )
    }
}
