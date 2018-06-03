import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddressForm from "../Address/AddressForm";


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
});

class ChangeAddress extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="raised" color="secondary" onClick={this.handleClickOpen}>
            ALTERAR ENDEREÇO
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Alterar Endereço</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe o endereço em que deseja receber seu pedido.
            </DialogContentText>
            <AddressForm/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="raised">
              Cancelar
            </Button>
            <Button onClick={this.handleClose} variant="raised" color="secondary">
              Alterar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ChangeAddress.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChangeAddress);