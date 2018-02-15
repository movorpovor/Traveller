import React, {Component} from 'react';
import * as PIXI from 'pixi.js'
import PropTypes from 'prop-types';

let photoId = 0;
let onButton = false;

class PhotoWidget extends Component{

    constructor(){
        super();
        this.state = {
            photoElement: {}
        }
    }

    getWidth(){
        return 256;
    }

    getHeight(){
        return 144;
    }

    componentDidMount(){
        var app = new PIXI.Application({width: this.getWidth(), height: this.getHeight(), transparent:true});
        document.getElementById('gallery').appendChild(app.view);

        if (this.props.photos.length > 0)
            this.createGalery(app); 
    }

    createGalery(app){
        var gr = new PIXI.Graphics();
        gr.beginFill(0x000000);
        gr.drawRect(0, 0, this.getWidth(), this.getHeight());
        app.stage.addChild(gr);

        var photo =  new PIXI.Sprite();
        photo.interactive = true;
        var leftButton = this.createButton('<', this.getWidth() * 0.2, this.getHeight(), this.onLeftButtonClicked.bind(this));
        var rightButton = this.createButton('>', this.getWidth() * 0.2, this.getHeight(), this.onRightButtonClicked.bind(this));

        leftButton.alpha = rightButton.alpha = 0;

        app.stage.interactive = true;

        app.stage.mouseover = (e) => {
            app.stage.mousemove = (e) => {
                if (e.data.global.x < app.stage.x + leftButton.width)
                    leftButton.alpha = 1;
                else
                    leftButton.alpha = 0.7;

                if (e.data.global.x > app.stage.x + app.stage.width - rightButton.width)
                    rightButton.alpha = 1;
                else
                    rightButton.alpha = 0.7;
            }
        }

        app.stage.mouseout = (e) => {
            leftButton.alpha = rightButton.alpha = 0;
            app.stage.mousemove = (e) => {}       
        }

        app.stage.addChild(photo);
        app.stage.addChild(leftButton);
        app.stage.addChild(rightButton);

        rightButton.x = this.getWidth() - rightButton.width;
        this.setState({photoElement:photo});
    }

    changePhoto(index){
        var photoElement = this.state.photoElement;
        var photo = this.props.photos[index];
        photoElement.texture = new PIXI.Texture.fromImage(photo.getUrl({maxHeight:this.getHeight()}));
        var newWidth = photo.width*this.getHeight()/photo.height;
        photoElement.x = (this.getWidth() - newWidth) / 2;
        photoId = index;
    }

    onLeftButtonClicked(){
        if (photoId > 0)
            this.changePhoto(photoId - 1);
    }

    onRightButtonClicked(){
        if (photoId < this.props.photos.length - 1)
            this.changePhoto(photoId + 1);
    }

    createButton(text, width, height, onButtonClicked){
        var container = new PIXI.Container();
        
        var gr = new PIXI.Graphics();
        gr.beginFill(0xc0c0c0, 0.7);
        gr.drawRect(0, 0, width, height);
        container.addChild(gr);
        
        var buttonText = new PIXI.Text(text);
        
        container.addChild(buttonText);

        buttonText.y = (height - buttonText.height) / 2;
        buttonText.x = (width - buttonText.width) / 2;

        container.interactive = true;
        container.mouseover = (e) => container.alpha = 1;
        container.mouseout = (e) => container.alpha = 0.7;
        container.click = onButtonClicked;

        return container;
    }

    render(){
        this.changePhoto(0);
        return(
            <div id='gallery'>
            </div>
        )
    }
}

PhotoWidget.propTypes = {
    photos: PropTypes.array.isRequired
}

export default PhotoWidget