import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Typography} from "@material-ui/core";
import Link from "../Link/Link";

class Logo extends Component {
    render() {
        return (
            <Link to={`/`} style={{textDecoration: 'none'}}>
                <Typography variant="title" color="inherit">
                    ToppenStore
                </Typography>
            </Link>
        );
    }
}

export default withRouter(Logo);