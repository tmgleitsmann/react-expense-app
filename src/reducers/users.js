const DEFAULT_STATE = {
    isAuthenticated: false,
    token:'',
    email:'',
    method:'',
    expenses:[],
    error:''
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case 'AUTH_SIGNUP':
            return { ...state, token:action.payload, email:action.email, method:action.method, expenses:action.expenses, isAuthenticated:true, error:'' };
        case 'AUTH_SIGNIN':
            return { ...state, token: action.payload, email:action.email, method:action.method,expenses:action.expenses, isAuthenticated: true, error: '' };
        case 'AUTH_ERROR':
            return { ...state, error:action.payload };
        case 'AUTH_SIGNOUT':
            return { ...state, token: action.payload, email:action.email, method:action.method, expenses:action.expenses, isAuthenticated: false, error: '' };
        default:
            return state;
    }
}