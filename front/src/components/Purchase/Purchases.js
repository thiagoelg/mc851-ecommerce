import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import {getPurchases, PURCHASE_STATUS_LABEL} from "../../clients/PurchaseClient";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import Divider from "@material-ui/core/es/Divider/Divider";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import moment from "moment";
import {treatError} from "../../util/ErrorUtils";
import Fade from "@material-ui/core/es/Fade/Fade";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class Purchases extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchases: [],
            loading: true
        }
    }

    componentDidMount() {
        getPurchases()
            .then(response => {
                this.setState({
                    purchases: response.data,
                    loading: false
                });
            })
            .catch(error => {
                treatError(this.props, error);
            })
    }

    render() {
        let {purchases} = this.state;

        return (
            <Card style={{marginBottom: 20}}>
                <CardContent>
                    <Grid container style={{marginBottom: 20}}>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Minhas Compras</b>
                            </Typography>
                            <br/>
                        </Grid>
                        {this.state.loading ? (
                            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                                <Fade
                                    in={this.state.loading}
                                    style={{
                                        transitionDelay: this.state.loading ? '800ms' : '0ms'
                                    }}
                                    unmountOnExit
                                >
                                    <CircularProgress/>
                                </Fade>
                            </Grid>
                        ) : (
                            <Grid item xs={12}>
                                {purchases && purchases.length ? (
                                    <List>
                                        <Divider/>
                                        {purchases.map(purchase => {
                                            return (
                                                <div>
                                                    <ListItem button
                                                              key={purchase.id}
                                                              onClick={e => this.props.history.push(`/purchases/${purchase.id}`)}>
                                                        <Grid container>
                                                            <Grid item xs={4}>
                                                                <Typography variant="subheading">
                                                                    <b>Identificador: </b>{purchase.id}
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    Valor total: <MoneyFormatter
                                                                    value={purchase.payment.price}/>
                                                                </Typography>
                                                                {purchase.payment.card && (
                                                                    <Typography variant="caption">
                                                                        {purchase.payment.card.brand} {purchase.payment.card.instalments}x
                                                                    </Typography>
                                                                )}
                                                                {purchase.payment.boleto && (
                                                                    <Typography variant="caption">
                                                                        Boleto
                                                                    </Typography>
                                                                )}

                                                            </Grid>
                                                            <Grid item xs={6} style={{justifyContent: "center"}}>
                                                                <Typography variant="subheading">
                                                                    <b>{PURCHASE_STATUS_LABEL[purchase.status]}</b>
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    Realizada
                                                                    em {moment(purchase.createdAt, "DD-MM-YYYY").format("DD/MM/YYYY")}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                    <Divider/>
                                                </div>
                                            )
                                        })}
                                    </List>
                                ) : (
                                    <Typography variant="subheading" align="center">
                                        Você não fez nenhuma compra no nosso site ainda.
                                    </Typography>
                                )}
                            </Grid>
                        )}

                    </Grid>
                </CardContent>
            </Card>
        )
    }

}

export default withRouter(Purchases);