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

        //FIXME remove this
        purchase = {
            "id": 15244,
            "status": 2,
            "createdAt": "05/08/2018",
            "shipping": {
                "trackingCode": "RN625161646435464BR",
                "deliveryTime": 4,
                "price": "77286",
                "type": "PAC",
                "address": {
                    "identification": "Minha Casa",
                    "cep": "13070717",
                    "street": "Rua Luis Gama",
                    "number": "737",
                    "neighborhood": "Bonfim",
                    "city": "Campinas",
                    "state": "SP",
                    "complement": "Casa dos fundos"
                }
            },
            "payment": {
                "price": 500000,
                "boleto": {
                    "dueDate": "25/08/2018",
                    "barCode": "42297115040000218611260804028227",
                    "documentRep": "oxra9jn8lfk"
                },
                "card": {
                    "number": "444444xxxxx4444",
                    "brand": "MASTER_CARD",
                    "installments": 10
                }
            },
            "products": [
                {
                    "id": "284dc734-6b2e-460e-bca6-facb274ec970",
                    "name": "GELADEIRA KOMBI",
                    "description": "Sua cozinha ficará muito mais bonita! Contar com o que há de melhor na cozinha é o seu desejo? Então esse é o refrigerador certo pra você. Visual bonito deixará sua cozinha ainda mais elegante.",
                    "price": 5000,
                    "brand": "geladeireira",
                    "tags": [
                        "geladeireira",
                        "geladeira",
                        "kombi"
                    ],
                    "categoryId": "157ac3ce-a792-43de-aada-e744effdbe53",
                    "imageUrl": "/imgs/eletrodomesticos/geladeira_kombi.jpg",
                    "weight": 44000,
                    "length": 61,
                    "width": 60,
                    "height": 161,
                    "amount": 1
                }
            ]
        };

        return (
            <Grid container spacing={24} style={{marginBottom: 20}}>
                <Grid item xs={12}>
                    <Stepper nonLinear activeStep={purchase.status}>
                        {Object.values(PURCHASE_STATUS_LABEL).map((label, index) => {
                            return (
                                <Step key={label}
                                        completed={index < purchase.status}>
                                    <StepButton disabled={true} >
                                        {label}
                                    </StepButton>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Grid>
                <Grid item xs={8}>
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
        )
    }

}

export default Purchase;