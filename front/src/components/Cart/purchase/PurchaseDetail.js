import React, {Component} from "react"
import Card from "@material-ui/core/es/Card/Card";
import CardContent from "@material-ui/core/es/CardContent/CardContent";
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import Table from "@material-ui/core/es/Table/Table";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import Grid from "@material-ui/core/es/Grid/Grid";
import MoneyFormatter from "../../Formatters/MoneyFormatter";

class PurchaseDetail extends Component {

    render() {
        const products = this.props.products;

        const subTotal = products.reduce((acc, product) => acc + product.price * product.amount, 0);

        const numberOfProducts = products ? products.reduce((acc, p) => acc + p.amount, 0) : 0;

        const freight = this.props.shipping.price / 100;

        const total = freight ? freight + subTotal : subTotal;

        return (
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="headline" color="secondary">
                                <b>Detalhes da compra</b>
                            </Typography>
                            <br/>
                            <Divider/>
                            <br/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subheading">
                                Produtos
                            </Typography>
                            <br/>
                            <Table width="auto">
                                <TableBody>
                                    {products.map(product => {
                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell component="th" scope="row">
                                                    <div>
                                                        <img height={50}
                                                             src={product.imageUrl}
                                                             alt={product.name}/>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell numeric>
                                                    {product.amount}
                                                </TableCell>
                                                <TableCell numeric>
                                                    <p><MoneyFormatter value={product.price}/></p>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>

                        <Grid item xs={10} style={{marginTop: 20}}>
                            <Typography variant="body1">
                                Subtotal ({numberOfProducts} produtos):
                            </Typography>
                        </Grid>
                        <Grid item xs={2} style={{marginTop: 20}}>
                            <Typography variant="body1">
                                <MoneyFormatter value={subTotal}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={10} style={{marginTop: 10}}>
                            <Typography variant="body1">
                                Frete:
                            </Typography>
                        </Grid>
                        <Grid item xs={2} style={{marginTop: 10}}>
                            <Typography variant="body1">
                                <MoneyFormatter value={freight}/>
                            </Typography>
                        </Grid>
                        <Grid item xs={10} style={{marginTop: 30}}>
                            <Typography variant="title" color="secondary">
                                TOTAL
                            </Typography>
                        </Grid>
                        <Grid item xs={2} style={{marginTop: 30}}>
                            <Typography>
                                <MoneyFormatter value={total}/>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }

}

export default PurchaseDetail;