import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, CustomInput } from 'reactstrap';
import ChipInput from "material-ui-chip-input";

import classes from './UploadGif.module.css';

export default class UploadGif extends Component {

    state = {
        file: '',
        tags: []
    }
    previewUploadGif = (gifId) => {
        this.props.history.push(`/preview/${gifId}`)
        // return (<Router> <Redirect to='/trending/gif' Component={TrendingGif} /> </Router>)
    }

    uploadGifToServer = (e) => {
        e.preventDefault();

        if(e.target.file.files.length === 0 || e.target.file.files[0].type !== 'image/gif') {
            alert('only gif file is allowed!');
            return;
        }

        const uploadGifData = new FormData();

        uploadGifData.append('file', e.target.file.files[0])

        if(this.state.tags.length>0) {
            let gifTags = this.state.tags.join(',')
            uploadGifData.append('tags', gifTags)
        }

        console.log(uploadGifData)

    }

    // Add Chips
    handleAddChip = (chip) => {
        if(chip.length === 0) return;

        this.setState({
            tags: [...this.state.tags, chip.trim()]
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

    render() {
        return (
            <div className="container">
                <div>
                    <h2 className={classes.UploadPageHeading}>#Add More GIF</h2>
                </div>
                <hr />

                <Form onSubmit={this.uploadGifToServer}>
                    <FormGroup>
                        <Label for="exampleCustomFileBrowser">Gif File</Label>
                        <CustomInput 
                        // required 
                        name="file"
                        type="file" 
                        className={classes.gifFileInput}
                        id="exampleCustomFileBrowser" 
                        label="Yo, pick a gif file!" />
                    </FormGroup>

                    <FormGroup>
                        <Label>Tags Name</Label> <br />
                        <ChipInput
                            // required
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
            </div>
        )
    }
}
