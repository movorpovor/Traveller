import React, {Component} from 'react';
import PropTypes from 'prop-types';

class LoginWidget extends Component{

    constructor(){
        super();
        this.state = {
            login: true
        }
    }

    register(){
        if (this.state.login){
            this.setState({
                login: false
            })
        } else {
            var passwordField = document.getElementById('password');
            var cpasswordField = document.getElementById('cpassword');
            
            if (passwordField.value.trim() != ""){
                if (cpasswordField.value.trim() == passwordField.value.trim()){
                    var url = 'http://api.movorpovor.ru/traveller/auth/register';
                    var body = {
                        login: document.getElementById('login').value,
                        password : document.getElementById('password').value
                    };
                    fetch(url, {
                        method: 'post',
                        headers: {  
                            "Content-Type": "application/json; charset=UTF-8"  
                        },
                        body: JSON.stringify(body)
                    })
                    .then(function(response){
                        response.json()
                        .then(function (data){
                            if (data.status == 'ok')
                                this.setLoggedIn(data.response.accessToken);
                        }.bind(this));
                    }.bind(this))
                } else {
                    console.log('passwords do not match');
                }
            } else {
                console.log('enter a password');
            }
        }
    }

    setLoggedIn(accessToken){
        var date = new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 360);

        document.cookie = "access_token=" + accessToken +
            "; expires=" + date.toUTCString() + "; domain=.movorpovor.ru";

        this.props.loggedIn(true);
    }

    login(){
        var url = 'http://api.movorpovor.ru/traveller/auth/login';
        var body = {
            login: document.getElementById('login').value,
            password : document.getElementById('password').value
        };
        fetch(url, {
            method: 'post',
            headers: {  
                "Content-Type": "application/json; charset=UTF-8"  
            },
            body: JSON.stringify(body)
        })
        .then(function(response){
            response.json()
            .then(function (data){
                if (data.status == 'ok')
                    this.setLoggedIn(data.response.accessToken);
            }.bind(this));
        }.bind(this))
    }

    render(){
        return(
            <div>
                <div>
                    Login: <input id='login'/>
                </div>
                <div>
                    Password: <input id='password' type='password'/>
                </div>
                <div className={(this.state.login?'invisible':'')}>
                    Confirm password: <input id='cpassword' type='password'/>
                </div>
                <button onClick={this.login.bind(this)}>log-in</button>
                <button onClick={this.register.bind(this)}>register</button>
            </div>
        )
    }
}

LoginWidget.propTypes = {
    loggedIn: PropTypes.func.isRequired
}

export default LoginWidget