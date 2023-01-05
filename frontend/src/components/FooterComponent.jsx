import React, { Component } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
var currentDate = new Date();
var currentYear = currentDate.getFullYear();
var rights = {
  position: "absolute",
  bottom: "0",
  marginLeft: "700px",
  display: "block",
  fontWeight: "bold",
  color: "#00917c"
};
class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className = "footer">
                    <span className="text-muted">All Rights Reserved @Soul-cathers {currentYear}</span>
                    <br></br><GitHubIcon /> <FacebookIcon /> <TwitterIcon />          
                </footer>
            </div>
        )
    }
}

export default FooterComponent
