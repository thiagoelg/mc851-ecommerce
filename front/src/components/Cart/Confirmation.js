import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button";
import Grid from "@material-ui/core/es/Grid/Grid";
import Link from "../Link/Link";
import check from "../Cart/checked.png";
import Divider from '@material-ui/core/Divider';
import {PURCHASE_STATUS} from '../../clients/PurchaseClient'
import PurchaseStatusStepper from "../Purchase/PurchaseStatusStepper";
import UserProfile from "../../state/UserProfile";

class Confirmation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseId: undefined
        }
    }

    componentWillMount() {
        if(!UserProfile.isLogged()) {
            this.props.history.push("/signIn");
            return;
        }

        let locationState = this.props.location.state;
        if(locationState) {
            this.setState({
                purchaseId: locationState.purchaseId
            });
        }
    }

    render() {

        const purchaseId = this.state.purchaseId;

        return (
            <Grid container height="auto">
                <Grid item xs={0} style={{padding: 20}}>
                    <img src={check} alt="check" width="50" height="50"/>
                </Grid>
                <Grid item xs={8} style={{paddingTop: 22}}>
                    <Typography variant="display1"> 
                         Recebemos seu pedido: {purchaseId}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{padding: 20}}>
                    <Typography variant="body1"> 
                        Acompanhe o status do seu pedido abaixo ou acesse "Minhas Compras"
                        <p>Para compras em boleto, acesse "Minhas Compras" e imprima seu boleto</p>
                    </Typography>
                    <p></p>
                    <Divider/>
                    <p></p>
                    <Typography variant="title">
                        Status do Pedido
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <PurchaseStatusStepper status={PURCHASE_STATUS.ORDER_REQUESTED}/>
                </Grid>
                <Grid item xs={12}>
                    <p></p>
                </Grid>
                <Grid item xs={12}>
                    <p></p>
                    <p></p>
                    <Grid container justify="flex-end">
                        <Link to={`/purchases/${purchaseId}`}>
                            <Button color="primary" variant="raised">
                                Detalhes da compra
                            </Button>
                        </Link>
                    </Grid>
                    <p></p>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(Confirmation);