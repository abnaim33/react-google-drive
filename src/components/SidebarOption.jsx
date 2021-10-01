import React from 'react'

const SidebarOption = ({ Icon, text }) => {
    return (
        <div>
            <Icon />

            <h5>{text}</h5>
        </div>
    )
}

export default SidebarOption
