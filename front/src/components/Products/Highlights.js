import React, {Component} from 'react';
import Products from "./Products";
import Typography from "@material-ui/core/es/Typography/Typography";


class Highlights extends Component {

    render() {
        const filter = {
            highlight: true
        };

        return (
            <div>
                <Typography variant="headline" gutterBottom>
                    Destaques
                </Typography>
                <Products cols={4} filter={filter}/>
            </div>
        );
    }

}

export default Highlights;
