import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import UserProfile from "../../state/UserProfile";
import Link from "../Link/Link";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

class UserButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleProfile = this.handleProfile.bind(this);
        this.handlePurchases = this.handlePurchases.bind(this);
        this.handleCustomerService = this.handleCustomerService.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleMenuClick(event) {
        this.setState({anchorEl: event.target});
    };

    handleLogout() {
        UserProfile.clear();
        this.props.history.push("/");
        this.close();
    };

    handleProfile() {
        this.props.history.push("/profile");
        this.close();
    };

    handlePurchases() {
        this.props.history.push("/purchases");
        this.close();
    };

    handleCustomerService() {
        this.props.history.push("/customerservice");
        this.close();
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    close() {
        this.setState({anchorEl: null});
    }

    render() {
        const {anchorEl} = this.state;

        return (
            <div>
                {UserProfile.isLogged() ? (
                    <div>
                        <Button color="inherit"
                                aria-owns={anchorEl ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenuClick}>
                            <AccountCircle/>
                            Olá, {UserProfile.getFirstName()}!
                        </Button>
                        <Menu
                            id="profile-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem name="profile" onClick={this.handleProfile}>
                                Perfil
                            </MenuItem>
                            <MenuItem name="purchases" onClick={this.handlePurchases}>
                                Minhas Compras
                            </MenuItem>
                            <MenuItem name="customer-service" onClick={this.handleCustomerService}>
                                Atendimento
                            </MenuItem>
                            <MenuItem name="logout" onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <Link to="/signIn">
                        <Button color="inherit">
                            <AccountCircle/>
                            Entrar
                        </Button>
                    </Link>
                )}
            </div>
        )
            ;
    }

}

export default withRouter(UserButtons);