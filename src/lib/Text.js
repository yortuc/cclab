
export default class Text {
    constructor(x, y, text, fontSize=64, fontFamily="serif", angle=0, color=[0,0,0], opacity=1){
        this.x = x
        this.y = y
        this.text = text
        this.fontSize = fontSize
        this.fontFamily = fontFamily
        this.angle = angle
        this.color = color
        this.color = color
        this.opacity = opacity
    }

    name = "Text"
    properties = { text: "string", fontFamily: "fontFamily", fontSize: "int" }

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
