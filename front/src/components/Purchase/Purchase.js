import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import Grid from "@material-ui/core/es/Grid/Grid";
import {getPurchase} from "../../clients/PurchaseClient";
import PurchaseDetail from "./PurchaseDetail";
import Payment from "./Payment";
import Shipping from "./Shipping";
import PurchaseCustomerService from "./PurchaseCustomerService";
import PurchaseStatusStepper from "./PurchaseStatusStepper";
import {treatError} from "../../util/ErrorUtils";
import Fade from "@material-ui/core/es/Fade/Fade";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class Purchase extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchaseId: this.props.match.params.purchaseId,
            purchase: null,

            loading: true
        }
    }

    componentDidMount() {
        getPurchase(this.state.purchaseId)
            .then(response => {
                this.setState({
                    purchase: response.data,
                    loading: false
                });
            })
            .catch(error => {
                treatError(this.props, error)
            })
    }

    render() {
        let {purchase} = this.state;

        return (
            <Grid container>
                {this.state.loading ? (
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
                        <Fade
                            in={this.state.loading}
                            style={{
                                transitionDelay: this.state.loading ? '800ms' : '0ms'
                            }}
                            unmountOnExit
                        >
                            <CircularProgress/>
                        </Fade>
                    </Grid>
                ) : (
                    <Grid container>
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
                    </Grid>
                )}
            </Grid>

        )
    }

}

export default withRouter(Purchase);