import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import {AppBar, Button, Grid, Toolbar, Drawer, ListItem, Badge} from "material-ui";
import CheckboxesGroup from '../FiltroCategoria/CheckboxesGroup'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});

const styleGridList = {
    gridList: {
      width: '80%',
      overflowY: 'auto',
    },
};
  
var height = 280;
var width = 280;

class FiltroCategoria extends Component {
    state = {
        tileData: [],
    }

    componentDidMount() {
        fetch('http://back.localhost/products?highlight=true')
        .then(results => {
            return results.json();
        }).then(data => {
            this.setState({tileData: data});
        })
    }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{
                paper: classes.drawerPaper,
                }} >
                <div className={classes.toolbar} />
                <CheckboxesGroup/>
            </Drawer>
            <main className={classes.content}>
                <GridList cellHeight={height} cellWidth={width} cols={4} style={styleGridList}>
                    <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                        <Subheader component="div">Categoria Escolhida</Subheader>
                    </GridListTile>
                    {this.state.tileData.map(tile => (
                        <GridListTile key={tile.imageUrl} cols={1}>
                        <img src={tile.imageUrl} alt={tile.name} style={{height:'100%', width:'auto', margin:'0 auto', display:'block'}}/>
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span>{tile.description} por {tile.price}</span>}
                            actionIcon={
                            <IconButton>
                                <InfoIcon />
                            </IconButton>
                            }
                        />
                        </GridListTile>
                    ))}
                </GridList>
            </main>
        </div>
    );
  }
}

FiltroCategoria.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FiltroCategoria);