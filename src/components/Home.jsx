import React, { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../firebase';

const Home = () => {

    const [files, setFiles] = useState([])

    useEffect(() => {
        db.collection("myFiles").onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])


    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + '' + sizes[i]

    }

    return (
        <div className="home">
            <div className="home_header">
                <div className="home_headerLeft">
                    <p>My Drive</p>
                    <ArrowDropDownIcon />
                </div>

                <div className="home_headerRight">
                    <ListIcon />
                    <InfoOutlinedIcon />
                </div>
            </div>

            <div className="home_content">
                <div className="home_grid">

                    {files.map((file) => {
                        return <div key={new Date(file.data.timestamp?.seconds * 1000).toUTCString()}
                            className="home_file">
                            <InsertDriveFileIcon />
                            <p>{file.data.filename}</p>
                        </div>
                    })}




                </div>

                <div className="home_list">
                    <div className="detailsRow">
                        <p><b>Name <ArrowDownwardIcon /></b></p>
                        <p><b>Owner</b></p>
                        <p><b>Last Modified</b></p>
                        <p><b>File Size</b></p>

                    </div>


                    {
                        files.map((file) => {



                            return <div className="detailsRow" style={{ color: 'gray' }}>
                                <p><b>
                                    <a style={{ display: 'flex' }} href={file.data.fileURL} target="_blank" rel="noopener noreferrer">
                                        <InsertDriveFileIcon /> {file.data.filename}
                                    </a>
                                </b></p>
                                <p><b>Me</b></p>
                                <p><b>{new Date(file.data.timestamp?.seconds * 1000).toUTCString()}</b></p>
                                <p><b>{formatBytes(file.data.size)}</b></p>

                            </div>
                        })
                    }



                </div>

            </div>

        </div>
    )
}

export default Home
