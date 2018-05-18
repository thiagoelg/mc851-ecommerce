import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
function createData(produto, qtd, preco) {
  id += 1;
  return { id, produto, qtd, preco };
}

const data = [
  createData('Abajur Lhama', 1, 70.0),
  createData('Abajur Esquilo', 1, 70.0),
  createData('Abajur Baleia', 1, 70.0),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell numeric>Quantidade</TableCell>
            <TableCell numeric>Preço</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.produto}
                </TableCell>
                <TableCell numeric>{n.qtd}</TableCell>
                <TableCell numeric>{n.preco}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
   
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);