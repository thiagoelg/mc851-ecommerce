import React, {Component} from "react"
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import Option from './Option'

class SelectWrapped extends Component {

    render() {
        const { classes, ...other } = this.props;

        return (
            <Select
                optionComponent={Option}
                noResultsText={<Typography>{'Nenhum resultado encontrado.'}</Typography>}
                arrowRenderer={arrowProps => {
                    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
                }}
                clearRenderer={() => <ClearIcon />}
                valueComponent={valueProps => {
                    const { value, children, onRemove } = valueProps;

                    const onDelete = event => {
                        event.preventDefault();
                        event.stopPropagation();
                        onRemove(value);
                    };

                    if (onRemove) {
                        return (
                            <Chip
                                tabIndex={-1}
                                label={children}
                                className={classes.chip}
                                deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
                                onDelete={onDelete}
                            />
                        );
                    }

                    return <div className="Select-value">{children}</div>;
                }}
                {...other}
            />
        );
    }
}

export default SelectWrapped;