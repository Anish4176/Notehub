import React from 'react'
import Noteitems from './Noteitems';
import { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const {showAlert}=props;
  const navigate= useNavigate();
  const notes = useContext(noteContext);
  const { state, fetchallnotes, editnote } = notes  //destructuring
  const [state1, setstate1] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  useEffect(() => {
    if(localStorage.getItem("token")){
      fetchallnotes();
    }
    else{
      navigate('/login');
    }
    
    // eslint-disable-next-line 
  }, [])
  const updatenote = (currentnote) => {
    ref.current.click();
    setstate1({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
   
  }
  const ref = useRef(null);
  const refclose = useRef(null);

  const onChange = (e) => {
    setstate1({ ...state1, [e.target.name]: e.target.value });
    // console.log(e.target.name,e.target.value);
  }
  const handleeditnote = (e) => {
    if (state1.etitle.length < 3 || state1.edescription.length < 5) {

      return;
    }
    e.preventDefault();
    refclose.current.click();
    editnote(state1.id, state1.etitle, state1.edescription, state1.etag);
    props.showAlert("Updated successfully","success")
  }
  return (
    <>

      <button type="button" ref={ref} hidden className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

       {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update your Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body "style={{backgroundColor:"rgb(111, 188, 205)"}}>

              {/* form  */}
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label"  >Title</label>
                  <input type="text" className="form-control" id="title" value={state1.etitle} name="etitle" onChange={onChange} aria-describedby="emailHelp" minLength={3} required />

                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Description</label>
                  <input type="text" className="form-control" onChange={onChange} name="edescription" value={state1.edescription} id="Description" minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label" >Tag</label>
                  <input type="text" className="form-control" value={state1.etag} onChange={onChange} name="etag" id="tag" />
                </div>
                <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" onClick={handleeditnote} className="btn btn-primary">Update</button>
            </div>
              </form>
            </div>            
          </div>
        </div>
      </div>
      
      <div className="row " style={{ marginBottom: "3rem" }}>
        {state.map((note) => {
          return <Noteitems key={note._id} updatenote={updatenote} note={note} showAlert={showAlert} />
        })}
      </div>
    </>
  )
}

export default Notes