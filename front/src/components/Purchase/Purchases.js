import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import {getPurchases, PURCHASE_STATUS_LABEL} from "../../clients/PurchaseClient";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import Divider from "@material-ui/core/es/Divider/Divider";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";

class Purchases extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchases: []
        }
    }

    componentDidMount() {
        getPurchases()
            .then(response => {
                this.setState({
                    purchases: response.data
                });
            })
            .catch(error => {
                //TODO treat errors
            })
    }

    render() {
        let {purchases} = this.state;

        //FIXME remove this
        const purchase = {
            "id": 15244,
            "status": 1,
            "createdAt": "05/08/2018",
            "shipping": {
                "trackingCode": "RN625161646435464BR",
                "deliveryTime": 4,
                "price": "77286",
                "type": "PAC",
                "address": {
                    "identification": "Minha Casa",
                    "cep": "13070717",
                    "street": "Rua Luis Gama",
                    "number": "737",
                    "neighborhood": "Bonfim",
                    "city": "Campinas",
                    "state": "SP",
                    "complement": "Casa dos fundos"
                }
            },
            "payment": {
                "price": 500000,
                "boleto": {
                    "dueDate": "25/08/2018",
                    "barCode": "42297115040000218611260804028227",
                    "documentRep": "oxra9jn8lfk"
                },
                "card": {
                    "number": "444444xxxxx4444",
                    "brand": "MASTER_CARD",
                    "installments": 10
                }
            },
            "products": [
                {
                    "id": "284dc734-6b2e-460e-bca6-facb274ec970",
                    "name": "GELADEIRA KOMBI",
                    "description": "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
                    "price": 5000,
                    "brand": "geladeireira",
                    "tags": [
                        "geladeireira",
                        "geladeira",
                        "kombi"
                    ],
                    "categoryId": "157ac3ce-a792-43de-aada-e744effdbe53",
                    "imageUrl": "/imgs/eletrodomesticos/geladeira_kombi.jpg",
                    "weight": 44000,
                    "length": 61,
                    "width": 60,
                    "height": 161,
                    "amount": 1
                }
            ]
        };

        purchases = [1, 2, 3].map(i => purchase);

        return (
            <Card>
                <CardContent>
                    <Grid container style={{marginBottom: 20}}>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Minhas Compras</b>
                            </Typography>
                            <br/>
                        </Grid>
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
                                                                    {purchase.payment.card.brand} {purchase.payment.card.installments}x
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
                                                                Realizada em {purchase.createdAt}
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
                    </Grid>
                </CardContent>
            </Card>
        )
    }

}

export default Purchases;