import React, {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from '@material-ui/core/TextField';
import {validateNotEmpty} from "../../util/Validators";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import cardImage from '../Carrinho/cardImage.png'


const installmentsOptions = [
  {
    value: 'One',
    label: '1x',
  },
  {
    value: 'Two',
    label: '2x',
  },
  {
    value: 'Three',
    label: '3x',
  },
  {
    value: 'Four',
    label: '4x',
  },
  {
    value: 'Five',
    label: '5x',
  },
  {
    value: 'Six',
    label: '6x',
  },
];


class CreditCard extends Component {

     constructor(props) {
        super(props);

        this.state = {
            cardNumber: "",
            identification: "",
            monthValid: "",
            yearValid: "", 
            securityCode: "", 
            installments: "One", 

            wrongCardNumber: false,
            wrongIdentification: false,
            wrongMonthValid: false,
            wrongYearValid: false,
            wrongSecurityCode: false,

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

            this.setState({
                wrongCardNumber: validationResult.wrongCardNumber,
                wrongIdentification: validationResult.wrongIdentification,
                wrongMonthValid: validationResult.wrongMonthValid,
                wrongYearValid: validationResult.wrongYearValid,
                wrongSecurityCode: validationResult.wrongSecurityCode,
            });
         });
    }

    validateFields(names) {
        let wrongCardNumber = this.state.wrongCardNumber;
        let wrongIdentification = this.state.wrongIdentification;
        let wrongMonthValid = this.state.wrongMonthValid;
        let wrongYearValid = this.state.wrongYearValid;
        let wrongSecurityCode = this.state.wrongSecurityCode;

        if (names.indexOf("cardNumber") >= 0) {

            wrongCardNumber = !validateNotEmpty(this.state.cardNumber);

        } else if (names.indexOf("identification") >= 0) {

            wrongIdentification = !validateNotEmpty(this.state.identification);

        } else if (names.indexOf("monthValid") >= 0) {

            wrongMonthValid = !validateNotEmpty(this.state.monthValid);
        
        } else if (names.indexOf("yearValid") >= 0) {

            wrongYearValid = !validateNotEmpty(this.state.yearValid);

        } else if (names.indexOf("securityCode") >= 0) {

            wrongSecurityCode = !validateNotEmpty(this.state.securityCode);

        }

        return {
            wrongCardNumber: wrongCardNumber,
            wrongIdentification: wrongIdentification,
            wrongMonthValid: wrongMonthValid,
            wrongYearValid: wrongYearValid,
            wrongSecurityCode: wrongSecurityCode,
        };
    }

    onChange() {
        if (this.props.onChange) {

            this.props.onChange({
                target: {
                    cardNumber: this.state.cardNumber,
                    identification: this.state.identification,
                    monthValid: this.state.monthValid,
                    yearValid: this.state.yearValid,
                    securityCode: this.state.securityCode,
                    installments: this.state.installments,
                    
                    
                    valid: !this.state.wrongCardNumber && !this.state.wrongIdentification && 
                    !this.state.wrongMonthValid && !this.state.wrongYearValid && 
                    !this.state.wrongSecurityCode 
                }
            });
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            cardNumber: props.cardNumber,
            identification: props.identification,
            monthValid: props.monthValid,
            yearValid: props.yearValid,
            securityCode: props.securityCode,
        }, () => {

            if(props.edit) {
                const validationResult = this.validateFields(
                    ["cardNumber", "identification", "monthValid", "yearValid", "securityCode"]);

                this.setState({
                    wrongCardNumber: validationResult.wrongCardNumber,
                    wrongIdentification: validationResult.wrongIdentification,
                    wrongMonthValid: validationResult.wrongMonthValid,
                    wrongYearValid: validationResult.wrongYearValid,
                    wrongSecurityCode: validationResult.wrongSecurityCode,
                });
            }

        });
    }


    render() {
        return (
            <Grid container>
                <Grid item xs={8}>

                    <TextField label="Número do cartão" name="cardNumber"
                               value={this.state.cardNumber}
                               onChange={this.handleChange}
                               error={this.state.wrongCardNumber}
                               helperText={this.state.wrongCardNumber && "Informe o número do cartão"}
                               fullWidth/>
                </Grid>

                <Grid item xs={8}>
                    <br/>

                    <TextField label="Nome do titular (como está gravado no cartão)" name="identification"
                               value={this.state.identification}
                               onChange={this.handleChange}
                               error={this.state.wrongIdentification}
                               helperText={this.state.wrongIdentification && "Informe o nome do titular"}
                               fullWidth/>
                </Grid>
                <Grid item xs={2}/>

                <Grid item xs={4}>
                    <br/>

                    <TextField label="Mês de Validade" name="monthValid"
                               value={this.state.monthValid}
                               onChange={this.handleChange}
                               error={this.state.wrongMonthValid}
                               helperText={this.state.wrongMonthValid && "Informe o mês de validade"}
                               fullWidth/>
                </Grid>
                <Grid item xs={6}/>

                <Grid item xs={4}>
                    <br/>

                    <TextField label="Ano de Validade" name="yearValid"
                               value={this.state.yearValid}
                               onChange={this.handleChange}
                               error={this.state.wrongYearValid}
                               helperText={this.state.wrongYearValid && "Informe o ano de validade"}
                               fullWidth/>
                </Grid>
                <Grid item xs={6}/>

                <Grid item xs={4}>
                    <br/>

                    <TextField label="Código de seguança" name="securityCode"
                               value={this.state.securityCode}
                               onChange={this.handleChange}
                               error={this.state.wrongSecurityCode}
                               helperText={this.state.wrongSecurityCode && "Informe o código de segurança"}
                               fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <img src={cardImage} alt="Security code image" style={{marginTop:36, marginLeft:20}} width="35" height="28"/>
                </Grid>

                <Grid item xs={12}>
                    <br/>
                    <TextField
                        name="installments"
                        select
                        value={this.state.installments}
                        onChange={this.handleChange}
                        SelectProps={{
                            native: true,
                        }}
                        helperText="Selecione o número de parcelas"
                        margin="normal"
                    >
                        {installmentsOptions.map(option => (
                            <option key={option.value} value={option.value}>
                             {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                        <p></p>
                </Grid>
                <Grid item xs={12} align="right">
                    <Button variant="raised" color="secondary" >
                        Concluir pedido
                    </Button>
                </Grid> 
            </Grid>
        );
    }
}

export default CreditCard;