import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import ShippingSummary from "./ShippingSummary";
import PaymentSummary from "./PaymentSummary";
import PurchaseDetail from "./PurchaseDetail";

class PurchaseReview extends Component {

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={8}>
                    <PurchaseDetail products={this.props.products} shipping={this.props.shipping}/>

                    <br/>

                    <PaymentSummary payment={this.props.payment} onClick={this.props.onPaymentClick}/>
                </Grid>
                <Grid item xs={4}>
                    <ShippingSummary address={this.props.address}
                                     shipping={this.props.shipping}
                                     onClick={this.props.onShippingClick}/>
                </Grid>
            </Grid>
        )
    }

}

export default PurchaseReview;