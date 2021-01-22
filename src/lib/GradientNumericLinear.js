export default class GradientNumericLinear {
    constructor(property, start, end, count){
      this.start = start
      this.end = end
      this.count = count
      this.property = property
    }

    getValueForIndex(index){
      return this.start + ((this.end-this.start)/(this.count-1)) * index
    }
    
    setObjectProp(obj, index){
      obj[this.property] = this.getValueForIndex(index)
    }
  }