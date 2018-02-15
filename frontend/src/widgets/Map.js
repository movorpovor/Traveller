import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import Point from './Point/Point'

class Map extends Component{
    _onClick({x, y, lat, lng, event}) {
        
    }

    apiLoaded({map, maps}){
        this.props.mapLoaded(map);
    } 
    
    componentDidMount(){
        fetch('http://api.movorpovor.ru/traveller/points/get', {credentials: 'include'})
        .then(function(response){
            response.json()
            .then(function (data){
                this.props.addPoints(data.response);
            }.bind(this));
        }.bind(this))
    }

    render() {
        var selectedPoint = this.props.selectedPoint;
        var lat, lng;
        var zoom = 5;

        if (!selectedPoint.geometry){
            lat = -42;
            lng = 174;
        } else {
            lat = selectedPoint.geometry.location.lat();
            lng = selectedPoint.geometry.location.lng();

            switch(selectedPoint.types[0]){
                case 'locality':
                    zoom = 10;
                break;
                case 'premise':
                case 'train_station':
                    zoom = 17;
                break;
                case 'natural_feature':
                    zoom = 12;
                break;
                default:
                    zoom = 5;
            }
        }
        
        var points = this.props.points;

        var template = points.map(function(item, index){
            return (<Point selectPoint={this.props.selectPoint} point={item} lat={item.lat} lng={item.lng} key={index}/>)
        }.bind(this))

        return (
            <GoogleMapReact
                onClick={this._onClick.bind(this)}
                bootstrapURLKeys = {{
                    key: 'AIzaSyBaTsn6Yaet7lO_jl1ekaAKjXEHCdnVJaY',
                    language: 'ru'
                }}

                center={{
                    lat: lat,
                    lng: lng
                }}

                zoom={zoom}

                onGoogleApiLoaded={this.apiLoaded.bind(this)}

                yesIWantToUseGoogleMapApiInternals={true}
            >
            {template}
            </GoogleMapReact>
        )
    }
}

Map.propTypes = {
    mapLoaded: PropTypes.func.isRequired,
    addPoints: PropTypes.func.isRequired,
    selectPoint: PropTypes.func.isRequired,
    points: PropTypes.array.isRequired,
    selectedPoint: PropTypes.object.isRequired
}
  
export default Map