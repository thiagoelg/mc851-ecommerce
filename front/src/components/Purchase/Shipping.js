import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import {PURCHASE_STATUS} from "../../clients/PurchaseClient";

class Shipping extends Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        const purchase = this.props.purchase;

        this.props.history.push(`/purchases/${purchase.id}/tracking`);
    }

    render() {
        const purchase = this.props.purchase;
        const shipping = purchase.shipping;
        const address = shipping.address;

        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Forma de entrega</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <Typography variant="subheading">
                                <b>Endereço de entrega</b>
                            </Typography>
                            <Divider/>
                            <br/>
                            <Typography variant="subheading">
                                {address.identification}
                            </Typography>
                            <Typography variant="body1">
                                <br/>
                                {address.street}{address.street && ", "}{address.number}
                                <br/>
                                {address.neighborhood}{address.neighborhood && ", "}
                                <br/>
                                {address.city}{address.city && ", "}
                                {address.state}
                                <br/>
                                {address.cep}
                                <br/>
                                {address.complement}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <Typography variant="subheading">
                                <b>Frete</b>
                            </Typography>
                            <Divider/>
                            <br/>
                            <Typography variant="subheading">
                                {shipping.type}
                            </Typography>
                            <Typography variant="body1">
                                <br/>
                                <b>Valor: </b><MoneyFormatter value={shipping.price / 100}/>
                                <br/>
                                <b>Código de rastreio: </b>{shipping.trackingCode}
                            </Typography>
                        </Grid>
                        {purchase.status >= PURCHASE_STATUS.PAYMENT_APPROVED ? (
                            <Grid item xs={12}>
                                <br/>
                                <Divider/>
                                <br/>
                                <Typography variant="caption">
                                    Quer acompanhar a entrega do seu pedido?
                                </Typography>
                                <br/>
                                <Button variant="raised"
                                        color="secondary"
                                        onClick={this.handleClick}
                                        fullWidth>
                                    Rastreio
                                </Button>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                <br/>
                                <Divider/>
                                <br/>
                                <Typography variant="caption">
                                    Assim que seu pagamento for aprovado, nós separaremos os seus produtos do estoque e você poderá acompanhar o rastreio da sua entrega.
                                </Typography>
                                <br/>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        );
    }

}

export default withRouter(Shipping);