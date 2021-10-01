import React from 'react'
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';


const HeaderOption = ({ title, Icon }) => {
    return (
        <div className={`${title}` === 'Google Apps' ? "google" : ''}>
            <IconButton>
                <Tooltip title={title}>
                    <Icon />

                </Tooltip>
            </IconButton>
        </div>
    )
}

export default HeaderOption
