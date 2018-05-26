import React, {Component} from "react"
import AddressClient from "../../clients/AddressClient";
import Autosuggestion from "../Autosuggestion/Autosuggestion";

class Cities extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',

            cities: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState({
            value: value
        }, () => {
            if (this.props.onChange) {
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
        this.getCities(this.props);
    }

    componentWillReceiveProps(props) {
        if(props.uf !== this.props.uf) {
            this.getCities(props);
        }
    }

    getCities(props) {
        if (props.uf) {
            AddressClient.getCities(props.uf)
                .then(response => {
                    const cities = response.data.map(state => {
                        return {
                            value: state.nome,
                            label: state.nome
                        }
                    });

                    this.setState({
                        cities: cities
                    });
                })
                .catch(error => {
                    //TODO treat error
                });
        }
    }

    render() {
        return (
            <Autosuggestion name="states"
                            placeholder="Escolha uma cidade"
                            options={this.state.cities}
                            value={this.props.value}
                            onChange={this.handleChange}/>
        )
    }

}

export default Cities