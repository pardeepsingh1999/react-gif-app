import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './App.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { 
  Collapse, Navbar, NavbarToggler, Nav, NavItem 
} from 'reactstrap';

import SearchGif from './SearchGif/SearchGif';
import TrendingGif from './TrendingGif/TrendingGif';
import UploadGif from './UploadGif/UploadGif';
import Error from './Error';
// import Home from './Home';
import PreviewUploadGif from './PreviewUploadGif/PreviewUploadGif';

class App extends Component {

  state = {
    gifData: '',
    gifType: '',
    gifPagination: '',
    loading: true,
    collapsed: true,
    activeLink: 'upload'
  }

  componentDidMount() {
    console.log('app mount: ', window.location.href)
    const activeLinkIs = window.location.href.split('/')[3] ? window.location.href.split('/')[3] : '';
    this.setState({activeLink:activeLinkIs})
  }

  toggleNavbar = () => this.setState({collapsed: !this.state.collapsed});

  handleActiveLink = (e) => {
      const activeLinkIs = e.target.href ? e.target.href.split('/')[3] : '';
      this.setState({activeLink:activeLinkIs})
  }


  render() {
    return (
      <div>
        <header>
            <Router>

                <Navbar color="dark" dark expand="sm">
                    <div className="pt-1 pb-1" onClick={this.handleActiveLink}>
                        <Link to="/trending/gif" className={classes.NavbarBrandLink}>
                            GIF
                        </Link>
                    </div>

                    <NavbarToggler className={classes.NavBarToggler} onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="pt-2 pb-2" onClick={this.handleActiveLink}>
                                    <Link to="/trending/gif" 
                                    className={this.state.activeLink === 'trending' ? 
                                    [classes.NavbarLink,classes.active].join(' ') :
                                    classes.NavbarLink}>
                                        Trending GIF
                                    </Link>
                                    {/* <NavLink to="/trending/gif" 
                                    className={this.state.activeLink === 'trending' ? 
                                    [classes.NavbarLink,classes.active].join(' ') :
                                    classes.NavbarLink}>Trending GIF</NavLink> */}
                            </NavItem>
                            <NavItem className="pt-2 pb-2" onClick={this.handleActiveLink}>
                                    <Link to="/search/gif"
                                    className={this.state.activeLink === 'search' ? 
                                    [classes.NavbarLink,classes.active].join(' ') :
                                    classes.NavbarLink}>
                                        Search GIF
                                    </Link>
                            </NavItem>
                            <NavItem className="pt-2 pb-2" onClick={this.handleActiveLink}>
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
                    {/* <Route exact path="/" component={Home} /> */}

                    <Route exact path="/" render={() => <Redirect to="/trending/gif" />} />

                    <Route path="/trending/gif" component={TrendingGif} />
                       
                    <Route path="/search/gif" component={SearchGif} />
                     
                    <Route path="/upload/gif" component={UploadGif} />

                    <Route path="/preview/:gifId" component={PreviewUploadGif} />

                    <Route component={Error} />
                    {/* <Route path="/" component={YourComponent} />
                    <Route path="/" render={() => <Redirect to="/route-name" />} /> */}
                </Switch>

            </Router>
        </header>   
      </div>
    );
  }
  
}

export default App;
