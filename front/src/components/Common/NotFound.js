import React, {Component} from "react"
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import Link from "react-router-dom/es/Link";

class NotFound extends Component {

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
                        Erro 404: Página não encontrada
                    </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <img src="/imgs/others/404.png"  alt=""/>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <Typography>
                        A página que você está procurando não existe, volte para
                        a <Link to="/" style={linkStyle}>página principal</Link> ou
                        procure ajuda na <Link to="/customerservice" style={linkStyle}>central de ajuda</Link>.
                    </Typography>
                </Grid>
            </Grid>
        );
    }

}

export default NotFound;