import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Styles from './ItemStyles'
import { connect } from 'react-redux';

class SingleItem extends Component{
    constructor(){
        super();
        this.state = {
            hovered: false
        }
    }

    getDetails(place, status){
        this.props.selectPoint(place);
    }

    onClick(){
        var request = {
            placeId: this.props.point.google_id
        };

        var service = new google.maps.places.PlacesService(this.props.map);
        service.getDetails(request, this.getDetails.bind(this));
    }

    onMouseLeave(){        
        this.setState({
            hovered: false 
        });
    }

    onMouseEnter(){
        this.setState({
            hovered: true 
        });
    }

    render(){
        const {itemStyle, itemNormStyle, itemHoveredStyle} = Styles;

        var fullStyle = {};

        if (this.state.hovered || this.props.point.google_id == this.props.selectedPoint.place_id)
            Object.assign(fullStyle, itemStyle, itemHoveredStyle);
        else
            Object.assign(fullStyle, itemStyle, itemNormStyle);

        const {point} = this.props;

        return(
            <div style={fullStyle} 
                 onClick={this.onClick.bind(this)} 
                 onMouseEnter={this.onMouseEnter.bind(this)} 
                 onMouseLeave={this.onMouseLeave.bind(this)}
                 id={'ListOfPoints_' + point.google_id}
            >
                <p>{point.name}</p>
            </div>
        )
    }
}

SingleItem.propTypes = {
    point: PropTypes.object.isRequired,
    selectPoint: PropTypes.func.isRequired,
    selectedPoint: PropTypes.object.isRequired
}

function mapStateToProps (state) {
    return {
        map: state.map
    }
}

export default connect(mapStateToProps)(SingleItem)