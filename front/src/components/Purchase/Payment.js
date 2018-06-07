import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";

class Payment extends Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        this.props.history.push({
            pathname: `/boleto`,
            state: {
                purchase: this.props.purchase
            }
        });
    }

    render() {
        const payment = this.props.purchase.payment;

        const isCard = payment.card && Object.keys(payment.card).length;
        const isBoleto = payment.boleto && Object.keys(payment.boleto).length;

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
                                {isCard && "Cartão de Crédito"}
                                {isBoleto && "Boleto"}
                            </Typography>

                            {isCard && (
                                <Typography variant="body1">
                                    <br/>
                                    <b>Número do Cartão: </b>{payment.card.number}
                                    <br/>
                                    <b>Bandeira: </b>{payment.card.brand}
                                    <br/>
                                    <b>Parcelas: </b>{payment.card.installments}x
                                </Typography>
                            )}

                            {isBoleto && (
                                <div>
                                    <Typography variant="body1">
                                        Você poderá visualizar ou imprimir o boleto clicando no botão abaixo. A data de
                                        vencimento é {payment.boleto.dueDate}. Após esta data, ele
                                        perderá a validade. Se preferir você pode copiar o seguinte código de barras no
                                        aplicativo do seu banco:
                                    </Typography>

                                    <br/>

                                    <Typography variant="body1" align="center">
                                        {payment.boleto.barCode}
                                    </Typography>
                                </div>
                            )}
                        </Grid>
                        {isBoleto && (
                            <Grid item xs={12}>
                                <br/>
                                <Divider/>
                                <br/>
                                <Typography variant="caption">
                                    Ainda não imprimiu seu boleto?
                                </Typography>
                                <br/>
                                <Button variant="raised"
                                        color="secondary"
                                        onClick={this.handleClick}>
                                    GERAR BOLETO
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        )
    }

}

export default withRouter(Payment);