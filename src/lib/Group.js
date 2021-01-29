import Shape from "./Shape"

export default class Group extends Shape {

    constructor(
        x, y, w, h, angle=0, color=[0,0,0], opacity=1.0,
        objects=[],
        rotationPoint=[0, 0]
    ){
      super(x,y,w,h, angle, color, opacity)
      this.rotationPoint = rotationPoint
      this.objects = objects
    }

    sdl() {
        return {
            name: "group", x:this.x, y:this.y,
            angle: this.angle, 
            opacity:this.opacity, 
            objects: this.objects.map(o=> o.sdl()),
            rotationPoint: this.rotationPoint
        }
    }

    clone(){
        return new Group(
            this.x, this.y, this.w, this.h, 
            this.angle, this.color, this.opacity, 
            this.objects, this.rotationPoint
        )
    }
}