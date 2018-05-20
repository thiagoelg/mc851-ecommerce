import React, {Component} from 'react'
import './link.css'
import OriginalLink from "react-router-dom/es/Link";

class Link extends Component {

    render() {
        return (
            <OriginalLink to={this.props.to}>
                {this.props.children}
            </OriginalLink>
        )
    }

}

export default Link;