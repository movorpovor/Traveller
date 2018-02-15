import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Map from './widgets/Map'
import SearchWidget from './widgets/SearchWidget'
import * as mapActions from './actions/mapActions'
import LoginWidget from './widgets/LoginWidget'
import * as Styles from './AppStyles'
import ListOfPoints from './widgets/ListOfPoints/ListOfPoints'

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

class App extends Component{  

    componentWillMount(){
        if (getCookie('access_token'))
            this.props.mapActions.loggedIn(true);
    }

    render() {
        const {selectPoint, mapLoaded, loggedIn, addPoints} = this.props.mapActions;

        const {selectedPoint, points, isLoggedIn} = this.props;

        if (!isLoggedIn)
            return(<LoginWidget loggedIn={loggedIn}/>);

        const {fullWindowStyle, inLineElementStyle, mapStyle, topStyle} = Styles;

        var styleOfTop = {};
        var styleOfMap = {};

        Object.assign(styleOfTop, topStyle);
        Object.assign(styleOfMap, inLineElementStyle, mapStyle);

        return (
            <div style={fullWindowStyle}>
                <div className='top' style={styleOfTop}>
                    <div style={styleOfMap}>
                        <Map 
                            addPoints={addPoints} 
                            mapLoaded={mapLoaded} 
                            selectPoint={selectPoint}
                            selectedPoint={selectedPoint}
                            points={points}
                        />
                    </div>
                    <ListOfPoints 
                        style={inLineElementStyle} 
                        points={points}
                        selectedPoint={selectedPoint} 
                        selectPoint={selectPoint}
                    />
                </div>
                <SearchWidget selectPoint={selectPoint} addPoints={addPoints}/>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        points: state.points,
        isLoggedIn: state.logged_in,
        selectedPoint: state.selectedPoint
    }
}

function mapDispatchToProps(dispatch) {
    return {
        mapActions: bindActionCreators(mapActions, dispatch)
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(App)