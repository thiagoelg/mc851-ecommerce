import React, {Component} from "react"
import {PURCHASE_STATUS, PURCHASE_STATUS_LABEL} from "../../clients/PurchaseClient";
import Stepper from "@material-ui/core/es/Stepper/Stepper";
import Step from "@material-ui/core/es/Step/Step";
import StepButton from "@material-ui/core/es/StepButton/StepButton";

class PurchaseStatusStepper extends Component {

    render() {
        const {status} = this.props;

        const purchaseLifetime = [PURCHASE_STATUS.ORDER_REQUESTED,
            PURCHASE_STATUS.PAYMENT_APPROVED,
            PURCHASE_STATUS.SEPARING_FROM_STOCK,
            PURCHASE_STATUS.IN_TRANSPORT,
            PURCHASE_STATUS.DELIVERED];

        const reprovedPurchaseLifetime = [PURCHASE_STATUS.ORDER_REQUESTED,
            PURCHASE_STATUS.PAYMENT_REPROVED];

        const canceledPurchaseLifetime = [PURCHASE_STATUS.ORDER_REQUESTED,
            PURCHASE_STATUS.PAYMENT_REPROVED,
            PURCHASE_STATUS.CANCELED];

        let lifetime = purchaseLifetime;
        if(status === PURCHASE_STATUS.PAYMENT_REPROVED) {
            lifetime = reprovedPurchaseLifetime;
        } else if(status === PURCHASE_STATUS.CANCELED) {
            lifetime = canceledPurchaseLifetime;
        }


        return (
            <div>
                <Stepper nonLinear activeStep={status}>
                    {lifetime.map(step => {
                        return (
                            <Step key={step}
                                  completed={step <= status}>
                                <StepButton disabled={true}>
                                    {PURCHASE_STATUS_LABEL[step]}
                                </StepButton>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    }

}

export default PurchaseStatusStepper;