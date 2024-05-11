const UserReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'logout':
            return null;
        case 'imageChange':
            return state.user ?
                { ...state, user: { ...state.user, ...action.payload } }
                : { ...state, ...action.payload }
        case 'bioChange':
            return { ...state, ...action.payload }
        default:
            return null;
    }
}

export default UserReducer;