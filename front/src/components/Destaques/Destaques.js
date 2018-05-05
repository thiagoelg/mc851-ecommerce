import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const styleGridList = {
  gridList: {
    width: '80%',
    overflowY: 'auto',
  },
};

var height = 280;
var width = 280;

class Destaques extends Component {
  constructor() {
    super();
    this.state = {
      tileData: [],
    }
  };
  
  
  componentDidMount() {
    fetch('http://back.localhost/products?highlight=true')
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({tileData: data});
      })
  }

  render() {

    return (
      <div className="destaques" justify='center'>
        <GridList cellHeight={height} cellWidth={width} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
            <Subheader component="div">Produtos em Destaque</Subheader>
          </GridListTile>
          {this.state.tileData.map(tile => (
            <GridListTile key={tile.imageUrl} cols={1}>
              <img src={tile.imageUrl} alt={tile.name} height={height * 0.6} width={width * 0.6}/>
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
      </div>
    );
  }
}

export default Destaques;
