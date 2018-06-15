import React, {Component} from "react"
import Grid from "@material-ui/core/es/Grid/Grid";
import {getPurchase, PURCHASE_STATUS_LABEL} from "../../clients/PurchaseClient";
import PurchaseDetail from "./PurchaseDetail";
import Payment from "./Payment";
import Shipping from "./Shipping";
import PurchaseCustomerService from "./PurchaseCustomerService";
import Stepper from "@material-ui/core/es/Stepper/Stepper";
import Step from "@material-ui/core/es/Step/Step";
import StepButton from "@material-ui/core/es/StepButton/StepButton";
import PurchaseStatusStepper from "./PurchaseStatusStepper";

class Purchase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseId: this.props.match.params.purchaseId,
            purchase: null
        }
    }

    componentDidMount() {
        getPurchase(this.state.purchaseId)
            .then(response => {
                this.setState({
                    purchase: response.data
                });
            })
            .catch(error => {
                //TODO treat errors
            })
    }

    render() {
        let {purchase} = this.state;

        return (
            <div>
                {purchase && (
                    <Grid container spacing={24} style={{marginBottom: 20}}>
                        <Grid item xs={12}>
                            <PurchaseStatusStepper status={purchase.status}/>
                        </Grid>
                        < Grid item xs={8}>
                            <PurchaseDetail purchase={purchase}/>

                            <br/>

                            <Payment purchase={purchase} onClick={this.props.onPaymentClick}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Shipping purchase={purchase}
                                      onClick={this.props.onShippingClick}/>

                            <br/>

                            <PurchaseCustomerService purchase={purchase}/>
                        </Grid>
                    </Grid>
                )}
            </div>

        )
    }

}

export default Purchase;