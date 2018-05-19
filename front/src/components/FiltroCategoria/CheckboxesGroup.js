import React from 'react';
import {FormControl, FormControlLabel, FormGroup, FormLabel,} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';

class CheckboxesGroup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
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
                                        checked={this.state[item.id]}
                                        name={item.id}
                                        onChange={this.props.onChange}
                                        value={item.id}
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