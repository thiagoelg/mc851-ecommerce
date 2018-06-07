import React, {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from '@material-ui/core/Typography';
import MoneyFormatter from "../../Formatters/MoneyFormatter";

class Boleto extends Component {

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="title">
                        <b><MoneyFormatter value={this.props.price}/></b>
                    </Typography>
                </Grid>
                <p></p>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        Você poderá visualizar ou imprimir após a finalização do pedido. A data de vencimento é de 2 dias corridos após a conclusão do pedido. Após esta data, ele perderá a validade.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <p></p>
                </Grid>
            </Grid>
        );
    }
}

export default Boleto;