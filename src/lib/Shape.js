// 
// base abstract class for all shapes
// 


export default class Shape {
    constructor(
      x, y, w = 100, h = 100, angle = 0.0, 
      color = [0,0,0], opacity = 1.0, rotationPoint = [0, 0]
    ){
      this.x = x
      this.y = y
      this.w = w
      this.h = h
      this.angle = angle
      this.color = color
      this.opacity = opacity

      // for rendering.
      this.rotationPoint = rotationPoint
    }

    properties = {"box": {"x": "float", "y": "float", "w": "float", "h": "float", "angle": "float", "color": "color", "opacity": "float"}}

    sdl() {
      throw new Error("Not implemented")
    }

    clone(){
      throw new Error("Not implemented")
    }
  }
  