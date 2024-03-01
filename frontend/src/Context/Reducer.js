export default function Reducer (state,action){
    switch(action.type){
        case 'switch_user':{
            return {...state,sliderUser:action.payload}
        }
        default :{
            return state
        }
    }
}