import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import Grid from "@material-ui/core/es/Grid/Grid";
import Typography from "@material-ui/core/es/Typography/Typography";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {registerPurchaseTicket, registerTicket} from "../../clients/CustomerServiceClient";
import moment from "moment";
import UserProfile from "../../state/UserProfile";

class NewTicket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSendClick = this.handleSendClick.bind(this);
        this.registerTicket = this.registerTicket.bind(this);
    }

    registerTicket(message) {
        const purchaseId = this.props.match.params.purchaseId;

        if(purchaseId) {
            return registerPurchaseTicket(purchaseId, message);
        }

        return registerTicket(message);
    }

    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleSendClick(e) {
        const message = {
            timestamp: moment().format('YYYY-MM-DDTHH:mm'),
            sender: UserProfile.getId(),
            message: this.state.message
        };

        this.registerTicket(message)
            .then(response => {
                this.props.history.push(`/customerservice/ticket/${response.data.systemMessage}`);
            })
            .catch(error => {
                console.log(error);
                //TODO treat errors
            });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="headline">
                        Criar novo chamado
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        Se tiver alguma dúvida, sugestão ou problema não hesite em entrar contato com nossa Central de
                        Ajudas. Para isso, basta descrever seu problema abaixo que logo entraremos em contato com você.
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginTop: 10, marginBottom: 10}}>
                    <TextField
                        placeholder="Descreva seu problema / sugestão aqui..."
                        name="message"
                        value={this.state.message}
                        onChange={this.handleChange}
                        multiline={true}
                        rows={5}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="raised" color="secondary" onClick={this.handleSendClick}>
                        Enviar
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default withRouter(NewTicket);