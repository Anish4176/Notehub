import React from 'react'
import { useContext } from 'react'
import noteContext from '../contexts/notes/noteContext'

function Noteitems(props) {
    const notes = useContext(noteContext);
    const { deletenote } = notes;

    const { note, updatenote } = props;
    return (
        <>

            <div className="card  mx-auto my-3" >
                <div className="card-body">

                    <h5 className="card-title"> {note.title}</h5>
                    <p className="card-text">{note.description}

                    </p>
                    <div className="d-flex justify-content-between ">
                        <i className="fa-solid fa-pen-to-square" onClick={() => { updatenote(note) }}></i>
                        <i className="fa-sharp fa-solid fa-trash" style={{ color: "#05090f" }} onClick={() => { deletenote(note._id); props.showAlert("Deleted successfully", "success") }} ></i>
                    </div>


                </div>
            </div>



        </>
    )
}

export default Noteitems