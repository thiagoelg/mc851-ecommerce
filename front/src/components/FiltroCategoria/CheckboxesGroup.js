import React from 'react';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

class CheckboxesGroup extends React.Component {
  state = {
    Samsung: true,
    LG: false,
    Apple: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">{this.props.label}</FormLabel>
        <FormGroup>
            {
                this.props.content.map((item) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state[item.id]}
                                name={item.id}
                                onChange={this.handleChange}
                                value={item.id}
                            />
                        }
                        label={item.name}
                    />
                ))
            }
        </FormGroup>
        <Divider />
      </FormControl>
    );
  }
}

export default CheckboxesGroup;