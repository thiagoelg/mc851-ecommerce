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
        this.handleClose = this.handleClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

    }

    handleMenuClick(event) {
        this.setState({anchorEl: event.target});
    };

    handleClose() {
        this.close()
    }

    handleLogout() {
        UserProfile.clear();
        this.close();
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
                            <MenuItem name="profile" onClick={this.handleClose}>
                                <Link to="/profile">Perfil</Link>
                            </MenuItem>
                            <MenuItem name="purchases" onClick={this.handleClose}>
                                <Link to="/purchases">Minhas Compras</Link>
                            </MenuItem>
                            <MenuItem name="customer-service" onClick={this.handleClose}>
                                <Link to="/customerservice">Atendimento</Link>
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