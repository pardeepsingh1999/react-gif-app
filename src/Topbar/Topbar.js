import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { 
    Collapse, Navbar, NavbarToggler, 
    Nav, NavItem 
  } from 'reactstrap';
import SearchGif from '../SearchGif/SearchGif';
import TrendingGif from '../TrendingGif/TrendingGif';
import UploadGif from '../UploadGif/UploadGif';

import classes from './Topbar.module.css'

export default class Topbar extends Component {

    state = {
        collapsed: true,
        activeLink: 'upload'
    }

    componentDidMount() {
        console.log('cc d mount')
    }

    toggleNavbar = () => this.setState({collapsed: !this.state.collapsed});

    handleActiveLink = (e) => {
        const activeLinkIs = e.target.href.split('/')[3];
        this.setState({activeLink:activeLinkIs})
    }

    render() {        

        return (
            <div>
                <header>
                <Router>

                    <Navbar color="dark" dark expand="sm">
                        <div onClick={this.handleActiveLink}>
                            <Link to="/trending/gif" className={classes.NavbarBrandLink}>
                                GIF
                            </Link>
                        </div>

                        <NavbarToggler className={classes.NavBarToggler} onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.collapsed} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem onClick={this.handleActiveLink}>
                                        <Link to="/trending/gif" 
                                        className={this.state.activeLink === 'trending' ? 
                                        [classes.NavbarLink,classes.active].join(' ') :
                                        classes.NavbarLink}>
                                            Trending GIF
                                        </Link>
                                </NavItem>
                                <NavItem onClick={this.handleActiveLink}>
                                        <Link to="/search/gif"
                                        className={this.state.activeLink === 'search' ? 
                                        [classes.NavbarLink,classes.active].join(' ') :
                                        classes.NavbarLink}>
                                            Search GIF
                                        </Link>
                                </NavItem>
                                <NavItem onClick={this.handleActiveLink}>
                                        <Link to="/upload/gif"
                                        className={this.state.activeLink === 'upload' ? 
                                        [classes.NavbarLink,classes.active].join(' ') :
                                        classes.NavbarLink}>
                                            Upload GIF
                                        </Link>
                                </NavItem>
                            </Nav>
                            {/* <NavbarText>Simple Text</NavbarText> */}
                        </Collapse>
                    </Navbar>

                    <Switch>
                        <Route path="/trending/gif">
                            <TrendingGif />
                        </Route>
                        <Route path="/search/gif">
                            <SearchGif />
                        </Route>
                        <Route path="/upload/gif">
                            <UploadGif />
                        </Route>
                    </Switch>

                </Router>
                </header>
            </div>
        )
    }
}
