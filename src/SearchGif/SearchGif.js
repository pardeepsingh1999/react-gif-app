import React, { Component } from 'react'
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
   } from 'reactstrap';

import classes from './SearchGif.module.css';


export default class SearchGif extends Component {

    state = {
        searchInput: ''
    }

    searchInputOnChange = (e) => {
        this.setState({searchInput: e.target.value})
    }

    searchGifByName = (e) => {
        const searchString = this.state.searchInput.trim();

        if(searchString.length === 0 || searchString === null || searchString === undefined) {
            alert('Empty String Not Allowed')
            return;
        }

        console.log(searchString)

    }

    render() {
        return (
            <div className="container">
                
                <InputGroup className={classes.searchGifController}>
                    <Input className={classes.searchGifInput}
                    value={this.state.searchInput} onChange={this.searchInputOnChange}
                    type="text" placeholder="Search gif by name..." />
                    <InputGroupAddon addonType="append">
                        <Button onClick={this.searchGifByName}
                        className={classes.searchGifButton} color="primary">
                            Search GIF
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                <hr />

            </div>
        )
    }
}
