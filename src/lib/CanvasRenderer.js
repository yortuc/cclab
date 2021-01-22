export default class CanvasRenderer{
    constructor(ctx, w=800, h=600, debug=true){
        this.ctx = ctx
        this.w = w
        this.h = h
        this.debug = debug

        // anti-alias
        this.ctx.translate(0.5, 0.5);
    }
    
    toColor (color, opacity) {
        return "rgba(" + [...color, opacity].join(",") + ")"
    }

    clearScreen(){
        this.ctx.clearRect(0, 0, this.w, this.h)
    }

    circle (x,y,color="rgba(255, 0,0,1)", radius=5){
        if(!this.debug) return
        this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
        this.ctx.fillStyle = color
        this.ctx.fill()
        this.ctx.restore()
    }

    drawGrid(cellSize=50, gridColor="#aaa"){
        this.ctx.save()
        this.ctx.strokeStyle = gridColor
        
        for(let i=0; i<this.w/cellSize; i++){
            for(let j=0; j<this.h/cellSize; j++){
                this.ctx.beginPath();
                this.ctx.moveTo(0, j*cellSize);
                this.ctx.lineTo(this.w, j*cellSize);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(i*cellSize, 0)
                this.ctx.lineTo(i*cellSize, this.h)
                this.ctx.stroke()
            }  
        }
        this.ctx.restore()
    }

    drawRect(rect){
        this.ctx.save()
        
        // rotate from top-left corner by default
        this.ctx.translate(rect.x, rect.y)
        this.circle(0, 0)
        this.ctx.rotate(rect.angle * Math.PI/180.0)
    
        // go back to left-top
        this.ctx.fillStyle = this.toColor(rect.color, rect.opacity)
        this.ctx.fillRect(0, 0, rect.w, rect.h)
        this.ctx.restore()
    }

    drawFuncs = {
        rect: this.drawRect.bind(this),
        group: this.drawGroup.bind(this)
    }

    draw(sdl) {
        this.drawFuncs[sdl.name](sdl)
    }

    drawGroup(group, debug=true) {
        this.ctx.save()
    
        // this is the anchor point of the group
        // depending on the mutators in the group
        //  this cannot be guranteed to be top-left
        //  this is an arbitrary point 
        //  so I need to find a way to make rotation point selectable
        this.ctx.translate(group.x, group.y)
      
        //****************************************************************/
        // rotate group
        this.ctx.translate(group.rotationPoint[0], group.rotationPoint[1])

        // draw group rotation point
        this.circle(0, 0, "rgba(0,0,0,1)", 10)

        this.ctx.rotate(group.angle * Math.PI/180.0)

        // go back to origin
        this.ctx.translate(-group.rotationPoint[0], -group.rotationPoint[1])

        // draw child objects
        for(let objIndex in group.objects){
            // transfer parent properties
            this.drawFuncs[group.objects[objIndex].name](group.objects[objIndex])
        }

        // draw group anchor point after drawing objects in the group
        // to make it stay on top
        this.circle(0, 0, "rgba(0,255,0,1)")

        this.ctx.restore()
    }
}
