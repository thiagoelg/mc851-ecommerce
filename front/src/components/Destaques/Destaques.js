import React,  {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto',
    },
  };

const tilesData = [
    {
      img: 'geladeira.jpeg',
      title: 'Geladeira',
      author: 'R$ 4000,00',
    },
    {
      img: 'guarda.jpeg',
      title: 'Guarda Roupas',
      author: 'R$ 1500,00',
    },
    {
      img: 'iphone.jpeg',
      title: 'Iphone X',
      author: 'R$ 7000,00',
    },
    {
      img: 'maquina.jpeg',
      title: 'Máquina de Lavar',
      author: 'R$ 2000,00',
    },
    {
      img: 'note.jpeg',
      title: 'Notebook',
      author: 'R$ 1600,00',
    },
    {
      img: 'secador.jpeg',
      title: 'Secador de Cabelo',
      author: 'R$ 400,00',
    },
    {
      img: 'sofa.jpeg',
      title: 'Sofá',
      author: 'R$ 1800,00',
    },
    {
      img: 'TV.jpeg',
      title: 'Televisão',
      author: 'R$ 2500,00',
    },
  ];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */

class Destaques extends Component {
  render() {
      return (
        <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
          >

          <Subheader>Produtos em Destaque</Subheader>
          {tilesData.map((tile) => (
            <GridTile
              key={tile.img}
              title={tile.title}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>
      );
  }
}

export default Destaques;