import React, {Component} from 'react';
import {AppBar, Button, Grid, Toolbar, Drawer, ListItem, Badge} from "material-ui";
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const styles = theme => ({
    drawerPaper: {
      position: 'relative',
      width: 240,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});

class StoreDrawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerOpened: false
        };
    }
    
    
    toggleDrawer () {
        this.setState({
            drawerOpened: !this.state.drawerOpened
        });
    };
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <IconButton className="menuButton" color="#212121" onClick={() => this.toggleDrawer()}>
                    <MenuIcon />
                </IconButton>
                <div class="storedrawer">
                    <Drawer 
                        open={this.state.drawerOpened}
                        onClose={() => this.toggleDrawer()}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="temporary"
                    >
                        <List>
                            <ListItem button>Eletrodomésticos</ListItem>
                            <ListItem button>Smartphones</ListItem>
                            <ListItem button>Informática</ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button>Souveniers</ListItem>
                            <ListItem button>Livros</ListItem>
                            <ListItem button>Beleza</ListItem>
                        </List>
                    </Drawer>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(StoreDrawer);