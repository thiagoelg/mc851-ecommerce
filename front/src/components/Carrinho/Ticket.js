import React, {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Ticket extends Component {
    
     render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="Title"> 
                        <b>R$ 210,00</b>
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
                <Grid item xs={12} align="right">
                    <Button variant="raised" color="secondary">
                        Concluir pedido
                    </Button>
                </Grid> 
            </Grid>
        );
    }
}

export default Ticket;