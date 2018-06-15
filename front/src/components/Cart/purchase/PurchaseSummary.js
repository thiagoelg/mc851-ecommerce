import React, {Component} from "react"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Grid from "@material-ui/core/es/Grid/Grid";
import MoneyFormatter from "../../Formatters/MoneyFormatter";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";

class PurchaseSummary extends Component {

    render() {
        const products = this.props.products;

        const subTotal = products.reduce((acc, product) => acc + product.price * product.amount, 0);

        const numberOfProducts = products ? products.reduce((acc, p) => acc + p.amount, 0) : 0;

        const freight = this.props.shipping ? this.props.shipping.price / 100 : 0;

        const total = freight ? freight + subTotal : subTotal;

        return (
            <Card>
                <CardContent>
                    <p></p>
                    <Typography variant="headline" color="secondary">
                        <b>Resumo da compra</b>
                    </Typography>
                    <p></p>
                    <Divider/>
                    <p></p>
                    <Grid container>
                        {products && products.length && (
                            <Grid item xs={12}>
                                <Typography variant="body1">
                                    Produtos:
                                </Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Item</TableCell>
                                            <TableCell numeric>Qtd</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {products.map(product => {
                                            return (
                                                <TableRow key={product.id}>
                                                    <TableCell component="th" scope="row">
                                                        {product.name}
                                                    </TableCell>
                                                    <TableCell numeric>{product.amount}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </Grid>
                        )}

                        <Grid item xs={8} style={{marginTop: 20}}>
                            <Typography variant="body1">
                                Subtotal ({numberOfProducts} produtos):
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{marginTop: 20}}>
                            <Typography variant="body1">
                                <MoneyFormatter value={subTotal}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} style={{marginTop: 10}}>
                            <Typography variant="body1">
                                Frete:
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{marginTop: 10}}>
                            <Typography variant="body1">
                                <MoneyFormatter value={freight}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={8} style={{marginTop: 30}}>
                            <Typography variant="title" color="secondary">
                                TOTAL
                            </Typography>
                        </Grid>
                        <Grid item xs={4} style={{marginTop: 30}}>
                            <Typography>
                                <MoneyFormatter value={total}/>
                            </Typography>
                        </Grid>

                    </Grid>
                </CardContent>
            </Card>
        );
    }

}

export default PurchaseSummary;