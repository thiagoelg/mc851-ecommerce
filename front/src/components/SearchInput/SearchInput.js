import React, {Component} from 'react';

import {Grid, IconButton, Input, Paper} from "material-ui";
import Search from "@material-ui/icons/es/Search";

class SearchInput extends Component {

    render() {
        return (
            <Paper style={{ borderRadius: '50px' }}>
                <Grid container spacing={0} alignItems="center" justify="center">
                    <Grid item xs={1} />
                    <Grid item xs={10} >
                        <Input
                            placeholder="Buscar produtos..." fullWidth={true}/>
                    </Grid>
                    <Grid item xs={1}>
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