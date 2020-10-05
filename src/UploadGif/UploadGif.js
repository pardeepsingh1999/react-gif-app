import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import ChipInput from "material-ui-chip-input";

import classes from './UploadGif.module.css';
import { makePostRequest } from '../http/http-service';

export default class UploadGif extends Component {

    state = {
        selectedFile: '',
        tags: [],
        gifId: '',
        loading: false,
        imagePreview: ''
    }

    previewUploadGif = () => {
        this.props.history.push(`/preview/${this.state.gifId}`)
    }

    uploadGifToServer = (e) => {
        e.preventDefault();

        if(this.state.selectedFile === '' || this.state.selectedFile.type !== 'image/gif') {
            this.setState({ imagePreview: '' }); 
            alert('only gif file is allowed!');
            return;
        }

        const uploadGifData = new FormData();

        uploadGifData.append('file', this.state.selectedFile)

        console.log('file: ', this.state.selectedFile)
        if(this.state.tags.length>0) {
            let gifTags = this.state.tags.join(',')
            uploadGifData.append('tags', gifTags)
            console.log(gifTags)
        }

        uploadGifData.append('api_key', 'iQJIGVpAwQI36Glqc1u04Xu6LThD5yA3')

        this.setState({loading:true})

        makePostRequest(
            `https://upload.giphy.com/v1/gifs`, 
            uploadGifData, 
            null    
            )
            .then(res => {
                this.setState({
                    gifId: res.data.id, 
                },()=>{
                    this.setState({loading:false})
                    console.log(this.state)
                    this.previewUploadGif()
                })
            })
            .catch(err => {
                this.setState({loading:false})
                console.log('api error: ',err)
                alert('error in uploading gif!')
                // this.props.history.push(`/error`)
            })
    }

    // Add Chips
    handleAddChip = (chip) => {
        if(chip.length === 0) return;

        this.setState({
            tags: [...this.state.tags, chip.trim()]
        },() => {
            console.log(this.state.tags)
        });
    }

    // Delete Chips
    handleDeleteChip = (chip) => {
        const chipIndex = this.state.tags.indexOf(chip)
        if(chipIndex === -1) return;

        const allTags = this.state.tags;

        allTags.splice(chipIndex,1)

        this.setState({
            tags: allTags
        });
    }

    // On file select (from the pop up) 
    onFileChange = (e) => { 
     
        if(e.target.files.length === 0 || e.target.files[0].type !== 'image/gif') {
            this.setState({ imagePreview: '' }); 
            e.target.value = ''
            alert('only gif file is allowed!');
            return;
        }
        // Update the state 
        // console.log(e.target.files[0])

        if (e.target.files && e.target.files[0]) {
            let outsideThis = this;
            this.setState({ selectedFile: e.target.files[0] })
            var reader = new FileReader();
            reader.onload = function(event) {
            //    console.log(event.target.result)
               outsideThis.setState({ imagePreview: event.target.result }); 
            }
            reader.readAsDataURL(e.target.files[0]);
        }
      
       
    }; 

    render() {

        return (
            <div className="container">
                <div>
                    <h2 className={classes.UploadPageHeading}>#Add More GIF</h2>
                </div>
                <hr />

                {
                    this.state.loading ? 
                    <>
                        <img src={'http://localhost:3000/loader.gif'} alt="loader"
                        className={classes.UploadLoader} /> 
                        <p className={classes.UploadLoaderText}>Uploading Gif...</p>
                    </>
                    : 
                    <>

                    <Form onSubmit={this.uploadGifToServer} encType="multipart/form-data">
                        <FormGroup>
                            <Label for="exampleCustomFileBrowser">Gif File</Label>
                            <CustomInput 
                            required 
                            onChange={this.onFileChange}
                            name="file"
                            accept="image/gif"
                            type="file" 
                            className={classes.gifFileInput}
                            id="exampleCustomFileBrowser" 
                            label="Yo, pick a gif file!" />
                        </FormGroup>
                        {
                            this.state.imagePreview !== '' ?
                            <>
                            <p className={classes.gifImagePreviewText}>
                                GIF Preview:
                            </p>
                            <img width="230" height="240" alt="test"
                            className={classes.gifImagePreview}
                            src={this.state.imagePreview}></img>
                            </>
                            :
                            null
                        }
                        
                        <FormGroup>
                            <Label>Tags Name</Label> <br />
                            <ChipInput
                                className={classes.chipTagInput}
                                value={this.state.tags}
                                onAdd={(chip) => this.handleAddChip(chip)}
                                onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                            />
                        </FormGroup>
                        
                        <FormGroup> 
                            <Button color="primary" 
                            className={[classes.uploadGifButton,"float-right"].join(' ')} 
                            type="submit">
                                Add Gif
                            </Button>
                        </FormGroup>
                    </Form>
                    </>
                }
            
            </div>
        )
    }
}
