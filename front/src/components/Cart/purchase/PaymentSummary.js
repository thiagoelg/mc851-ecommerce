import React, {Component} from "react"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";

class PaymentSummary extends Component {

    render() {
        const payment = this.props.payment;

        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Forma de pagamento</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
                            <br/>
                            <Typography variant="subheading">
                                {payment.isCreditCard && "Cartão de Crédito"}
                                {payment.isBoleto && "Boleto"}
                            </Typography>

                            {payment.isCreditCard && (
                                <Typography variant="body1">
                                    <br/>
                                    <b>Número do Cartão: </b>{payment.card.cardNumber}
                                    <br/>
                                    <b>Data de validade: </b>{payment.card.validThru}
                                    <br/>
                                    <b>Bandeira: </b>{payment.card.brand}
                                    <br/>
                                    <b>Parcelas: </b>{payment.card.installments}x
                                </Typography>
                            )}

                            {payment.isBoleto && (
                                <Typography variant="body1">
                                    Você poderá visualizar ou imprimir após a finalização do pedido. A data de
                                    vencimento é de 2 dias corridos após a conclusão do pedido. Após esta data, ele
                                    perderá a validade.
                                </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <Divider/>
                            <br/>
                            <Typography variant="caption">
                                Quer alterar a forma de pagamento?
                            </Typography>
                            <br/>
                            <Button variant="raised"
                                    color="secondary"
                                    onClick={this.props.onClick}>
                                Alterar Forma de Pagamento
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

}

export default PaymentSummary;