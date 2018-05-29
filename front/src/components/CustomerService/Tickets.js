import React, {Component} from "react"
import {withRouter} from 'react-router-dom'
import {getClientTickets, TICKET_STATUS_LABELS} from "../../clients/CustomerServiceClient";
import UserProfile from "../../state/UserProfile";
import Typography from "@material-ui/core/es/Typography/Typography";
import List from "@material-ui/core/es/List/List";
import Divider from "@material-ui/core/es/Divider/Divider";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import Grid from "@material-ui/core/es/Grid/Grid";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Comment from "@material-ui/icons/es/Comment";

class Tickets extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tickets: []
        }

        this.handleTicketClick = this.handleTicketClick.bind(this);
    }

    componentDidMount() {
        getClientTickets()
            .then(response => {
                let tickets = response.data.ticketsList;

                tickets = tickets.map(ticket => {
                    const firstOperatorMessage = ticket.messagesList
                        .filter(message => message.sender !== UserProfile.getId())[0];

                    const operator = firstOperatorMessage && firstOperatorMessage.sender;

                    return {
                        ticketId: ticket.ticketId,
                        clienteId: ticket.clienteId,
                        compraId: ticket.compraId,
                        siteId: ticket.siteId,
                        statusId: ticket.statusId,
                        messageSize: ticket.messageSize,
                        messagesList: ticket.messagesList,
                        operator: operator
                    };
                });

                this.setState({
                    tickets: tickets
                });
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    this.setState({
                        tickets: []
                    });
                    return;
                }
                //TODO treat errors
            });
    }

    handleTicketClick(ticketId) {
        this.props.history.push(`/customerservice/ticket/${ticketId}`);
    }

    render() {

        return (
            <div>
                <Typography variant="headline">
                    Meus Chamados
                </Typography>
                {this.state.tickets.length === 0 && (
                    <Typography variant="subheading" gutterBottom align="center">
                        Você não abriu nenhum chamado na nossa loja.
                    </Typography>
                )}
                {this.state.tickets.length > 0 && (
                    <List>
                        <Divider/>
                        {this.state.tickets && this.state.tickets.map(ticket => (
                            <div key={ticket.ticketId}>
                                <ListItem
                                    key={ticket.ticketId}
                                    name={ticket.ticketId}
                                    role={undefined}
                                    dense
                                    button
                                    onClick={(e) => this.handleTicketClick(ticket.ticketId)}
                                >
                                    <Grid container>
                                        <Grid item xs={1}>
                                            <ListItemText>
                                                <Comment/>
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText>
                                                <b>Protocolo: </b>{ticket.ticketId}
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <ListItemText>
                                                <b>Status: </b>{TICKET_STATUS_LABELS[ticket.statusId]}
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText>
                                                <b>Compra: </b>{ticket.compraId ? ticket.compraId : "Não relacionado"}
                                            </ListItemText>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <ListItemText>
                                                <b>Atendente: </b>{ticket.operator ? ticket.operator : "Não definido"}
                                            </ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                                <Divider/>
                            </div>
                        ))}
                    </List>
                )}
            </div>
        );

    }

}

export default withRouter(Tickets);