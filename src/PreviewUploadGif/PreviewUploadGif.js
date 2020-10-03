import React, { Component } from 'react'

export default class PreviewUploadGif extends Component {

    componentDidMount() {
        let gifId = this.props.match.params.gifId
        console.log(gifId)
    }

    render() {
        return (
            <div>
                <p>preview work</p>
            </div>
        )
    }
}
