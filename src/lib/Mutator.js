import Shape from "./Shape"


export default class Mutator extends Shape {

    /**
     * 
     * @param {Shape} refClass 
     * @param {Number} cloneCount 
     * @param {Array} mutators 
     * @param {String} rotationPoint
     *  The rotatio point for the group. 
     *   Depending on the mutators in the group
     *   [group.x, group.y] point cannot be guranteed to be top-left
     * a local x,y coordinate which can be obtained from child objects corner points
     * default -> uses group.x, group.y
     */
    constructor(
        refClass, 
        cloneCount, 
        mutators=[], 
        rotationPoint=[0, 0]
    ){
      super(refClass.x, refClass.y, refClass.w,
            refClass.h, 0, refClass.color, refClass.opacity
      )
      this.refClass = refClass
      this.cloneCount = cloneCount
      this.mutators = mutators
      this.rotationPoint = rotationPoint

      this.objects = []
    }

    name = "Mutator"

    properties = Object.assign(this.properties,  {mutator: {
      cloneCount: "int",
      mutators: "mutator_list",
      refClass: "shape"
    }})

    createClones(){
      this.objects = []
      for(let i=0; i<this.cloneCount; i++){
        const clonedObject = this.refClass.clone()
        clonedObject.x = 0
        clonedObject.y = 0
        this.objects.push(clonedObject)
  
        // apply mutators
        for(let mIndex in this.mutators){
          this.mutators[mIndex].setObjectProp(this.objects[i], i);
        }
      }
    }

    sdl(){
      // create clones again in case the refClass has changed
      this.createClones()

      return {
        name: "group", x:this.x, y:this.y,
        angle: this.angle, 
        opacity:this.opacity, 
        objects: this.objects.map(o=> o.sdl()),
        rotationPoint: this.rotationPoint
      }
    }

    clone(){
      return new Mutator(this.refClass, this.cloneCount, [...this.mutators], this.rotationPoint)
    }
  }