import React from 'react';
import {FormControl, FormControlLabel, FormGroup, FormLabel,} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

class MultiSelectionCheckboxes extends React.Component {

    constructor(props) {
        super(props);

        const checkedItems = this.props.value;

        this.state = {
            checkedItems: checkedItems ? checkedItems : []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        const checkedItems = nextProps.value;

        this.setState({
            checkedItems: checkedItems ? checkedItems : []
        });

    }

    callback() {
        this.props.onChange({
            target: {
                value: this.state.checkedItems,
                name: this.props.name
            }
        });
    }

    handleChange(event) {

        const target = event.target;

        this.setState((prevState, props) => {

                const index = prevState.checkedItems.indexOf(target.name);

                if (target.checked && index < 0) {
                    let newCheckedItems = prevState.checkedItems;
                    newCheckedItems.push(target.name);

                    return {
                        checkedItems: newCheckedItems
                    };
                } else if (index >= 0) {
                    let newCheckedItems = prevState.checkedItems.filter(itemId => itemId !== target.name)

                    return {
                        checkedItems: newCheckedItems
                    };
                }

            },

            () => this.callback());

    }

    render() {
        let items = this.props.items;
        if (items === undefined) {
            items = this.props.content.map((itemName) => {
                return {
                    name: itemName,
                    id: itemName
                }
            })
        }

        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">{this.props.label}</FormLabel>
                <FormGroup>
                    {
                        items.map((item) => (
                            <FormControlLabel
                                key={item.id}
                                control={
                                    <Checkbox
                                        checked={this.state.checkedItems.indexOf(item.id) >= 0}
                                        name={item.id}
                                        onChange={this.handleChange}
                                        value={item.name}
                                    />
                                }
                                label={item.name}
                            />
                        ))
                    }
                </FormGroup>
            </FormControl>
        );
    }
}

export default MultiSelectionCheckboxes;