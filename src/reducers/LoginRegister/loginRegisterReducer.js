const initialState = {
    showLoginModal = false,
    showRegisterModal = false
}

const reducer = (state = initialState, action) => {
    if(action.type === 'LoginToggle'){
        console.log('login');
        return {
            ...state,
            showLoginModal = !state.showLoginModal
        }
    }else if(action.type === 'RegisterToggle'){
        console.log('register');
        return {
            ...state,
            showRegisterModal = !state.showRegisterModal
        }
    }
}

export default reducer;