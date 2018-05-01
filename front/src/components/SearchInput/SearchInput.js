import React, {Component} from 'react';

import {Grid, IconButton, Input, Paper} from "material-ui";
import Search from "@material-ui/icons/es/Search";

class SearchInput extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={{ borderRadius: '50px' }}>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1} alignContent="center" justify="center"/>
                    <Grid item xs={10} alignContent="center" justify="center">
                        <Input
                            placeholder="Buscar produtos..." fullWidth={true}/>
                    </Grid>
                    <Grid item xs={1} alignContent="center" justify="center">
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

        );
    }
}

export default SearchInput;