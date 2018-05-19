import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Button from "material-ui/es/Button/Button";


class NavigateButton extends Component {

    render() {
        return (
            <Button
                onClick={() => this.props.history.push(this.props.href)}
                color={this.props.color}
                variant={this.props.variant}>
                {this.props.children}
            </Button>
        );
    }

}

export default withRouter(NavigateButton);