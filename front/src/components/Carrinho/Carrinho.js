import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Divider from '@material-ui/core/Divider';
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Link from "../Link/Link";
import Freight from "../Freight/Freight";
import UserProfile from "../../state/UserProfile";



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
function createData(produto, amount, preco) {
  id += 1;
  return { id, produto, amount, preco };
}

const data = [
  createData('Panda', 1, 70.00),
  createData('Panda', 1, 70.00),
  createData('Panda', 1, 70.00),
];

class Cart extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
        products: [],
        amount: 1
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const target = event.target;
    this.setState({[target.name]: event.target.value})
    
  }

  render() {
    const {classes} = this.props;

    return (
    <Grid container spacing={24} height="auto">
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
                      <Grid item xs={8} justify="center">
                        <div>
                          <img height={40} src={"https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg"}/>
                        </div>
                      </Grid>
                      <Grid item xs={4} justify="center">
                        {n.produto}
                      </Grid>
                    </Grid> 
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="amount"
                      value={n.amount}
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
                  <TableCell numeric>
                    <p>R$ {n.preco}</p>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="headline">
              resumo do pedido
            </Typography>
            <p>subtotal (3 produtos): <b>R$ 699,00</b> </p>
            <p>frete: <b>R$ 25,50</b></p> 
            <Divider/>
            <p> </p>
            <Typography variant="Subheading">
              Total: <b>R$ 724,50</b> 
            </Typography>
            <Typography variant="caption">
              Em até 10x sem juros
            </Typography>
            <Typography variant="caption" color="secondary">
              R$ 700,00 no boleto
            </Typography>
            <p> </p>
            <Divider/>
          </CardContent>
          <CardActions>
            <Grid item xs={12}>
              <div>
                {UserProfile.isLogged() ? (
                  <Link to="/endShopping">
                    <Button variant="raised" color="secondary" fullWidth>
                      Comprar
                    </Button>
                  </Link>
                ) : (
                  <Link to="/signIn">
                    <Button variant="raised" color="secondary" fullWidth>
                      Comprar
                    </Button>
                  </Link>
                )}
              </div> 
            </Grid>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={9}>
        <br/>
        <Freight />
        <br/>
      </Grid>
    </Grid>
    );
  }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);