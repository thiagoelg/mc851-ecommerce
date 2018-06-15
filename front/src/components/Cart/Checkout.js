import React, {Component} from 'react';
import {withRouter} from "react-router-dom"
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from "@material-ui/core/es/Stepper/Stepper";
import Step from "@material-ui/core/es/Step/Step";
import StepButton from "@material-ui/core/es/StepButton/StepButton";
import Typography from "@material-ui/core/es/Typography/Typography";
import Button from "@material-ui/core/es/Button/Button";
import PurchaseSummary from "./purchase/PurchaseSummary";
import ShippingMethod from "./shipping/ShippingMethod";
import PaymentMethod from "./payment/PaymentMethod";
import PurchaseReview from "./purchase/PurchaseReview";
import {cart} from "../../cart/Cart"
import {CartResult} from "../../cart/CartResult";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Close from "@material-ui/icons/es/Close";
import {scrollToTop} from "../../util/ScrollUtils";
import UserProfile from "../../state/UserProfile";
import Link from "../Link/Link";

const styles = theme => ({
    backButton: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
});

class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shipping: props.location.state.shipping,
            address: null,
            validShippingInfo: false,

            payment: null,
            validPaymentInfo: false,

            cep: props.location.state.cep,

            products: props.location.state.products,
            activeStep: 0,
            steps: ['Forma de Entrega', 'Forma de Pagamento', 'Resumo da Compra'],

            open: false,
            unsupportedInstallments: false,
            invalidCep: false,
            unauthorizedPayment: false,
            expiredCart: false,
        };

        this.handleStepClick = this.handleStepClick.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleShippingClick = this.handleShippingClick.bind(this);
        this.handlePaymentClick = this.handlePaymentClick.bind(this);
        this.handleShippingMethodChange = this.handleShippingMethodChange.bind(this);
        this.handleCreditCardChange = this.handleCreditCardChange.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getStepContent = this.getStepContent.bind(this);
        this.isStepValid = this.isStepValid.bind(this);
    }

    componentWillMount() {
        if (!UserProfile.isLogged()) {
            this.props.history.push({
                pathname: "/signIn",
            });
          }
    }

    handleClose = () => {
        this.setState({
            open: false,
            unsupportedInstallments: false,
            invalidCep: false,
            unauthorizedPayment: false,
            expiredCart: false
        });
    };

    handleCheckout(event) {
        const subTotal = this.state.products.reduce((acc, product) => acc + product.price * product.amount, 0);
        const freight = this.state.shipping.price / 100;
        const total = freight ? freight + subTotal : subTotal;

        cart.checkout(this.state.shipping, this.state.address, this.state.payment, total)
            .then(checkoutResult => {
                switch (checkoutResult.result) {
                    case CartResult.SUCCESS: {
                        this.props.history.push({
                            pathname: `/confirmation/${checkoutResult.purchaseId}`,
                            state: {
                                shipping: this.state.shipping,
                                address: this.state.address,
                                payment: this.state.payment,
                                products: this.state.products,
                                purchaseId: checkoutResult.purchaseId
                            }
                        });
                        break;
                    }

                    case CartResult.UNSUPPORTED_INSTALLMENTS: {
                        this.setState({
                            open: true,
                            unsupportedInstallments: true
                        });
                        break;
                    }

                    case CartResult.INVALID_CEP: {
                        this.setState({
                            open: true,
                            invalidCep: true
                        });
                        break;
                    }

                    case CartResult.UNAUTHORIZED_PAYMENT: {
                        this.setState({
                            open: true,
                            unauthorizedPayment: true
                        });
                        break;
                    }

                    case CartResult.EXPIRED: {
                        this.setState({
                            open: true,
                            expiredCart: true
                        }, () => {
                            setTimeout(() => this.props.history.push("/cart"), 2000);
                        });
                        break;
                    }

                    case CartResult.INTERNAL_ERROR:
                    case CartResult.ERROR:
                    default: {
                        //TODO treat error
                    }
                }
            });
    }

    handleShippingMethodChange(event) {
        const cep = event.address.cep || this.state.cep;

        this.setState({
            shipping: event.shipping,
            address: event.address,
            cep: cep,
            validShippingInfo: event.valid
        })
    }

    handleCreditCardChange(event) {
        const payment = {
            isCreditCard: event.isCreditCard,
            isBoleto: event.isBoleto,
            card: event.card
        };

        this.setState({
            payment: payment,
            validPaymentInfo: event.valid
        });
    }

    isStepValid(step) {
        switch (step) {
            case 0:
                return this.state.validShippingInfo;
            case 1:
                return this.state.validPaymentInfo;
            case 2:
            default:
                return true;
        }
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return 'Selecione uma forma de entrega e informe seu endereço...';
            case 1:
                return 'Selecione uma forma de pagamento e preencha os dados necessários...';
            case 2:
                return 'Verifique todos os dados e finalize sua compra';
            default:
                return 'Passo desconhecido';
        }
    }

    handleStepClick(index) {
        this.setState({
            activeStep: index,
        });
    }

    handleNext() {
        scrollToTop();
        const {activeStep} = this.state;
        this.setState({
            activeStep: activeStep + 1,
        });
    };

    handleBack() {
        scrollToTop();
        const {activeStep} = this.state;

        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleCancel() {
        this.props.history.goBack();
    }

    handleShippingClick() {
        scrollToTop();
        this.setState({
            activeStep: 0,
        });
    }

    handlePaymentClick() {
        scrollToTop();
        this.setState({
            activeStep: 1,
        });
    }


    render() {
        const {classes} = this.props;
        const {activeStep, steps, products, shipping, cep, address, payment} = this.state;

        const subTotal = products.reduce((acc, product) => acc + product.price * product.amount, 0);
        const freight = shipping.price / 100;
        const total = freight ? freight + subTotal : subTotal;

        return (
            <Grid container spacing={24} height="auto" style={{marginBottom: 20}}>
                <Grid item xs={12}>
                    <Snackbar
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        open={this.state.open}
                        onClose={this.handleClose}
                        autoHideDuration={5000}
                        message={
                            <span id="message-id" color="error">
                                {this.state.unsupportedInstallments && (
                                    <p>A quantidade de parcelas não é válida, favor alterá-la.</p>
                                )}
                                {this.state.invalidCep && (
                                    <p>O CEP informado é inválido, favor alterá-lo.</p>
                                )}
                                {this.state.unauthorizedPayment && (
                                    <p>O pagamento foi rejeitado.</p>
                                )}
                                {this.state.expiredCart && (
                                    <p>O seu carrinho expirou, você vai precisar montá-lo novamente.</p>
                                )}
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={this.handleClose}
                            >
                                <Close/>
                            </IconButton>,
                        ]}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stepper alternativeLabel
                             nonLinear
                             activeStep={activeStep}>
                        {steps.map((label, index) => {
                            return (
                                <Step key={label}
                                      completed={index < activeStep}>
                                    <StepButton onClick={e => this.handleStepClick(index)}
                                                disabled={!this.isStepValid(activeStep)}>
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Grid>
                {activeStep !== 2 && (
                    <Grid item xs={4}>
                        <PurchaseSummary products={products} shipping={shipping}/>
                    </Grid>
                )}
                {activeStep === 0 && (
                    <Grid item xs={8}>
                        <ShippingMethod
                            products={products}
                            shipping={shipping}
                            address={address}
                            cep={cep}
                            onChange={this.handleShippingMethodChange}/>
                    </Grid>
                )}

                {activeStep === 1 && (
                    <Grid item xs={8}>
                        <PaymentMethod
                            price={total}
                            payment={this.state.payment}
                            onChange={this.handleCreditCardChange}/>
                    </Grid>
                )}

                {activeStep === 2 && (
                    <Grid item xs={12}>
                        <PurchaseReview
                            shipping={shipping}
                            address={address}
                            payment={payment}
                            products={products}
                            onShippingClick={this.handleShippingClick}
                            onPaymentClick={this.handlePaymentClick}/>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <div>
                        {this.state.activeStep === 3 ? (
                            <div>
                                <Typography className={classes.instructions}>
                                    Sua compra foi concluída com sucesso!
                                </Typography>
                                <Button onClick={this.handleReset}>Reset</Button>
                            </div>
                        ) : (
                            <div>
                                <Typography className={classes.instructions}>
                                    Passo {activeStep + 1}: {this.getStepContent(activeStep)}
                                </Typography>
                                <div>
                                    {activeStep === 0 ? (
                                        <Button
                                            variant="raised"
                                            color="default"
                                            onClick={this.handleCancel}
                                            className={classes.backButton}
                                        >
                                            Cancelar
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="raised"
                                            color="default"
                                            disabled={activeStep === 0}
                                            onClick={this.handleBack}
                                            className={classes.backButton}
                                        >
                                            Voltar
                                        </Button>
                                    )}
                                    {activeStep !== steps.length - 1 ? (
                                        <Button variant="raised"
                                                color="primary"
                                                disabled={!this.isStepValid(activeStep)}
                                                onClick={this.handleNext}>
                                            Próximo
                                        </Button>
                                    ) : (
                                        <Button variant="raised"
                                                color="primary"
                                                onClick={this.handleCheckout}>
                                            Finalizar a Compra
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(Checkout));