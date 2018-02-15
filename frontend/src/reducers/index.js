export default function userstate(state, action) {
    switch (action.type) {
        case 'SELECT_POINT':
            return { ...state, selectedPoint: action.payload };
        case 'MAP_LOADED':
            return {...state, map: action.payload};
        case 'LOGGED_IN':
            return {...state, logged_in: action.payload};
        case 'ADD_POINT':
            return {...state, points: state.points.concat(action.payload)}
        default:
            return state;
    }
}