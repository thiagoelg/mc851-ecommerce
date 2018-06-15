import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Link from "react-router-dom/es/Link";

class InternalError extends Component {

    render() {
        const linkStyle = {
            color: "blue",
            textDecoration: "underline"
        };

        const gridStyle = {
            display: 'flex',
            justifyContent: 'center',
            padding: 10
        };

        return (
            <Grid container style={{padding: 20}}>
                <Grid item xs={12} style={gridStyle}>
                    <Typography variant="title">
                        Erro 500: Erro Interno
                    </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <img src="/imgs/others/500.png" alt="Erro 500" />
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <Typography>
                        Desculpe... O problema não é você, somos nós.
                        <br/>
                        Estamos passando por problemas internos nos nossos servidores.
                        <br/>
                        Por favor, tente novamente mais tarde ou
                        procure ajuda na <Link to="/customerservice" style={linkStyle}>central de ajuda</Link>
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}

export default InternalError;