import React, { Component } from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

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
                    <span className="text-muted">All Rights Reserved 2022 @Soul-cathers</span>
                    <br></br><GitHubIcon /> <FacebookIcon /> <TwitterIcon />          
                </footer>
            </div>
        )
    }
}

export default FooterComponent
