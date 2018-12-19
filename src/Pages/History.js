import React, { Component } from 'react';
import axios from 'axios';
import constants from '../constants/general';
import './Home.css';
import './History.css';
import { Popover, Button, OverlayTrigger, Image } from 'react-bootstrap';


class History extends Component {
    constructor (props){
        super(props)
        this.state = {
            historyItems: [],
            item: undefined,
        }
        this.getHistory ()
    }

    getHistory = item => {
        axios.post(constants.host + '/login',  { username: localStorage.getItem('username'), password: localStorage.getItem('password') })
        .then (res => {
            var history_data = res.data.history
            console.log(history_data)
            this.setState({ historyItems: history_data })
            localStorage.setItem('access_token', res.data.access_token)
        })
        .catch(err => {
            console.log(err.response)
            alert("Please log in")
        })
    }

    deleteImage = item => {
        const fd = new FormData();
        fd.append('id', item.id)
        axios(constants.host + '/delete', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": 'Bearer ' + localStorage['access_token']
            },
            data: fd
            })
            .then(data => {
                const historyItemsCopy = [ ...this.state.historyItems ]
                const filtered = historyItemsCopy.filter(e => e.id !== item.id)
                this.setState({ historyItems: filtered })
            }).catch(err => {
                alert(err)
                console.log(err)
            })
    }

    imageClick = item => {
        this.setState({ item })
    }

    refresh = item => {
        this.getHistory()
    }

    render(){
        return(
            <div>
                <p className='homeText1'>History</p>
                <Button onClick = {e => this.refresh()}> Refresh</Button> <br/>
                { this.state.historyItems.map(item => {
                    return <OverlayTrigger
                                trigger={['focus', 'click']}
                                placement="bottom"
                                overlay={
                                    <Popover id="popover-trigger-hover-focus" title={item.id}>
                                        <Button bsStyle="danger" onClick={e => this.deleteImage(item)}>Delete</Button>
                                    </Popover>
                                }
                            >
                                <Image className="container" onClick={e => this.imageClick(item)}  src={constants.host + '/' + item.image.url} key={item.id}/>
                            </OverlayTrigger>
                })}
                <br/>
                <div>
                    
                    { this.state.item ? this.state.item.predictions.map(e => {
                        return <center><div key={e.score}> 
                        <h1>{e.description}</h1>
                        <p style={{fontWeight: "bold"}}>Match Percentage: {(e.score *100).toFixed(2) + '%'}</p>
                        <p className='summary'><p style={{fontWeight: "bold"}}>Summary:</p> {e.summary}</p>
                        <p className='linkbutton'><a href = {e.wikipediaUrl}>Wikipedia Link</a></p> </div>
                        </center>
                    }) : 'NO ITEM IMAGE SELECTED' }
                </div>

            </div>

        );
    }

}

export default History;