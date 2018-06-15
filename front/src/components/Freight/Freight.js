import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
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
import Radio from "@material-ui/core/es/Radio/Radio";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import {validateCep} from "../../util/Validators";
import {treatError} from "../../util/ErrorUtils";

class Freight extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cep: '',
            shipping: {},
            valid: true,
            open: false,
            problemCalculating: false,

            loading: false,
            shippingOptions: [],

            firstTimeReceiveProps: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleOkClick = this.handleOkClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShippingClick = this.handleShippingClick.bind(this);
        this.selectShippingCallback = this.selectShippingCallback.bind(this);

    }

    handleShippingClick(shipping) {
        if (!this.props.enableSelection)
            return;

        const shippingOptions = this.setShippingAsSelected(shipping);

        this.setState({
                shippingOptions: shippingOptions,
                shipping: shipping
            }, () => this.invokeOnChange()
        )
    }

    setShippingAsSelected(shipping) {
        return this.state.shippingOptions.map(s => {
            let newShipping = {
                type: s.type,
                price: s.price,
                deliveryTime: s.deliveryTime,
                selected: false
            };

            if (newShipping.type === shipping.type) {
                newShipping.selected = true;
            }

            return newShipping
        });
    }

    invokeOnChange() {
        if (this.props.onChange) {
            this.props.onChange({
                name: this.props.name,
                value: this.state.shipping,
                cep: this.state.cep
            });
        }
    }

    handleChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value,
            valid: target.valid
        }, () => this.invokeOnChange());
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && !this.state.loading) {
            this.getShippingOptions();
        }
    }

    handleOkClick(e) {
        this.getShippingOptions();
    }

    componentDidMount() {
        this.selectCepAndShippingParameters(this.selectShippingCallback)
    }

    selectShippingCallback() {
        const shipping = this.props.shipping;

        if (shipping) {
            const foundOption = this.state.shippingOptions
                .filter(sh => sh.type === shipping.type &&
                    sh.price === shipping.price &&
                    sh.deliveryTime === shipping.deliveryTime)[0];

            if (foundOption) {
                const shippingOptions = this.setShippingAsSelected(shipping);

                this.setState({
                    shippingOptions: shippingOptions,
                    shipping: shipping
                });
            }
        }
    }

    selectCepAndShippingParameters(callback) {

        this.setState({
            cep: this.props.cep,
            valid: validateCep(this.props.cep),
            shippingOptions: [],
            shipping: {},
        }, () => {
            if (this.state.valid) {
                this.getShippingOptions(callback);
            }
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.cep && this.props.cep !== prevProps.cep) {
            this.selectCepAndShippingParameters(this.selectShippingCallback)
        }

        if (!prevProps.products ||
            Object.keys(prevProps.products[0]).length === 0 ||
            !prevState.shippingOptions ||
            prevState.shippingOptions.length === 0) {
            return;
        }

        const addedOrRemovedAnyProduct = this.props.products.length !== prevProps.products.length;

        const addedOrRemoveAmountOfAnyProduct = this.props.products.some(product => {
            let newProduct = prevProps.products.filter(p => p.id === product.id)[0];
            return newProduct.amount !== product.amount;
        });


        if (addedOrRemovedAnyProduct ||
            addedOrRemoveAmountOfAnyProduct) {
            this.getShippingOptions();
        }
    }

    handleClose = () => {
        this.setState({
            open: false,
            problemCalculating: false
        });
    };

    getShippingOptions(callback) {
        const products = this.props.products;

        if (!this.state.valid) {
            this.setState({
                open: true
            });
            return;
        }

        this.setState({
            loading: true,
            shippingOptions: [],
            shipping: {}
        }, () => {
            let amount = p => {
                if (!p.amount) {
                    return 1;
                }

                return p.amount;
            };

            let adder = (acc, value) => acc + value;
            let bigger = (val1, val2) => (val1 > val2) ? val1 : val2;
            const weight = products.map(p => p.weight * amount(p)).reduce(adder);
            const length = products.map(p => p.length * amount(p)).reduce(bigger);
            const height = products.map(p => p.height * amount(p)).reduce(adder);
            const width = products.map(p => p.width * amount(p)).reduce(adder);

            let params = {
                destinyCep: this.state.cep,
                weight: weight,
                length: length,
                height: height,
                width: width
            };

            getShippingOptions(params)
                .then(response => {
                    const data = response.data;
                    const shippingOptions = data.map(s => {
                        return {
                            type: s.type,
                            price: s.price,
                            deliveryTime: s.deliveryTime,
                            selected: false
                        }
                    });

                    this.setState({
                        loading: false,
                        shippingOptions: shippingOptions
                    }, () => callback && callback())
                })
                .catch(error => {
                    this.setState({
                        loading: false
                    }, () => {
                        const response = error.response;
                        switch (response && response.status) {
                            case 404:
                            case 400:
                                this.setState({
                                    open: true,
                                    problemCalculating: true
                                });
                                return;
                            default:
                        }

                        treatError(this.props, error);
                    });
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
                                {this.state.problemCalculating &&
                                <p>CEP inexistente ou não realizamos entregas nesse CEP.</p>
                                }
                            </span>
                        }
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
                {this.props.label && (
                    <Grid item xs={4} style={{paddingTop: 10}}>
                        <p>
                            {this.props.label}
                        </p>
                    </Grid>
                )}
                <Grid item xs={this.props.label ? 4 : 9}>
                    <CepInput name="cep"
                              value={this.state.cep}
                              onChange={this.handleChange}
                              onKeyPress={this.handleKeyPress}
                              disabled={this.props.disableCep}/>
                </Grid>
                <Grid item xs={3} style={{paddingTop: 10}}>
                    <Button variant="raised"
                            color="default"
                            disabled={this.state.loading || this.props.disableCep}
                            onClick={this.handleOkClick}>
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

                    {this.state.shippingOptions.length > 0 && (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {this.props.enableSelection && (
                                        <TableCell/>
                                    )}
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Preço</TableCell>
                                    <TableCell>Prazo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.shippingOptions.map(shipping => {
                                    return (
                                        <TableRow key={shipping.type} hover
                                                  onClick={e => this.handleShippingClick(shipping)}>
                                            {this.props.enableSelection && (
                                                <TableCell>
                                                    <Radio
                                                        id={shipping.id}
                                                        checked={shipping.selected}/>
                                                </TableCell>
                                            )}
                                            <TableCell component="th" scope="row">
                                                {shipping.type}
                                            </TableCell>
                                            <TableCell numeric>
                                                <MoneyFormatter value={shipping.price / 100}/>
                                            </TableCell>
                                            <TableCell numeric>
                                                {shipping.deliveryTime} dias úteis
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}

                </Grid>
            </Grid>
        );

    }
}

export default withRouter(Freight);