export function selectPoint(point){    
    return {
        type: 'SELECT_POINT',
        payload: point
    }
}

export function mapLoaded(map){
    return {
        type: 'MAP_LOADED',
        payload: map
    }
}

export function loggedIn(logged){
    return {
        type: 'LOGGED_IN',
        payload: logged
    }
}

export function addPoints(points){
    return {
        type: 'ADD_POINT',
        payload: points
    }
}