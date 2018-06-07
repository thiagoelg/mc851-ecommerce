import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import Header from "../Header/Header";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";

class GlobalLayout extends Component {

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Header/>
                </Grid>
                <Grid container spacing={24}>
                    <Body/>
                </Grid>
                <Grid container spacing={24}>
                    <Footer/>
                </Grid>
            </div>
        );
    }

}

export default GlobalLayout;