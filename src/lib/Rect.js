import Shape from "./Shape"

export default class Rect extends Shape {

    name = "Rect"

    sdl(){
        return {
            name: "rect", x: this.x, y: this.y, w: this.w, h: this.h, angle: this.angle, 
            color:this.color, opacity: this.opacity
        }
    }

    clone(){
        return new Rect(this.x, this.y, this.w, this.h, this.angle, [...this.color], this.opacity)
    }
}
