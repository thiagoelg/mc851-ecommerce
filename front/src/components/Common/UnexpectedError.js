import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import Link from "react-router-dom/es/Link";

class UnexpectedError extends Component {
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
                        Ops... Um erro inesperado aconteceu!
                    </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <img height={200} src="/imgs/others/error.png" alt="Erro"/>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <Typography>
                        Desculpe... O problema não é você, somos nós.
                        <br/>
                        Se você chegou nessa página um erro inesperado aconteceu.
                        <br/>
                        Por favor, tente novamente mais tarde ou
                        procure ajuda na <Link to="/customerservice" style={linkStyle}>central de ajuda</Link>
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default UnexpectedError;