import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Typography} from "material-ui";

class Logo extends Component {
    render() {
        return (
            <div onClick={() => this.props.history.push("/")} style={{cursor: 'pointer'}}>
                <Typography variant="title" color="inherit">
                    ToppenStore
                </Typography>
            </div>
        );
    }
}

export default withRouter(Logo);