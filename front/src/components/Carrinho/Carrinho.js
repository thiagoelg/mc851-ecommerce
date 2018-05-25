import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, Button } from 'material-ui/es';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 'auto',
  },
});

let id = 0;
function createData(imagem, produto, qtd, preco) {
  id += 1;
  return { id, imagem, produto, qtd, preco };
}

let imagePath = "lhama.jpg"

const data = [
  createData(imagePath, 'Abajur Lhama', 1, 70.0),
  createData(imagePath, 'Abajur Esquilo', 1, 70.0),
  createData(imagePath, 'Abajur Baleia', 1, 70.0),
];

class SimpleTable extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        product: {},
        amount: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target
    this.setState({[target.name]: event.target.value})
  }

  render() {
    const {classes} = this.props;

    return (
    <Grid container spacing={24}>
      <Grid item xs={8}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Produto</TableCell>
              <TableCell TextField>Quantidade</TableCell>
              <TableCell></TableCell>
              <TableCell numeric>Preço</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    <Grid container> 
                      <Grid item xs={2}>
                        <img src={n.imagePath} height='auto'/>
                      </Grid>
                      <Grid item xs={4}>
                        {n.produto}
                      </Grid>
                    </Grid> 
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="amount"
                      value={this.state.amount}
                      name="amount"
                      onChange={this.handleChange}
                      type="number"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      margin="normal"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton color="secondary" aria-label="Delete">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell numeric>{n.preco}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={4}>
        <Paper>
          <Typography variant="headline" component="h3">
            This is a sheet of paper.
          </Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your application.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);