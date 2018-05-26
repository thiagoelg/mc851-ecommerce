import React, {Component} from "react"
import {validateCep, validateNotEmpty} from "../../util/Validators";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import States from "./States";
import Cities from "./Cities";
import AddressClient from "../../clients/AddressClient"
import CepInput from "../Freight/CepInput";

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
            complement: props.complement,

            wrongIdentification: false,
            wrongCep: false,
            wrongStreet: false,
            wrongNumber: false,
            wrongNeighborhood: false,
            wrongCity: false,
            wrongState: false,
            wrongComplement: false,

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

            const validationResult = this.validateFields([name]);
            const wrongFieldName = 'wrong' + name.charAt(0).toUpperCase() + name.slice(1);

            this.setState({
                [wrongFieldName]: validationResult[wrongFieldName],
            }, () => {
                if (name === "cep" && !this.state.wrongCep) {
                    this.setAddressByCep();
                } else {
                    this.onChange()
                }
            });

        });
    }

    validateFields(names) {
        let wrongIdentification = this.state.wrongIdentification;
        let wrongStreet = this.state.wrongStreet;
        let wrongNumber = this.state.wrongNumber;
        let wrongNeighborhood = this.state.wrongNeighborhood;
        let wrongCity = this.state.wrongCity;
        let wrongState = this.state.wrongState;
        let wrongComplement = this.state.wrongComplement;
        let wrongCep = this.state.wrongCep;

        if (names.indexOf("identification") >= 0) {

            wrongIdentification = !validateNotEmpty(this.state.identification);

        } else if (names.indexOf("cep") >= 0) {

            wrongCep = !validateCep(this.state.cep);

        } else if (names.indexOf("street") >= 0) {

            wrongStreet = !validateNotEmpty(this.state.street);

        } else if (names.indexOf("number") >= 0) {

            wrongNumber = !validateNotEmpty(this.state.number);

        } else if (names.indexOf("neighborhood") >= 0) {

            wrongNeighborhood = !validateNotEmpty(this.state.neighborhood);

        } else if (names.indexOf("city") >= 0) {

            wrongCity = !validateNotEmpty(this.state.city);

        } else if (names.indexOf("state") >= 0) {

            wrongState = !validateNotEmpty(this.state.state);

        } else if (names.indexOf("complement") >= 0) {

            wrongComplement = false;

        }

        return {
            wrongIdentification: wrongIdentification,
            wrongCep: wrongCep,
            wrongStreet: wrongStreet,
            wrongNumber: wrongNumber,
            wrongNeighborhood: wrongNeighborhood,
            wrongCity: wrongCity,
            wrongState: wrongState,
            wrongComplement: wrongComplement,
        };

    }

    setAddressByCep() {

        AddressClient.getCep(this.state.cep)
            .then(response => {
                const data = response.data;

                this.setState({
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.cidade,
                    state: data.uf,
                }, () => {
                    const validationResult = this.validateFields(["street", "neighborhood", "city", "state", "cep"]);

                    this.setState({
                        wrongCep: validationResult.wrongCep,
                        wrongStreet: validationResult.wrongStreet,
                        wrongNeighborhood: validationResult.wrongNeighborhood,
                        wrongCity: validationResult.wrongCity,
                        wrongState: validationResult.wrongState
                    }, () => this.onChange());
                });

            })
            .catch(error => {
                //TODO treat error
            });
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
                    complement: this.state.complement,
                    valid: !this.state.wrongIdentification && !this.state.wrongStreet &&
                    !this.state.wrongNumber && !this.state.wrongCep && !this.state.wrongCity &&
                    !this.state.wrongState && !this.state.wrongComplement && !this.state.wrongNeighborhood
                }
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            identification: props.identification,
            cep: props.cep,
            street: props.street,
            number: props.number,
            neighborhood: props.neighborhood,
            city: props.city,
            state: props.state,
            complement: props.complement,
        }, () => {

            if(props.edit) {
                const validationResult = this.validateFields(
                    ["identification", "cep", "street", "number", "neighborhood", "city", "state", "complement"]);

                this.setState({
                    wrongIdentification: validationResult.wrongIdentification,
                    wrongCep: validationResult.wrongCep,
                    wrongStreet: validationResult.wrongStreet,
                    wrongNumber: validationResult.wrongNumber,
                    wrongNeighborhood: validationResult.wrongNeighborhood,
                    wrongCity: validationResult.wrongCity,
                    wrongState: validationResult.wrongState,
                    wrongComplement: validationResult.wrongComplement,
                });
            }

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

                    <CepInput name="cep"
                              value={this.state.cep}
                              onChange={this.handleChange}
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
                               name="complement"
                               value={this.state.complement}
                               onChange={this.handleChange}
                               error={this.state.wrongComplement}
                               helperText={this.state.wrongComplement && "Informe um complemento."}
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