import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Styles from './ItemStyles'
import SingleItem from './SingleItem'

class ListOfPoints extends Component{

    componentWillUpdate(nextProps, nextState){
        const place_id = nextProps.selectedPoint.place_id;
        if (place_id)
            document.getElementById('ListOfPoints_' + place_id).scrollIntoView();
    }

    render(){
        var points = this.props.points;
        const {elementStyle, hatStyle, hatTableStyle, listStyle} = Styles;
        const {selectedPoint, selectPoint} = this.props;

        var template = points.map(function(item, index){
            return (
                <SingleItem  
                    key={index} 
                    point={item} 
                    selectPoint={selectPoint}
                    selectedPoint={selectedPoint}
                />
            )
        }.bind(this))

        return(
            <div style={elementStyle}>
                <div style={hatTableStyle}>
                    <div style={hatStyle}>Мои места</div>
                </div>
                <div id={'list-of-points'} style={listStyle}>
                    {template}
                </div>
            </div>
        )
    }
}

ListOfPoints.propTypes = {
    points: PropTypes.array.isRequired,
    selectPoint: PropTypes.func.isRequired,
    selectedPoint: PropTypes.object.isRequired
}

export default ListOfPoints