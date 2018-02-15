import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Styles from './PointStyles'

class Point extends Component{

    constructor(){
        super();
        this.state = {
            hovered: false
        }
    }

    onMouseEnter(e){
        this.setState({
            hovered: true
        });
    }

    onMouseLeave(e){
        this.setState({
            hovered: false
        });
    }

    onClick(e){
        var request = {
            placeId: this.props.point.google_id
        };

        var service = new google.maps.places.PlacesService(this.props.map);
        service.getDetails(request, this.getDetails.bind(this));
    }

    getDetails(place, status){
        this.props.selectPoint(place);
    }

    render(){
        var renderHovered = 
            this.props.selectedPoint.place_id == this.props.point.google_id
            || this.state.hovered;

        const {pointWithExplanationStyle, 
               pointWithoutExplanation, 
               explanationStyle, 
               pointStyle,
               hoveredPointStyle} = Styles;

        var explanation;
        if (renderHovered)
            explanation = (
                <div style={explanationStyle}>
                    {this.props.point.name}
                </div>);
        else
                explanation = (<div></div>);
        

        var point = (
            <div style={renderHovered?hoveredPointStyle:pointStyle}
                     onMouseEnter={this.onMouseEnter.bind(this)}
                     onMouseLeave={this.onMouseLeave.bind(this)}
                     onClick={this.onClick.bind(this)}>
            </div>
        )

        return (
            <div style={renderHovered ? pointWithExplanationStyle : pointWithoutExplanation}>
                {explanation}
                {point}
            </div>
        )
    }
}

Point.propTypes = {
    point: PropTypes.object.isRequired,
    selectPoint: PropTypes.func.isRequired
}

function mapStateToProps (state) {
    return {
        map: state.map,
        selectedPoint: state.selectedPoint
    }
}

export default connect(mapStateToProps)(Point)