import React from 'react';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'


function PrimaryButton(props) {
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
            <Button 
                variant="primary" 
                onClick={props.onClickHandler}
            >{props.text}</Button>{' '}{theTooltip(props)}
        </div>
    );
}

export default PrimaryButton;