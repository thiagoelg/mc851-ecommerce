import React, {Component} from "react"
import Tickets from "./Tickets";
import Grid from "@material-ui/core/es/Grid/Grid";
import NewTicket from "./NewTicket";
import UserProfile from "../../state/UserProfile";

class CustomerService extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseId: undefined
        }
    }

    componentDidMount() {
        if(!UserProfile.isLogged()) {
            this.props.history.push('/signIn');
            return;
        }

        const purchaseId = this.props.match.params.purchaseId;

        if (purchaseId) {
            this.setState({
                purchaseId: purchaseId
            });
        }
    }

    render() {

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Tickets/>
                </Grid>
                <Grid item xs={8} style={{marginTop: 20, marginBottom: 20}}>
                    <NewTicket/>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        );

    }

}

export default CustomerService;