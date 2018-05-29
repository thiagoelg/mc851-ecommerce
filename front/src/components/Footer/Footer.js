import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import Logo from "../Logo/Logo";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Grid from "@material-ui/core/es/Grid/Grid";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Typography from "@material-ui/core/es/Typography/Typography";
import ListItem from "@material-ui/core/es/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText";
import List from "@material-ui/core/es/List/List";

class Footer extends Component {
    render() {
        return (
            <AppBar position="static" color="default" style={{top: '80%', bottom: '0%', padding: 20}}>
                <Toolbar>
                    <Grid container spacing={8} alignItems="center" justify="center">
                        <Grid item xs={12} sm={4} >
                            <Logo/>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Typography variant="title" color="inherit">
                                Institucional
                            </Typography>
                            <div>
                                <List dense={true}>
                                    <ListItem button>
                                        <ListItemText primary="Sobre nós"/>
                                    </ListItem>
                                    <ListItem button onClick={(e) => this.props.history.push('/customerservice')}>
                                        <ListItemText primary="Central de Ajuda"/>
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <Typography variant="title" color="inherit">
                                Políticas
                            </Typography>
                            <div>
                                <List dense={true} color="inherit">
                                    <ListItem button>
                                        <ListItemText primary="Política de Vendas"/>
                                    </ListItem>
                                    <ListItem button>
                                        <ListItemText primary="Política de Privacidade"/>
                                    </ListItem>
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withRouter(Footer);