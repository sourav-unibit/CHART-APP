export default function Reducer (state,action){
    switch(action.type){
        case 'switch_user':{
            return {...state,sliderUser:action.payload}
        }
        case 'swithc_user':{
            return{...state,onlineUserInfo:[...state.onlineUserInfo,action.payload]}
        }
        default :{
            return state
        }
    }
}