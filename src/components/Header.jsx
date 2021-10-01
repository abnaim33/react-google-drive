import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import OfflinePinOutlinedIcon from '@mui/icons-material/OfflinePinOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Avatar from '@mui/material/Avatar';
import { IconButton, Tooltip } from '@mui/material';
import HeaderOption from './HeaderOption';

const Header = ({ profile }) => {
    const OptionData = [
        {
            title: 'Ready for offline',
            Icon: OfflinePinOutlinedIcon
        }, {
            title: 'Supports',
            Icon: HelpOutlineOutlinedIcon
        }, {
            title: 'Settings',
            Icon: SettingsOutlinedIcon
        }, {
            title: 'Google Apps',
            Icon: AppsIcon
        },

    ]


    return (
        <div className="header">
            <div className="header_logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/1147px-Google_Drive_icon_%282020%29.svg.png" alt="" />
                <h2>Drive</h2>
            </div>

            <div className="header_search">
                <IconButton>
                    <SearchIcon />

                </IconButton>
                <input type="text" placeholder="Search in Drive" />

                <IconButton>
                    <AppsIcon />

                </IconButton>

            </div>

            <div className="header_options">
                {
                    OptionData.map(option => (<HeaderOption key={option.title} title={option.title} Icon={option.Icon} />))
                }
                <div>
                    <IconButton>
                        <Tooltip title={profile}>
                            <Avatar src={profile} />
                        </Tooltip>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Header
