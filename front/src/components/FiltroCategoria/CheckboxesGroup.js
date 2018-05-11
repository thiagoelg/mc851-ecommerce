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
        <FormLabel component="legend">Marcas</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.gilad}
                onChange={this.handleChange('Samsung')}
                value="Samsung"
              />
            }
            label="Samsung"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.jason}
                onChange={this.handleChange('LG')}
                value="LG"
              />
            }
            label="LG"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.antoine}
                onChange={this.handleChange('Apple')}
                value="Apple"
              />
            }
            label="Apple"
          />
        </FormGroup>
        <Divider />
      </FormControl>
    );
  }
}

export default CheckboxesGroup;