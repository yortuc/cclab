export function sdlToText(s) {
    let strObj = ""
    if (s.objects){
    strObj = " objects: [\n\t" + s.objects.map(r => sdlToText(r)).join(",\n\t") + "\n]"
    }
    
    return `(${s.name} x:${s.x} y:${s.x} angle:${s.angle}${strObj})`
}

