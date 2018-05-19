import React from 'react';
import {FormControl, FormControlLabel, FormGroup, FormLabel,} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class CheckboxesGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: []
        };

        this.handleChange = this.handleChange.bind(this);
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
                                        checked={this.props.value.indexOf(item.id) >= 0}
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

export default CheckboxesGroup;