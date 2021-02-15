class Bus {

    messages = {
        EDITOR_ADD_SHAPE: "EDITOR_ADD_SHAPE",
        EDITOR_SET_ACTIVE_SHAPE: "EDITOR_SET_ACTIVE_SHAPE",
        EDITOR_MUTATE_SHAPE: "EDITOR_MUTATE_SHAPE",
        EDITOR_PROPERTY_CHANGED: "EDITOR_PROPERTY_CHANGED"
    }

    constructor(){
        this.channels = {}
    }

    subscribe(channel, callback){
        if (this.channels[channel]){
            this.channels.push(callback)
        }
        else{
            this.channels[channel] = [callback]
        }
    }

    publish(channel, message){
        if(this.channels[channel]) {
            this.channels[channel].forEach(callback => callback(message))
        }else{
            // no subscribers yet
        }
    }
}

export default new Bus()
