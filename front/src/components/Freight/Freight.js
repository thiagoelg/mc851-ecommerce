import React, {Component} from 'react';
import CepInput from "./CepInput";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import {getShippingOptions} from "../../clients/LogisticClient";
import Table from "@material-ui/core/es/Table";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import Fade from "@material-ui/core/es/Fade/Fade";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";

class Freight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cep: '',
            valid: false,
            open: false,

            loading: false,
            shippingOptions: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value,
            valid: target.valid
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

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    getShippingOptions() {
        if(!this.state.valid) {
            this.setState({
                open: true
            });
            return;
        }

        this.setState({
            loading: true,
            shippingOptions: []
        }, () => {
            const products = this.props.products;

            let adder = (acc, value) => acc + value;
            const weight = products.map(p => p.weight).reduce(adder);
            const length = products.map(p => p.length).reduce(adder);
            const height = products.map(p => p.height).reduce(adder);
            const width = products.map(p => p.width).reduce(adder);

            let params = {
                destinyCep: this.state.cep,
                weight: weight,
                length: length,
                height: height,
                width: width
            };

            getShippingOptions(params)
                .then(response => {
                    this.setState({
                        loading: false,
                        shippingOptions: response.data
                    })
                })
                .catch(error => {
                    //TODO treat error
                });
        });

    }

    render() {

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={5000}
                        message={
                            <span id="message-id" color="error">
                                {(!this.state.valid) &&
                                <p>Preencha o CEP corretamente.<br/></p>
                                }
                                </span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <Close/>
                            </IconButton>,
                        ]}
                    />
                </Grid>
                <Grid item xs={4} style={{paddingTop: 10}}>
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
                <Grid item xs={3} style={{paddingTop: 10}}>
                    <Button variant="raised" color="default" onClick={this.handleOkClick}>
                        OK
                    </Button>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                    {this.state.loading && (
                        <Fade
                            in={this.state.loading}
                            style={{
                                transitionDelay: this.state.loading ? '800ms' : '0ms'
                            }}
                            unmountOnExit
                        >
                            <CircularProgress/>
                        </Fade>
                    )}

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
                                        <TableCell numeric>R$ {parseFloat(shipping.price / 100).toFixed(2)}</TableCell>
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