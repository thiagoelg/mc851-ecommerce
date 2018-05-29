import React, {Component} from "react"
import {
    changeTicketStatus,
    getTicket,
    TICKET_STATUS,
    TICKET_STATUS_LABELS,
    updateTicket
} from "../../clients/CustomerServiceClient";
import Typography from "@material-ui/core/es/Typography/Typography";
import UserProfile from "../../state/UserProfile";
import Grid from "@material-ui/core/es/Grid/Grid";
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import moment from "moment";
import Divider from "@material-ui/core/es/Divider/Divider";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class Ticket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ticket: {},
            message: '',

            messageSent: false,
            waitingMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.getTicketNewStatusId = this.getTicketNewStatusId.bind(this);
        this.sendMessageWithAction = this.sendMessageWithAction.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        getTicket(id)
            .then(response => {
                const ticket = response.data.ticketsList[0];

                const firstOperatorMessage = ticket.messagesList
                    .filter(message => message.sender !== UserProfile.getId())[0];

                const operator = firstOperatorMessage && firstOperatorMessage.sender;

                this.setState({
                    ticket: {
                        ticketId: ticket.ticketId,
                        clienteId: ticket.clienteId,
                        compraId: ticket.compraId,
                        siteId: ticket.siteId,
                        statusId: ticket.statusId,
                        messageSize: ticket.messageSize,
                        messagesList: ticket.messagesList,
                        operator: operator
                    }
                });
            })
            .catch(error => {
                //TODO treat error
            });
    }

    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    handleClick(name) {
        const message = {
            timestamp: moment().format('YYYY-MM-DDTHH:mm'),
            sender: UserProfile.getId(),
            message: this.state.message
        };

        this.setState({
            message: '',
            waitingMessage: true
        }, () => {
            const ticket = Object.assign({}, this.state.ticket);
            ticket.messagesList.push(message);
            ticket.statusId = this.getTicketNewStatusId(name);

            this.sendMessageWithAction(name, message)
                .then(response => {
                    this.setState({
                        open: true,
                        messageSent: true,
                        waitingMessage: false,
                        ticket: ticket,
                    });
                })
                .catch(error => {
                    this.setState({
                        waitingMessage: false
                    });

                    //TODO treat error
                });

        });
    }

    getTicketNewStatusId(name) {
        if (name === "send") {
            return TICKET_STATUS.OPEN;
        } else if (name === "close") {
            return TICKET_STATUS.CLOSED;
        } else if (name === "cancel") {
            return TICKET_STATUS.CANCELED;
        }

    }

    sendMessageWithAction(name, message) {
        const ticketId = this.state.ticket.ticketId;

        if (name === "send") {
            return updateTicket(ticketId, message);
        } else {
            let newStatusId = this.getTicketNewStatusId(name);
            return changeTicketStatus(ticketId, newStatusId, message);
        }
    }

    handleClose = () => {
        this.setState({
            open: false,
            messageSent: false
        });
    };

    render() {
        const ticket = this.state.ticket;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={5000}
                        message={
                            <span id="message-id">
                                {this.state.messageSent && (
                                    <p>Mensagem enviada com sucesso! Agora é só aguardar uma resposta de um de nossos
                                        atendentes.<br/></p>
                                )}
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <Close/>
                            </IconButton>,
                        ]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="headline">
                        <b>Chamado de protocolo: </b>{ticket.ticketId}
                    </Typography>
                    <Typography variant="body1">
                        <b>Compra: </b>{ticket.compraId ? ticket.compraId : "Não relacionado"}
                    </Typography>
                    <Typography variant="body1">
                        <b>Status: </b>{TICKET_STATUS_LABELS[ticket.statusId]}
                    </Typography>
                    <Typography variant="body1">
                        <b>Atendente: </b>{ticket.operator ? ticket.operator : "Não definido"}
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginTop: 10}}>
                    <Typography variant="subheading">
                        Mensagens
                    </Typography>
                    {ticket.messagesList && (
                        <List>
                            <Divider/>
                            {ticket.messagesList.map(message => {
                                let dateTime = moment(message.timestamp, 'YYYY-MM-DDTHH:mm');
                                return (
                                    <div key={message.timestamp}>
                                        <ListItem button>
                                            <ListItemText>
                                                {message.sender === UserProfile.getId() ? (
                                                    <Typography variant="subheading">
                                                        {UserProfile.getName()} disse:
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="subheading">
                                                        {message.sender} respondeu:
                                                    </Typography>
                                                )}
                                                <Typography variant="caption">
                                                    {dateTime.format('DD/MM/YYYY')} às {dateTime.format('HH:mm')}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {message.message}
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                )
                            })}
                        </List>
                    )}
                </Grid>
                <Grid item xs={12} style={{marginTop: 20}}>
                    <Grid container>
                        <Grid item xs={6}>
                            <TextField
                                placeholder="Escreva nova mensagem..."
                                name="message"
                                value={this.state.message}
                                onChange={this.handleChange}
                                multiline={true}
                                rows={2}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={4}>
                            <Button variant="raised"
                                    color="secondary"
                                    onClick={(e) => this.handleClick("send")}
                                    disabled={this.state.waitingMessage}
                                    style={{marginRight: 5}}>
                                Enviar
                            </Button>
                            <Button variant="raised"
                                    color="secondary"
                                    onClick={(e) => this.handleClick("close")}
                                    disabled={this.state.waitingMessage}
                                    style={{marginRight: 5}}>
                                Fechar
                            </Button>
                            <Button variant="raised"
                                    color="secondary"
                                    onClick={(e) => this.handleClick("cancel")}
                                    disabled={this.state.waitingMessage}>
                                Cancelar
                            </Button>
                        </Grid>
                        <Grid item xs={1}>
                            {this.state.waitingMessage && (<CircularProgress/>)}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}

export default Ticket;