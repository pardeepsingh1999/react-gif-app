import React, { Component } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import classes from './TrendingGif.module.css';
import SingleFeedStructure from '../SingleFeedStructure/SingleFeedStructure';
import { makeGetRequest } from '../http/http-service';

export default class TrendingGif extends Component {

    state = {
        gifData: '',
        gifPagination: '',
        loading: false,
        currentPage: 1,
        gifPerPage: 10,
        gifOffset: 0
    }

    async componentDidMount() {
        console.log('trending mount',this.state.gifPerPage)
        this.trendingGifGetData();
    }

    trendingGifGetData = () => {
        this.setState({loading:true})

        makeGetRequest(
            'https://api.giphy.com/v1/gifs/trending', 
            null, 
                {
                    api_key:'iQJIGVpAwQI36Glqc1u04Xu6LThD5yA3', 
                    limit: this.state.gifPerPage, 
                    offset: this.state.gifOffset
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
    
                // console.log(res)
            })
            .catch(err => {
                console.log('api error: ',err)
                alert('error occur in get trending request')
            })
    }

    paginate = (pageNumber) => {
        console.log('pageNumber', pageNumber, 'off', this.state.gifOffset,this.state.currentPage)

        if(pageNumber === this.state.currentPage) return;

        this.setState({currentPage:pageNumber},() => {
            this.setState({gifOffset: (this.state.currentPage-1)*10},() => {
                this.trendingGifGetData();
            })
        })

        // console.log('pageNumber', pageNumber, 'off', this.state.gifOffset)
    }

    previousPage = () => {
        if((this.state.gifOffset-100) <= 0) {
            this.setState({currentPage:1, gifOffset:0},() => {
                this.trendingGifGetData();
            })
        } else {
            this.setState({gifOffset:this.state.gifOffset-100},() => {
                this.setState({currentPage:(this.state.gifOffset/10)+1},() => {
                    this.trendingGifGetData();
                })
            })
        }
        console.log('previous')
    }

    nextPage = () => {
        let t = this.state.gifPagination.total_count;
        if(this.state.gifOffset+100 > t) {
            this.setState({gifOffset:Math.floor(t/10)*10,currentPage:Math.floor(t/10)},() => {
                this.trendingGifGetData();
            })
        } else {
            this.setState({gifOffset:this.state.gifOffset+100},() => {
                this.setState({currentPage:(this.state.gifOffset/10)+1},() => {
                    this.trendingGifGetData();
                })
            })
        }
        console.log('next')
    }

    render() {

        if(this.state.loading) {
            return <img src={'http://localhost:3000/loader.gif'} alt="loader" />
        }

        const FeedCard = this.state.gifData.length>0 ? 
                            this.state.gifData.map(e => {
                                return <SingleFeedStructure 
                                key={e.id} 
                                userAvatar={e.user ? e.user.avatar_url : 'http://localhost:3000/sampleGif.gif'}
                                userName={e.username ? e.username : 'Guest User'}
                                date={e.trending_datetime.split(' ')[0]}
                                title={e.title}
                                gifUrl={e.images.original.url}
                                />
                            })
                            :
                            null

        const indexOfLastPost = Math.ceil(this.state.gifPagination.total_count/10)

        const pageNumber = []

        let disableLastBtn = false;

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

        const paginationElement = pageNumber.map(e => {
            return (<PaginationItem key={e} className={currentPage===e ? 'active' : ''}>
                            <PaginationLink onClick={()=>this.paginate(e)}>
                                {e}
                            </PaginationLink>
                    </PaginationItem>)
        })

        return (
            <div className="container">
                <div>
                    <h2 className={classes.TrendingPageHeading}>#Trending GIFs</h2>
                </div>
                <hr />

                <div className={[classes.AllCardSection,'d-flex', 
                'justify-content-around', 'flex-wrap'].join(' ')}>
                    { FeedCard }
                </div>

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
        )
    }
}
