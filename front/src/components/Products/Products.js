import React, {Component} from 'react';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';

class Products extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        let cols = this.props.cols
        if(cols === undefined)
            cols = 4

        return (
            <div className="destaques" justify='center'>
                <GridList cellHeight={200} cols={cols}>
                    {this.props.products.map(tile => (
                        <GridListTile key={tile.imageUrl} cols={1}>
                            <a href={"/products/" + tile.id}>
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
                            </a>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }

}

export default Products;