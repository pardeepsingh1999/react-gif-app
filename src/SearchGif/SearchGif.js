import React, { Component } from 'react'
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
   } from 'reactstrap';

import classes from './SearchGif.module.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { makeGetRequest } from '../http/http-service';
import SingleFeedStructure from '../SingleFeedStructure/SingleFeedStructure';

export default class SearchGif extends Component {

    state = {
        searchInput: '',
        gifData: '',
        gifPagination: '',
        loading: false,
        currentPage: 1,
        gifPerPage: 10,
        gifOffset: 0
    }

    searchGifDataByName = () => {
        this.setState({loading:true})

        makeGetRequest(
            'https://api.giphy.com/v1/gifs/search', 
            null, 
                {
                    api_key:'iQJIGVpAwQI36Glqc1u04Xu6LThD5yA3', 
                    limit: this.state.gifPerPage, 
                    offset: this.state.gifOffset,
                    q: this.state.searchInput
                }
            )
            .then(res => {
                this.setState({
                    gifData: res.data, 
                    gifPagination: res.pagination
                },()=>{
                    this.setState({loading:false})
                    console.log(this.state)
                })
            })
            .catch(err => {
                this.setState({loading:false})
                console.log('api error: ',err)
                alert('error occur in get searched request')
            })
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
        this.searchGifDataByName()
    }

    paginate = (pageNumber) => {
        console.log('pageNumber', pageNumber, 'off', this.state.gifOffset,this.state.currentPage)

        if(pageNumber === this.state.currentPage) return;

        this.setState({currentPage:pageNumber},() => {
            this.setState({gifOffset: (this.state.currentPage-1)*10},() => {
                this.searchGifDataByName();
            })
        })

        // console.log('pageNumber', pageNumber, 'off', this.state.gifOffset)
    }

    previousPage = () => {
        if((this.state.gifOffset-100) <= 0) {
            this.setState({currentPage:1, gifOffset:0},() => {
                this.searchGifDataByName();
            })
        } else {
            this.setState({gifOffset:this.state.gifOffset-100},() => {
                this.setState({currentPage:(this.state.gifOffset/10)+1},() => {
                    this.searchGifDataByName();
                })
            })
        }
        console.log('previous')
    }

    nextPage = () => {
        let t = this.state.gifPagination.total_count;
        if(this.state.gifOffset+100 > t) {
            this.setState({gifOffset:Math.floor(t/10)*10,currentPage:Math.floor(t/10)},() => {
                this.searchGifDataByName();
            })
        } else {
            this.setState({gifOffset:this.state.gifOffset+100},() => {
                this.setState({currentPage:(this.state.gifOffset/10)+1},() => {
                    this.searchGifDataByName();
                })
            })
        }
        console.log('next')
    }

    render() {

        const FeedCard = this.state.gifData.length>0 ? 
                            this.state.gifData.map(e => {
                                return <SingleFeedStructure 
                                key={e.id} 
                                userAvatar={e.user ? e.user.avatar_url : 'http://localhost:3000/sampleGif.gif'}
                                userName={e.username ? e.username : 'Guest User'}
                                date={e.import_datetime.split(' ')[0]}
                                title={e.title}
                                gifUrl={e.images.original.url}
                                />
                            })
                            :
                            null;
        
        
        let disableLastBtn=true;
        let paginationElement='';

        if(FeedCard) {                    

            const indexOfLastPost = Math.ceil(this.state.gifPagination.total_count/10)

            const pageNumber = []

            disableLastBtn=false;

            if(this.state.gifOffset % 100 === 0) {
                for(let i = this.state.gifOffset/10; i < (this.state.gifOffset/10)+10; i++) {
                    if(i>=indexOfLastPost) {
                        disableLastBtn = true;
                        break;
                    }
                    if(i+1>=indexOfLastPost) disableLastBtn = true;

                    pageNumber.push(i+1)
                }
            } else {
                if(this.state.gifOffset < 100) {
                    for(let i = 0; i < this.state.gifPerPage; i++) {
                        if(i+1>=indexOfLastPost) {
                            disableLastBtn = true;
                            break;
                        }
                        if(i>=indexOfLastPost) disableLastBtn = true;

                        pageNumber.push(i+1)
                    }
                } else {
                    const pageReminder = this.state.gifOffset % 100;

                    let startingValue = ( (this.state.gifOffset - pageReminder) / 10)
                    for(let i = startingValue; i < startingValue+10; i++) {
                        if(i>=indexOfLastPost) {
                            disableLastBtn = true;
                            break;
                        }
                        if(i+1>=indexOfLastPost) disableLastBtn = true;

                        pageNumber.push(i+1)
                    }
                }
            }

            const currentPage = this.state.currentPage;

            paginationElement = pageNumber.map(e => {
                return (<PaginationItem key={e} className={currentPage===e ? 'active' : ''}>
                                <PaginationLink onClick={()=>this.paginate(e)}>
                                    {e}
                                </PaginationLink>
                        </PaginationItem>)
            })
        }

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

                {
                this.state.loading ? 
                    <img src={'http://localhost:3000/loader.gif'} alt="loader" className={classes.searchLoader} /> 
                    : 
                    <div>
                        <div className={[classes.AllCardSection,'d-flex', 
                        'justify-content-around', 'flex-wrap'].join(' ')}>
                            { FeedCard }
                        </div>

                        <div style={FeedCard?{display:'block'}:{display:'none'}}>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem>
                                        <PaginationLink previous 
                                        disabled={this.state.gifOffset<100?true:false}
                                        onClick={this.previousPage} />
                                    </PaginationItem>
                                        {paginationElement}
                                    <PaginationItem>
                                        <PaginationLink next 
                                        disabled={
                                            (disableLastBtn)
                                            ?
                                            true
                                            :
                                            false
                                        }
                                        onClick={this.nextPage} />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        </div>
                    </div>
                }


            </div>
        )
    }
}
