import React, {Component} from "react"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import ExpansionPanel from "@material-ui/core/es/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/es/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/es/ExpansionPanelDetails/ExpansionPanelDetails";
import CreditCard from "./CreditCard";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Boleto from "./Boleto";

class PaymentMethod extends Component {

    constructor(props) {
        super(props);

        this.state = {
            creditCard: false,
            boleto: false,

            card: null,

            validCard: false
        };

        this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);
    }

    componentWillMount() {

        const payment = this.props.payment;

        if(payment) {
            this.setState({
                creditCard: payment.isCreditCard,
                boleto: payment.isBoleto,
                card: payment.card
            }, () => console.log("card: ", this.state.card));
        }

    }

    handleCreditCardChange(event) {

        const card = {
            cardNumber: event.cardNumber,
            identification: event.identification,
            validThru: event.validThru,
            securityCode: event.securityCode,
            brand: event.brand,
            installments: event.installments,
        };

        this.setState({
            card: card,
            validCard: event.valid
        }, () => this.invokeOnChange());

    }

    handlePanelChange(panel, expanded) {
        switch (panel) {
            case "creditCard": {
                this.setState({
                    creditCard: expanded,
                    boleto: expanded ? false : this.state.boleto
                }, () => this.invokeOnChange());
                break;
            }
            case "boleto": {
                this.setState({
                    boleto: expanded,
                    creditCard: expanded ? false : this.state.creditCard
                }, () => this.invokeOnChange());
                break;
            }
            default:
        }
    }

    invokeOnChange() {
        if(this.props.onChange) {
            this.props.onChange({
                isCreditCard: this.state.creditCard,
                isBoleto: this.state.boleto,
                card: this.state.card,
                valid: (this.state.creditCard && this.state.validCard) || this.state.boleto
            });
        }
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <p></p>
                    <Typography variant="headline" color="secondary">
                        <b>Formas de pagamento</b>
                    </Typography>
                    <p></p>
                    <ExpansionPanel expanded={this.state.creditCard}
                                    onChange={(_, expanded) => this.handlePanelChange("creditCard", expanded)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="subheading">
                                Cartão de crédito
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <CreditCard
                                price={this.props.price}
                                card={this.state.card}
                                onChange={this.handleCreditCardChange}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.boleto}
                                    onChange={(_, expanded) => this.handlePanelChange("boleto", expanded)}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography variant="subheading">
                                Boleto bancário
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Boleto price={this.props.price}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </CardContent>
            </Card>
        );
    }

}

export default PaymentMethod;