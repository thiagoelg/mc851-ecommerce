import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class Products extends Component {

    render() {
        let cols = this.props.cols
        if (cols === undefined)
            cols = 3

        return (
            <div className="destaques" justify='center'>
                <GridList cellHeight={200} cols={cols}>
                    {this.props.products.map(tile => (
                        <GridListTile key={tile.imageUrl + Math.random()} cols={1}
                                      onClick={() => this.props.history.push("/products/" + tile.id)}
                                      style={{cursor: 'pointer'}}>
                            <img src={tile.imageUrl} alt={tile.name}
                                 style={{height: '100%', width: '100%', margin: '0 auto', display: 'block'}}/>
                            <GridListTileBar
                                title={tile.name}
                                subtitle={<span>{tile.description} por {tile.price}</span>}
                                actionIcon={
                                    <IconButton>
                                        <InfoIcon/>
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

export default withRouter(Products);