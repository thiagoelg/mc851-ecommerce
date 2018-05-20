import React, {Component} from 'react';
import CepInput from "./CepInput";
import Grid from "material-ui/es/Grid/Grid";
import Button from "material-ui/es/Button/Button";
import {getShippingOptions} from "../../clients/LogisticClient";
import Table from "material-ui/es/Table/Table";
import TableHead from "material-ui/es/Table/TableHead";
import TableRow from "material-ui/es/Table/TableRow";
import TableCell from "material-ui/es/Table/TableCell";
import TableBody from "material-ui/es/Table/TableBody";

class Freight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cep: '',

            shippingOptions: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.getShippingOptions();
        }
    }

    handleOkClick(e) {
        this.getShippingOptions();
    }

    getShippingOptions() {
        const product = this.props.product;

        let params = {
            destinyCep: this.state.cep,
            weight: product.weight,
            length: product.length,
            height: product.height,
            width: product.width
        };

        getShippingOptions(params)
            .then(response => {
                this.setState({
                    shippingOptions: response.data
                })
            })
            .catch(error => {
                //TODO treat error
            });
    }

    render() {

        return (
            <Grid container>
                <Grid item xs={4}>
                    <p>
                        Calcular Frete e Prazo:
                    </p>
                </Grid>
                <Grid item xs={4}>
                    <CepInput name="cep"
                              value={this.state.cep}
                              onChange={this.handleChange}
                              onKeyPress={this.handleKeyPress}/>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="raised" color="default" onClick={this.handleOkClick}>
                        OK
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    {this.state.shippingOptions.length > 0 &&
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo</TableCell>
                                <TableCell>Preço</TableCell>
                                <TableCell>Prazo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.shippingOptions.map(shipping => {
                                return (
                                    <TableRow key={shipping.id}>
                                        <TableCell component="th" scope="row">
                                            {shipping.type}
                                        </TableCell>
                                        <TableCell numeric>R$ {parseFloat(shipping.price/100).toFixed(2)}</TableCell>
                                        <TableCell numeric>{shipping.deliveryTime}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    }

                </Grid>
            </Grid>
        );

    }
}

export default Freight;