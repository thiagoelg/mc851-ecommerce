import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from "material-ui/es/Typography/Typography";

class Produtos extends Component {

    empty(products) {
        return products != null && products.length > 0;
    }

    render() {
        let cols = this.props.cols;
        if (cols === undefined)
            cols = 3;

        let products = this.props.products.map(product => (
            <GridListTile key={product.imageUrl + Math.random()} cols={1}
                          onClick={() => this.props.history.push("/products/" + product.id)}
                          style={{cursor: 'pointer'}}>
                <img src={product.imageUrl} alt={product.name}
                     style={{height: '100%', width: '100%', margin: '0 auto', display: 'block'}}/>
                <GridListTileBar
                    title={product.name}
                    subtitle={<span>{product.description} por {product.price}</span>}
                    actionIcon={
                        <IconButton>
                            <InfoIcon/>
                        </IconButton>
                    }
                />
            </GridListTile>
        ));


        return (
            <div className="products" justify='center'>
                {this.empty() ? (
                    <Typography variant="subheading" gutterBottom>
                        Nenhum produto foi encontrado.
                    </Typography>
                ) : (
                    <GridList cellHeight={200} cols={cols}>
                        {products}
                    </GridList>
                )}
            </div>
        );
    }

}

export default withRouter(Produtos);