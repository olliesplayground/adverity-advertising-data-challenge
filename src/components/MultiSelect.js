import React from 'react';

import Select from 'react-select';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function MultiSelect(props) {
    const onChangeHandler = e => {
        props.onChangeHandler(e);
    };

    const theTooltip = props => {
        return props.tooltip ? (
        <OverlayTrigger
            placement="right"
            overlay={
            <Tooltip>
                {props.tooltipText}
            </Tooltip>
            }
        ><FontAwesomeIcon icon={faInfoCircle} /></OverlayTrigger>
        ) : '';
    };

    return (
        <div>
            <div>
                <span className="heading-inline">{props.name}</span>{' '}
                {theTooltip(props)}
            </div>
            <div>
                <Select
                    options={props.options} 
                    value={props.value} 
                    isMulti={true} 
                    onChange={onChangeHandler}
                />
            </div>
        </div>
    );
}

export default MultiSelect;