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
            return { ...state, token: action.payload, email:action.email, method:action.method,expenses:action.expenses, isAuthenticated: true, errorMessage: '' };
        case 'AUTH_ERROR':
            return { ...state, error:action.payload };
        case 'AUTH_SIGNOUT':
            return { ...state, token: action.payload, email:action.email, method:action.method, expenses:action.expenses, isAuthenticated: false, errorMessage: '' };
        // case 'SET_EXPENSES':
        //     return {...state, expenses:action.expenses};
        // case 'REMOVE_EXPENSE':
        //     return state.expenses.filter(({id}) => id !== action.id);
            
        // case 'EDIT_EXPENSE':
        //     return state.expenses.map((expense)=>{
        //         if(expense.id === action.id){
        //             return{
        //                 ...expense,
        //                 ...action.updates
        //             };
        //         }
        //         else{
        //             return expense;
        //         }
        //     });
        default:
            return state;
    }
}