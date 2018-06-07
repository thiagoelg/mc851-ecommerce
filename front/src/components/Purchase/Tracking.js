import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import {getPurchaseTracking} from "../../clients/PurchaseClient";
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Divider from "@material-ui/core/es/Divider/Divider";
import Typography from "@material-ui/core/es/Typography/Typography";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import MoneyFormatter from "../Formatters/MoneyFormatter";
import moment from "moment";
import Button from "@material-ui/core/es/Button/Button";
import {withRouter} from "react-router-dom";

class Tracking extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseId: this.props.match.params.purchaseId,
            tracking: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const purchaseId = this.state.purchaseId;
        this.props.history.push(`/purchases/${purchaseId}`);
    }

    componentDidMount() {
        getPurchaseTracking(this.state.purchaseId)
            .then(response => {
                this.setState({
                    tracking: response.data
                });
            })
            .catch(error => {
                //TODO treat errors
            })
    }

    render() {
        let {purchaseId, tracking} = this.state;

        //FIXME remove this
        tracking = {
            "status": "ok",
            "purchaseId": "62345",
            "type": "PAC",
            "price": 1600,
            "originCep": "13330-000",
            "destinyCep": "13330-000",
            "weight": 1000,
            "packageType": "Caixa",
            "height": 10,
            "width": 10,
            "length": 10,
            "history": [
                {
                    "datetime": "2011-10-05T20:05:00.000Z",
                    "location": "CDC Indaiatuba",
                    "message": "Entregue"
                },
                {
                    "datetime": "2011-10-05T19:05:00.000Z",
                    "location": "CDC Indaiatuba",
                    "message": "Saiu para Entrega"
                },
                {
                    "datetime": "2011-10-05T18:10:00.000Z",
                    "location": "CDC Indaiatuba",
                    "message": "Em Transito"
                },
                {
                    "datetime": "2011-10-05T18:05:00.000Z",
                    "location": "CDC Indaiatuba",
                    "message": "Aguardando Processamento"
                },
                {
                    "datetime": "2011-10-05T18:05:00.000Z",
                    "location": "CDC Indaiatuba",
                    "message": "Recolhimento do Produto"
                }
            ]
        };

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant="headline" color="secondary">
                                        <b>Rastreio da compra {purchaseId}</b>
                                    </Typography>
                                    <p></p>
                                    <Divider/>
                                    <p></p>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subheading">
                                        <b>Status: </b>{tracking.status}
                                    </Typography>
                                    <Typography variant="body1">
                                        <br/>
                                        <b>Tipo: </b>{tracking.type}
                                        <br/>
                                        <b>Valor do Frete: </b><MoneyFormatter value={tracking.price / 100}/>
                                        <br/>
                                        <b>Prazo: </b>{tracking.deliveryTime} dias úteis
                                        <br/>
                                        <b>Código de rastreio: </b>{tracking.trackingCode}
                                        <br/>
                                        <b>CEP de destino: </b>{tracking.destinyCep}
                                        <br/>
                                        <b>Tipo do Pacote: </b>{tracking.packageType}
                                        <br/>
                                        <b>Peso do
                                            Pacote: </b>{tracking.weight < 1000 ? `${tracking.weight}g` : `${parseFloat(tracking.weight / 1000).toFixed(2)}kg`}
                                        <br/>
                                        <b>Dimensões do Pacote: </b>{tracking.height} cm x {tracking.width} cm
                                        x {tracking.length} cm
                                    </Typography>
                                    <br/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                    <br/>
                                    <Typography variant="subheading">
                                        Histórico
                                    </Typography>
                                    <br/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Table width="auto">
                                        <TableBody>
                                            {tracking.history.map(historyLine => {
                                                return (
                                                    <TableRow key={historyLine.datetime}>
                                                        <TableCell width={100}>
                                                            <Typography variant="caption">
                                                                {moment(historyLine.datetime).format("DD/MM/YYYY")}
                                                            </Typography>
                                                            <Typography variant="caption">
                                                                {historyLine.location}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {historyLine.message}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item xs={12}>
                                    <br/>
                                    <Divider/>
                                    <br/>
                                    <Typography variant="caption">
                                        Quer ver os dados desse pedido?
                                    </Typography>
                                    <br/>
                                    <Button variant="raised"
                                            color="secondary"
                                            onClick={this.handleClick}
                                            fullWidth>
                                        VER COMPRA
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }

}

export default withRouter(Tracking);