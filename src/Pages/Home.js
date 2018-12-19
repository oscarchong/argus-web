import React, { Component } from 'react';
import axios from 'axios';
import './Home.css';
import constants from '../constants/general';

class Home extends Component{
    constructor(props) {
        super(props) 
        this.state = {
            predictions: [],
            image: undefined,
        }
    }

    fileSelectHandler = event =>{
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () =>{
        console.log(this.state.selectedFile)
        var accessToken = localStorage['access_token']
        alert(accessToken)
        const fd = new FormData();  
        fd.append('photo', this.state.selectedFile, this.state.selectedFile.name);
        axios.post(constants.host + '/login',  { username: localStorage.getItem('username'), password: localStorage.getItem('password') })
        .then(res => axios(constants.host + '/classify', {
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": 'Bearer ' + res.data.access_token
            },
            data: fd
        }))
        .then(res => {
            console.log('resolved', res.data);
            this.setState({
                predictions: res.data.predictions,
                image: res.data.image.url
            })
        })
        .catch( err => {
            console.log('errored', err)
            console.log('err response ', err.response)
        })        
    }

    uploadImage = () => {
             return <center>
                        <p className='homeText'> Welcome to Argus!</p> 
                        <p className='homeText1'>Please upload a car image you want to identify!</p>
                        <br />
                        <br />
                        <input type="file" onChange={this.fileSelectHandler}
                        ref={fileInput => this.fileInput = fileInput}/>
            
                        <button className="uploadButton" onClick={this.fileUploadHandler}>Upload</button>
            
                        <br />
                        <br />
                    </center>
            }

    render(){
        console.log(constants.host + '/' + this.state.image)
        return(
            <div>
            { this.state.image ? <img src={constants.host + '/' + this.state.image}/> : undefined }

            { this.state.image ? this.state.predictions.map(e => {
                    return <center  key={e.score}>
                    <h1>{e.description}</h1>
                    <p style={{fontWeight: "bold"}}>Match Percentage: {(e.score *100).toFixed(2) + '%'}</p>
                    <p className='summary'><p style={{fontWeight: "bold"}}>Summary:</p> {e.summary}</p>
                    <p className='linkbutton'><a href = {e.wikipediaUrl}>Wikipedia Link</a></p>
                    </center>
                }) : this.uploadImage() }
            
            
            </div>
        );
    }
}

export default Home;