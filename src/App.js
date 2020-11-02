import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import classes from './App.module.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
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
    collapsed: true
  }

  componentDidMount() {
    console.log('app mount: ', window.location.href)
  }

  toggleNavbar = () => this.setState({collapsed: !this.state.collapsed});

  render() {
    return (
      <div>
        <header>
            <Router>

                <Navbar color="dark" dark expand="sm">
                    <div className="pt-1 pb-1">
                        <Link to="/trending/gif" className={classes.NavbarBrandLink}>
                            GIF
                        </Link>
                    </div>

                    <NavbarToggler className={classes.NavBarToggler} onClick={this.toggleNavbar} />
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="pt-2 pb-2">
                                    <NavLink to="/trending/gif" 
                                    activeClassName={classes.active}
                                    className={classes.NavbarLink}
                                    >
                                        Trending GIF
                                    </NavLink>
                                    {/* <NavLink to="/trending/gif" 
                                    className={this.state.activeLink === 'trending' ? 
                                    [classes.NavbarLink,classes.active].join(' ') :
                                    classes.NavbarLink}>Trending GIF</NavLink> */}
                            </NavItem>
                            <NavItem className="pt-2 pb-2">
                                    <NavLink to="/search/gif"
                                    activeClassName={classes.active}
                                    className={classes.NavbarLink}
                                    >
                                        Search GIF
                                    </NavLink>
                            </NavItem>
                            <NavItem className="pt-2 pb-2">
                                    <NavLink to="/upload/gif"
                                    activeClassName={classes.active}
                                    className={classes.NavbarLink}
                                    >
                                        Upload GIF
                                    </NavLink>
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
