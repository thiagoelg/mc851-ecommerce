import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Grid, IconButton, Input, Paper} from "material-ui";
import Search from "@material-ui/icons/es/Search";

class SearchInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchExpression: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    search() {
        this.props.history.push(`/busca?search=${this.state.searchExpression}`);
    }

    handleClick(e) {
        this.search()
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.search()
        }
    }

    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        return (
            <Paper style={{borderRadius: '50px'}}>
                <Grid container spacing={0} alignItems="center" justify="center">
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <Input placeholder="Buscar produtos..."
                               fullWidth={true}
                               name="searchExpression"
                               value={this.state.searchExpression}
                               onChange={this.handleChange}
                               onKeyPress={this.handleKeyPress}/>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton onClick={this.handleClick}>
                            <Search/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Paper>

        );
    }
}

export default withRouter(SearchInput);