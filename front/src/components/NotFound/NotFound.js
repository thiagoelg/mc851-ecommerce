import React, {Component} from "react"
import SentimentDissatisfied from "@material-ui/icons/es/SentimentDissatisfied";
import Typography from "@material-ui/core/es/Typography/Typography";
import Grid from "@material-ui/core/es/Grid/Grid";
import Link from "react-router-dom/es/Link";

class NotFound extends Component {

    render() {
        const linkStyle = {
            color: "blue",
            textDecoration: "underline"
        };

        return (
            <Grid container>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="headline">
                        <SentimentDissatisfied style={{fontSize: 200}}/>
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="display3">
                        404
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="title">
                        Página não encontrada
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', marginBottom: 20}}>
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