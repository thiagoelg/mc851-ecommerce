import React, {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from '@material-ui/core/TextField';
import {validateBrand, validateNotEmpty} from "../../../util/Validators";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import Select from "@material-ui/core/es/Select/Select";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";
import CreditCardNumberInput from "../../Inputs/CreditCardNumberInput";
import ReactCreditCard from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import ValidThruInput from "../../Inputs/ValidThruInput";
import {getCreditCardInstallments} from "../../../clients/PaymentClient";
import MoneyFormatter from "../../Formatters/MoneyFormatter";

class CreditCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            installmentsOptions: [],

            cardNumber: "",
            identification: "",
            validThru: "",
            securityCode: "",
            installments: "",
            brand: "",

            wrongCardNumber: true,
            wrongIdentification: true,
            wrongValidThru: true,
            wrongSecurityCode: true,
            wrongInstallments: true,

            touchedIdentification: false,
            touchedSecurityCode: false,
            touchedInstallments: false,

            focus: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleCreditCardCallback = this.handleCreditCardCallback.bind(this);
    }

    handleFocus(name) {
        this.setState({
            focus: name
        })
    }

    componentWillMount() {
        const card = this.props.card;

        if (card) {
            this.setState({
                    cardNumber: card.cardNumber,
                    identification: card.identification,
                    validThru: card.validThru,
                    securityCode: card.securityCode,
                    brand: card.brand
                }, () => {
                    if (validateBrand(this.state.brand)) {
                        this.getInstallmentsOptions(card.installments)
                    }
                }
            );
        }
    }

    handleCreditCardCallback(type, valid) {

        const prevBrand = this.state.brand;

        this.setState({
            brand: type.issuer,
            wrongCardNumber: !valid
        }, () => {
            if (validateBrand(this.state.brand) && prevBrand !== this.state.brand) {
                this.getInstallmentsOptions();
            }
        });
    }

    getInstallmentsOptions(installments) {

        const requestInstallments = {
            value: this.props.price,
            cardFlag: this.state.brand.toUpperCase()
        };

        getCreditCardInstallments(requestInstallments)
            .then(response => {
                const data = response.data.installments;

                const installmentsOptions = Object.keys(data).map((key) => {
                    return {
                        installments: key,
                        value: data[key]
                    }
                });

                this.setState({
                    installments: installments || '',
                    wrongInstallments: true,
                    installmentsOptions: installmentsOptions
                });
            })
            .catch(error => {
                //TODO treat error
            });

    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
        const wrongFieldName = 'wrong' + nameCapitalized;
        const touchedFieldName = 'touched' + nameCapitalized;

        this.setState({
            [name]: target.value,
            [wrongFieldName]: target.valid || this.state[wrongFieldName],
            [touchedFieldName]: true
        }, () => {

            const validationResult = this.validateFields([name]);

            this.setState({
                [wrongFieldName]: validationResult[wrongFieldName],
            }, () => this.onChange());

        });
    }

    validateFields(names) {
        let wrongIdentification = this.state.wrongIdentification;
        let wrongSecurityCode = this.state.wrongSecurityCode;
        let wrongInstallments = this.state.wrongInstallments;

        if (names.indexOf("identification") >= 0) {

            wrongIdentification = !validateNotEmpty(this.state.identification);

        } else if (names.indexOf("securityCode") >= 0) {

            wrongSecurityCode = !validateNotEmpty(this.state.securityCode);

        } else if (names.indexOf("installments") >= 0) {

            wrongInstallments = !validateNotEmpty(this.state.installments);

        }

        return {
            wrongIdentification: wrongIdentification,
            wrongSecurityCode: wrongSecurityCode,
            wrongInstallments: wrongInstallments
        };
    }

    onChange() {
        if (this.props.onChange) {

            this.props.onChange({
                cardNumber: this.state.cardNumber,
                identification: this.state.identification,
                validThru: this.state.validThru,
                securityCode: this.state.securityCode,
                brand: this.state.brand,
                installments: this.state.installments,


                valid: !this.state.wrongCardNumber && !this.state.wrongIdentification &&
                !this.state.wrongValidThru && !this.state.wrongSecurityCode && !this.state.wrongInstallments
            });
        }
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <ReactCreditCard
                        number={this.state.cardNumber}
                        name={this.state.identification}
                        expiry={this.state.validThru}
                        cvc={this.state.securityCode}
                        focused={this.state.focus}
                        placeholders={{
                            name: "SEU NOME AQUI"
                        }}
                        callback={this.handleCreditCardCallback}
                    />
                </Grid>
                <Grid item xs={11}>
                    <br/>

                    <CreditCardNumberInput label="Número do cartão" name="cardNumber"
                                           value={this.state.cardNumber}
                                           onChange={this.handleChange}
                                           onFocus={() => this.handleFocus('number')}
                                           error={this.state.wrongCardNumber}
                                           helperText={this.state.wrongCardNumber && "Informe o número do cartão"}
                                           fullWidth/>
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={11}>
                    <br/>

                    <TextField label="Nome do titular (como está gravado no cartão)" name="identification"
                               value={this.state.identification}
                               onChange={this.handleChange}
                               onFocus={() => this.handleFocus('name')}
                               error={this.state.wrongIdentification && this.state.touchedIdentification}
                               helperText={this.state.wrongIdentification && this.state.touchedIdentification && "Informe o nome do titular"}
                               fullWidth/>
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={5}>
                    <br/>

                    <ValidThruInput label="Data de Validade" name="validThru"
                                    value={this.state.validThru}
                                    onChange={this.handleChange}
                                    onFocus={() => this.handleFocus('expiry')}
                                    helperText={this.state.wrongValidThru && "Informe o mês de validade"}
                                    fullWidth/>
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={5}>
                    <br/>

                    <TextField label="Código de segurança" name="securityCode"
                               value={this.state.securityCode}
                               onChange={this.handleChange}
                               onFocus={() => this.handleFocus('cvc')}
                               error={this.state.wrongSecurityCode && this.state.touchedSecurityCode}
                               helperText={this.state.wrongSecurityCode && this.state.touchedSecurityCode && "Informe o código de segurança"}
                               fullWidth/>
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={4} style={{paddingLeft: 20}}/>

                <Grid item xs={11}>
                    <br/>

                    <FormControl fullWidth
                                 error={this.state.wrongInstallments && this.state.touchedInstallments}
                                 disabled={!this.state.installmentsOptions || !this.state.installmentsOptions.length}>
                        <InputLabel htmlFor="installments">Parcelas</InputLabel>
                        <Select
                            value={this.state.installments}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'installments',
                                id: 'installments',
                            }}
                        >
                            {this.state.installmentsOptions.map(option => (
                                <MenuItem key={option.installments} value={option.installments}>
                                    {option.installments}x - <MoneyFormatter value={option.value}/>
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            Selecione o número de parcelas
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={1}/>

                <Grid item xs={12}>
                    <p></p>
                </Grid>
            </Grid>
        );
    }
}

export default CreditCard;