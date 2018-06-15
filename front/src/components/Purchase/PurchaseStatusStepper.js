import React, {Component} from "react"
import {PURCHASE_STATUS, PURCHASE_STATUS_LABEL} from "../../clients/PurchaseClient";
import Stepper from "@material-ui/core/es/Stepper/Stepper";
import Step from "@material-ui/core/es/Step/Step";
import StepButton from "@material-ui/core/es/StepButton/StepButton";

class PurchaseStatusStepper extends Component {

    render() {
        const {status} = this.props;

        const purchaseLifetime = [PURCHASE_STATUS.ORDER_REQUESTED, PURCHASE_STATUS.PAYMENT_APPROVED, PURCHASE_STATUS.SEPARING_FROM_STOCK];
        const reprovedPurchaseLifetime = [PURCHASE_STATUS.ORDER_REQUESTED, PURCHASE_STATUS.PAYMENT_REPROVED];

        return (
            <div>

                {status === PURCHASE_STATUS.PAYMENT_REPROVED ? (
                    <Stepper nonLinear activeStep={status}>
                        {reprovedPurchaseLifetime.map(step => {
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
                ) : (
                    <Stepper nonLinear activeStep={status}>
                        {purchaseLifetime.map(step => {
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
                )}
            </div>
        );
    }

}

export default PurchaseStatusStepper;