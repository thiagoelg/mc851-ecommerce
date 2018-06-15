import React, {Component} from "react"
import UserProfile from "../../state/UserProfile";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import Link from "react-router-dom/es/Link";

class Forbidden extends Component {
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
                        Erro 403: Acesso Negado
                    </Typography>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <img src="/imgs/others/403.png" alt="Erro 403"/>
                </Grid>
                <Grid item xs={12} style={gridStyle}>
                    <Typography>
                        Ops... você não tem acesso para acessar essa página.
                        <br/>
                        {UserProfile.isLogged() ? (
                            <p>
                                Se você acha que isso está errado e você deveria ter acesso a essa página
                                procure ajuda na <Link to="/customerservice" style={linkStyle}>central de ajuda</Link>.
                            </p>
                        ) : (
                            <p>
                                Realize o <Link to="/signIn" style={linkStyle}>login</Link>.
                            </p>
                        )}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default Forbidden;