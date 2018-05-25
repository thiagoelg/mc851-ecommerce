import React, {Component} from "react"
import AddressClient from "../../clients/AddressClient";
import Autosuggestion from "../Autosuggestion/Autosuggestion";

class States extends Component{

    constructor(props) {
        super(props);

        this.state = {
            value: '',

            states: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value
        }, () => {
            if(this.props.onChange) {
                this.props.onChange({
                    target: {
                        value: this.state.value,
                        name: this.props.name
                    }
                });
            }
        });
    }

    componentDidMount() {
        AddressClient.getStates()
            .then(response => {
                const states = response.data.map(state => {
                    return {
                        value: state.uf,
                        label: state.nome
                    }
                });

                this.setState({
                    states: states
                });
            })
            .catch(error => {
                //TODO treat error
            })
    }

    render() {
        return (
            <Autosuggestion name="states"
                            placeholder="Escolha um estado"
                            value={this.props.value}
                            options={this.state.states}
                            onChange={this.handleChange}/>
        )
    }

}

export default States