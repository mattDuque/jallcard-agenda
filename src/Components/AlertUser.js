import React from 'react'
import { Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function AlertUser(props) {
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setOpen(false);
        }, 2000);
    }, [open])

    return (
        <Collapse in={open} style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            <Alert severity={props.severity}>
                {props.data?.statusText}
            </Alert>
        </Collapse>

    )
}

export default AlertUser