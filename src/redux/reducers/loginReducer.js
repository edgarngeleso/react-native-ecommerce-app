let defaultLoginState = {
    loginInfo:{loggedIn:false,data:[]}
}

const loginReducer = (state=defaultLoginState,action)=>{
    switch(action.type){
        case "LOGIN":{
            let newState = {...state};
            newState.defaultLoginState = {
                state:true,
                loginInfo:action.payload
            }
            return newState;
        }
    }
}

export default loginReducer;