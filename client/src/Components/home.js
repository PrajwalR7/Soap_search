import SearchBar from "material-ui-search-bar";
import React, { Component } from "react";
import '.\\styles\\home.css'
import Typography from '@material-ui/core/Typography';
//import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core";

const styles = theme => ({
  btnStyle: {
    borderRadius: "10px",
    color: "black",
    textTransform: "none",
    backgroundColor: "rgb(231 231 231)",
    padding: "12px 16px",
    fontSize: "14px",
    margin:"auto 20px",
    boxShadow:"none",
  '&:hover': {
    backgroundColor: 'rgb(62 204 137)'
  }
  },
});

// *snip*
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            value:null,
            apiResponse: ""
        };
        this.callAPI=this.callAPI.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    
    handleOnChange(newValue){
        this.setState({value:newValue});
    }

    callAPI(){
        let value=this.state.value;
        fetch("http://localhost:5000/:"+value)
            .then(res => res.json())
            .then(res => {
                let url = res.url;
                window.location.href = url;
            })
            .catch(err =>{
                console.log(err);
            });  
    }
    
    render(){
        const {classes} = this.props;
        return (
            <div style={{"height":"100vh"}} class="main-body">
                <div className="searchConatiner">
                    <Typography align="center" classes={{
                            root: classes.root
                        }} variant="h2" gutterBottom>
                        <span class="soap">soap</span><span class="search-text">Search</span>
                </Typography>
                    <SearchBar
                    className="searchbar"
                    value={this.state.value}
                    onChange={this.handleOnChange}
                    onRequestSearch= {this.callAPI}
                    placeholder="Search your favorite movie"
                    cancelOnEscape={true}
                    />
                    <p>To track search history Login</p>
                    <div class="main-body">
                    <Link 
                    style={{textDecoration:"none"}}
                    to='/signin'>
                        <Button 
                        className={classes.btnStyle}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        >SignIn</Button>
                        </Link>
                        <Link 
                    style={{textDecoration:"none"}}
                    to='/signup'>
                        <Button 
                        className={classes.btnStyle}
                        type="submit"
                        variant="contained"
                        color="secondary"
                        >SignUp</Button>
                        </Link>
                    </div>
                    
                </div>
                
            </div>
        );
}
}

export default  withStyles(styles)(Home);