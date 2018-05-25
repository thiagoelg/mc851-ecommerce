import React, {Component} from "react"
import {validateCep, validateNotEmpty} from "../../util/Validators";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import States from "./States";
import Cities from "./Cities";
import AddressClient from "../../clients/AddressClient"

class AddressForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            identification: props.identification,
            cep: props.cep,
            street: props.street,
            number: props.number,
            neighborhood: props.neighborhood,
            city: props.city,
            state: props.state,
            compliment: props.compliment,

            //TODO first validation
            wrongIdentification: false,
            wrongCep: false,
            wrongStreet: false,
            wrongNumber: false,
            wrongNeighborhood: false,
            wrongCity: false,
            wrongState: false,
            wrongCompliment: false,

            states: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        }, () => {

            if (name === "identification") {

                this.setState((prevState, props) => {
                    return {
                        wrongIdentification: !validateNotEmpty(prevState.identification)
                    }
                }, () => this.onChange(target));

            } else if (name === "cep") {

                this.fillAddressThroughCep(target);

            } else if (name === "street") {

                this.setState((prevState, props) => {
                    return {
                        wrongStreet: !validateNotEmpty(prevState.street)
                    }
                }, () => this.onChange());

            } else if (name === "number") {

                this.setState((prevState, props) => {
                    return {
                        wrongNumber: !validateNotEmpty(prevState.number)
                    }
                }, () => this.onChange());

            } else if (name === "neighborhood") {

                this.setState((prevState, props) => {
                    return {
                        wrongNeighborhood: !validateNotEmpty(prevState.neighborhood)
                    }
                }, () => this.onChange());

            } else if (name === "city") {

                this.setState((prevState, props) => {
                    return {
                        wrongCity: !validateNotEmpty(prevState.city)
                    }
                }, () => this.onChange());

            } else if (name === "state") {

                this.setState((prevState, props) => {
                    return {
                        wrongState: !validateNotEmpty(prevState.state)
                    }
                }, () => this.onChange());

            } else if (name === "compliment") {

                this.setState((prevState, props) => {
                    return {
                        wrongCompliment: !validateNotEmpty(prevState.compliment)
                    }
                }, () => this.onChange());

            }

        });
    }

    fillAddressThroughCep(target) {
        let valid = validateCep(this.state.cep);

        if (valid) {

            AddressClient.getCep(this.state.cep)
                .then(response => {
                    const data = response.data;

                    this.setState({
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        state: data.uf,
                        wrongCep: !valid
                    }, () => {
                        let cityStateChange = () => {
                            this.setState({
                                city: data.city
                            }, () => this.onChange());
                        };
                        setTimeout(() => cityStateChange(), 2000);
                    });

                })
                .catch(error => {
                    //TODO treat error
                });

        } else {

            this.setState({
                wrongCep: !valid
            }, () => this.onChange());

        }
    }

    onChange() {
        if (this.props.onChange) {

            this.props.onChange({
                target: {
                    identification: this.state.identification,
                    cep: this.state.cep,
                    street: this.state.street,
                    number: this.state.number,
                    neighborhood: this.state.neighborhood,
                    city: this.state.city,
                    state: this.state.state,
                    compliment: this.state.compliment,
                    valid: !this.state.wrongIdentification && !this.state.wrongStreet &&
                    !this.state.wrongNumber && !this.state.wrongCep && !this.state.wrongCity &&
                    !this.state.wrongState && !this.state.wrongCompliment && !this.state.wrongNeighborhood
                }
            });
        }
    }

    componentWillReceiveProps(props) {
        //TODO validate
        this.setState({
            identification: props.identification,
            cep: props.cep,
            street: props.street,
            number: props.number,
            neighborhood: props.neighborhood,
            city: props.city,
            state: props.state,
            compliment: props.compliment,
        });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <br/>

                    <TextField label="Identificação" name="identification"
                               value={this.state.identification}
                               onChange={this.handleChange}
                               error={this.state.wrongIdentification}
                               helperText={this.state.wrongIdentification && "Informe a identificação."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="CEP"
                               name="cep"
                               value={this.state.cep}
                               onChange={this.handleChange}
                               error={this.state.wrongCep}
                               helperText={this.state.wrongCep && "Informe um CEP válido."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="Logradouro"
                               name="street"
                               value={this.state.street}
                               onChange={this.handleChange}
                               error={this.state.wrongStreet}
                               helperText={this.state.wrongStreet && "Informe um logradouro."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="Número"
                               name="number"
                               value={this.state.number}
                               onChange={this.handleChange}
                               error={this.state.wrongNumber}
                               helperText={this.state.wrongNumber && "Informe um número."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="Bairro"
                               name="neighborhood"
                               value={this.state.neighborhood}
                               onChange={this.handleChange}
                               error={this.state.wrongNeighborhood}
                               helperText={this.state.wrongNeighborhood && "Informe um bairro."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <TextField label="Complemento"
                               name="compliment"
                               value={this.state.compliment}
                               onChange={this.handleChange}
                               error={this.state.wrongCompliment}
                               helperText={this.state.wrongCompliment && "Informe um complemento."}
                               fullWidth/>
                </Grid>

                <Grid item xs={12}>
                    <br/>
                    <br/>

                    <States name="state"
                            value={this.state.state}
                            onChange={this.handleChange}
                            error={this.state.wrongState}
                            helperText={this.state.wrongState && "Informe um estado brasileito."}/>
                </Grid>

                <Grid item xs={12}>
                    <br/>

                    <Cities uf={this.state.state}
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                            error={this.state.wrongCity}
                            helperText={this.state.wrongCity && "Informe ums cidade brasileira."}/>
                </Grid>

            </Grid>
        );

    }

}

export default AddressForm;