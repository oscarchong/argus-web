import React, { Component } from 'react';
import axios from 'axios';
import constants from '../constants/general';


class Logout extends Component {
    componentDidMount() {
        axios(constants.host + '/logout', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": 'Bearer ' + localStorage['access_token']
            }
        }).then(data => {
            alert('Okay Logged Out!')
        }).catch(err => {
            alert('Error\n' + err.message)
        })
    }

    render(){
        return(
            <div className='homeText1'>
                <p> You have logged out!</p>
            </div>
        );
    }
}

export default Logout;