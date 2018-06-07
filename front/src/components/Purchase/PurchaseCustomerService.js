import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Button from "@material-ui/core/es/Button/Button";
import Grid from "@material-ui/core/es/Grid/Grid";

class PurchaseCustomerService extends Component {

    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(event) {
        const purchase = this.props.purchase;

        this.props.history.push(`/customerservice/purchase/${purchase.id}`);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Central de Atendimentos</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <br/>
                            <Divider/>
                            <br/>
                            <Typography variant="caption">
                                Teve algum problema com seu pedido? Alguma dúvida? Está demorando para chegar?
                                Entre em contato com nossa central de atendimentos.
                            </Typography>
                            <br/>
                            <Button variant="raised"
                                    color="secondary"
                                    onClick={this.handleClick}
                                    fullWidth>
                                CENTRAL DE ATENDIMENTOS
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

}

export default withRouter(PurchaseCustomerService);