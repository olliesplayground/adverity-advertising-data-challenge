import React from 'react';

function HeaderText(props) {
    return (
        <div className="App-header">
            {props.text}
        </div>
    );
}

export default HeaderText;