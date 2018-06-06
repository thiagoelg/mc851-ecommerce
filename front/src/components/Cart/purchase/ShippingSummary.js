import React, {Component} from "react"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import MoneyFormatter from "../../Formatters/MoneyFormatter";

class ShippingSummary extends Component {

    render() {
        const address = this.props.address;
        const shipping = this.props.shipping;

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
                                <b>Valor: </b><MoneyFormatter value={shipping.price}/>
                                <br/>
                                <b>Prazo: </b>{shipping.deliveryTime} dias úteis
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <Divider/>
                            <br/>
                            <Typography variant="caption">
                                Quer receber seus produtos em outro endereço? Ou alterar a forma de frete?
                            </Typography>
                            <br/>
                            <Button variant="raised"
                                    color="secondary"
                                    onClick={this.props.onClick}>
                                Alterar Forma de Entrega
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

}

export default ShippingSummary;