import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SidebarOption from './SidebarOption';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal, Typography } from '@mui/material';
import { db, storage } from '.././firebase'
import firebase from 'firebase'


const Sidebar = () => {
    const sidebarOptionData = [
        {
            Icon: InsertDriveFileIcon,
            text: 'My Drive'
        },
        {
            Icon: ImportantDevicesIcon,
            text: 'Computers'
        },
        {
            Icon: GroupIcon,
            text: 'Shared with me'
        },
        {
            Icon: AccessTimeIcon,
            text: 'Recent'
        },
        {
            Icon: StarBorderIcon,
            text: 'Starred'
        }, {
            Icon: DeleteOutlineIcon,
            text: 'Trash'
        }
    ]


    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState(null)
    const [open, setOpen] = useState(false)
    const handleclose = () => {
        setOpen(false)
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }
    const handleUpload = (e) => {
        e.preventDefault()
        setUploading(true)

        storage.ref(`files/${file.name}`).put(file)
            .then(snapshot => {
                storage.ref("files").child(file.name).getDownloadURL().then(url => {
                    db.collection("myFiles").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        filename: file.name,
                        fileURL: url,
                        size: snapshot._delegate.bytesTransferred
                    })

                    setUploading(false)
                    setFile(null)
                    setOpen(false)

                })
            })
    }

    return (
        <>

            <Modal
                open={open}
                onClose={handleclose} className="modal">
                <div className="modal_container">

                    <div className="modalHeading">
                        <h3>Select the file you want to upload</h3>
                    </div>

                    <div className="modal_body">
                        {
                            uploading ? (<p className="uploading">Uploading</p>) : (<>
                                <div>
                                    <input type="file" name="" id="" onChange={handleChange} />
                                </div>
                                <div>
                                    <input type="submit" value="Submit" className="submit_btn" onClick={handleUpload} />
                                </div> </>
                            )
                        }

                    </div>
                </div>
            </Modal>

            <div className="sidebar">


                <div className="sidebar_btn">
                    <button onClick={() => setOpen(true)}>
                        <AddIcon />

                        <h3>New</h3>
                    </button>
                </div>

                <div className="sidebar_options">

                    {
                        sidebarOptionData.map(data => (
                            <SidebarOption key={data.text} Icon={data.Icon} text={data.text} />

                        ))
                    }

                </div>


                <div className="sidebar_bottom">
                    <hr />
                    <div className="storage">
                        <CloudQueueIcon />
                        <p>Storage</p>
                    </div>
                    <div className="usedStorage">
                        <p>
                            1GB of 15GB used

                        </p>
                    </div>

                    <button>
                        Buy storage
                    </button>
                </div>

            </div>
        </>
    )
}

export default Sidebar
