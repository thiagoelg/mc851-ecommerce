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
import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Divider from '@material-ui/core/Divider';
import CardActions from "@material-ui/core/es/CardActions/CardActions";
import Link from "../Link/Link";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';



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
function createData(produto, preco) {
  id += 1;
  return { id, produto, preco };
}

const prod = [
  createData('Lindo urso panda para abraçar nos dias frios', 70.00),
  createData('Lindo urso panda para abraçar nos dias frios', 70.00),
  createData('Lindo urso panda para abraçar nos dias frios', 70.00),
];


class EndShopping extends Component {

  state = {
    value: 'PAC',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  
  constructor(props) {
    super(props);  
  }

  render() {
    const {classes} = this.props;

    return (
    <Grid container spacing={24} height="auto">
      <Grid item xs={8}>
        <Card style={{backgroundColor:"secondary"}}>
            <CardContent>
                <Typography variant="headline" color="secondary">
                    <b>Detalhes da compra</b>
                </Typography>
                <p></p>
                <Divider/>
                <p></p>
                <Typography variant="Title">
                    Produtos
                </Typography>
                <p></p>
                <Table>
                  <TableBody>
                      {prod.map(n => {
                        return (
                          <TableRow key={n.id}>
                            <TableCell component="th" scope="row">
                              <div>
                                <img height={40} src={"https://media4.s-nbcnews.com/j/newscms/2016_36/1685951/ss-160826-twip-05_8cf6d4cb83758449fd400c7c3d71aa1f.nbcnews-ux-2880-1000.jpg"}/>
                              </div>
                            </TableCell>
                            <TableCell>
                               {n.produto}
                            </TableCell> 
                            <TableCell numeric>
                                <p>R$ {n.preco}</p>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
                <p></p>
                <p></p>
                <Typography variant="Title">
                    Frete
                </Typography>
                <p></p>
                <Grid item style={{margin: 20}}>
                  <FormControl component="fieldset" required className={classes.formControl}>
                    <RadioGroup
                      name="frete"
                      className={classes.group}
                      value={this.state.value}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="PAC" control={<Radio />} label="PAC    R$ 1700,98" />
                      <FormControlLabel value="SEDEX" control={<Radio />} label="SEDEX   R$ 86,04" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
            </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
            <CardContent>
                <Typography variant="headline" color="secondary">
                    <b>Endereço de entrega</b>
                </Typography>
                <p></p>
                <Divider/>
                <p></p>
                <Typography variant="Title">
                    Principal
                </Typography>
                <Typography variant="body1">
                    <br/>
                    Avenida Albino Alves, 167
                    <br/>
                    Centro 
                    <br/>
                    Amparo-SP
                    <br/>
                    1390000
                </Typography>
                <p></p>
                <Divider/>
                <p></p>
                <Typography variant="caption">
                    Quer receber seus produtos em outro endereço?
                </Typography>
                <p></p>
                <Button variant="raised" color="secondary" >
                    Alterar Endereço
                </Button>
            </CardContent>
        </Card>
      </Grid>
    </Grid>
    );
  }
}

EndShopping.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EndShopping);