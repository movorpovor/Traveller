import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PhotoWidget from './PhotoWidget'
import { selectPoint } from '../actions/mapActions';

let autocomplete;

class SearchWidget extends Component{
    componentDidMount(){
        var input = document.getElementById('searchTextField');

        var options = {
        };
          
        autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', this._place_changed.bind(this));
    }

    getDetails(place, status){
        
    }

    _place_changed(){
        var place = autocomplete.getPlace();
        this.props.selectPoint(place);

        var request = {
            placeId: place.place_id
        };
        
        var service = new google.maps.places.PlacesService(this.props.map);
        service.getDetails(request, this.getDetails);
    }

    addPoint(){
        var selectedPoint = this.props.selectedPoint;
        var pointToDB = {
            name: selectedPoint.name,
            lat: selectedPoint.geometry.location.lat(),
            lng: selectedPoint.geometry.location.lng(),
            google_id: selectedPoint.place_id
        };

        var url = 'http://api.movorpovor.ru/traveller/points/add'

        fetch(url, {
            method: 'post',
            headers: {  
                "Content-Type": "application/json; charset=UTF-8"  
            },
            body: JSON.stringify(pointToDB),
            credentials: 'include'
        })
        .then(function(response){
            response.json()
            .then(function(data){
                this.props.addPoints(data.response);
            }.bind(this))
        }.bind(this))
    }

    render(){
        var template;
        if (this.props.selectedPoint.photos)
            template = (<PhotoWidget photos={this.props.selectedPoint.photos}/>);
        else
            template = (<div></div>);

        return(
            <div>
                <input id="searchTextField"/>
                <button onClick={this.addPoint.bind(this)}>Add point</button>
                {template}
            </div>
        )
    }
}    

SearchWidget.propTypes = {
    selectPoint: PropTypes.func.isRequired,
    addPoints: PropTypes.func.isRequired
}  

function mapStateToProps (state) {
    return {
        map: state.map,
        selectedPoint: state.selectedPoint
    }
}

export default connect(mapStateToProps)(SearchWidget);