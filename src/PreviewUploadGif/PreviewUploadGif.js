import React, { Component } from 'react'
import SingleFeedStructure from '../SingleFeedStructure/SingleFeedStructure';

import classes from './PreviewUploadGif.module.css';
import { makeGetRequest } from '../http/http-service';

export default class PreviewUploadGif extends Component {

    state = {
        gifId: '',
        gifData: '',
        loading: false,
    }

    async componentDidMount() {
        let gifId = this.props.match.params.gifId;
        this.setState({gifId:gifId},() => {
            this.getGifPreviewDataById(this.state.gifId)
            console.log(this.state.gifId)
        })
    }

    getGifPreviewDataById = (gifId) => {
        this.setState({loading:true})

        makeGetRequest(
            `https://api.giphy.com/v1/gifs/${gifId}`, 
            null, 
                {
                    api_key:'iQJIGVpAwQI36Glqc1u04Xu6LThD5yA3', 
                }
            )
            .then(res => {
                this.setState({
                    gifData: res.data, 
                },()=>{
                    this.setState({loading:false})
                    console.log(this.state)
                })
            })
            .catch(err => {
                this.setState({loading:false})
                console.log('api error: ',err)
                alert(err.meta.msg)
                this.props.history.push(`/error`)
            })
    }

    render() {

        let FeedCard;
        if(this.state.gifData !== '') {
            let data = {
                userAvatar: this.state.gifData.user ? this.state.gifData.user.avatar_url : require('../assets/sampleGif.gif'),
                userName: this.state.gifData.username ? this.state.gifData.username : 'Guest User',
                date: this.state.gifData.import_datetime.split(' ')[0],
                title: this.state.gifData.title,
                gifUrl: this.state.gifData.images.original.url,
            }
            FeedCard = <SingleFeedStructure
                            key={this.state.gifData.id} 
                            data={data}
                        />
        } else {
            FeedCard = null;
        }

                            

        return (
            <div className="container">
               <div>
                    <h2 className={classes.PreviewPageHeading}>#My Uploaded GIF Preview</h2>
                </div>

                {
                this.state.loading ? 
                    <img src={require('../assets/loader.gif')} alt="loader" className={classes.previewLoader} /> 
                    : 
                    <>
                    <hr />
                    <div className={[classes.MainPreviewBody,'d-flex', 
                    'justify-content-around', 'flex-wrap'].join(' ')}>
                        { FeedCard }
                    </div>
                    </>
                }


            </div>
        )
    }
}
