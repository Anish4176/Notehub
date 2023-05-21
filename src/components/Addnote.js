import React from 'react'
import { useContext, useState } from 'react'
import noteContext from '../contexts/notes/noteContext'

function Addnote(props) {
  const notes = useContext(noteContext);
  const { addnote } = notes  //destructuring
  const [state, setstate] = useState({ title: "", description: "", tag: "default" })


  const handleaddingnote = (e) => {
    if (state.title.length < 3 || state.description.length < 5) {
      return;
    }
    e.preventDefault();
    addnote(state.title, state.description, state.tag);
    props.showAlert("Note added successfully", "success");
  }


  const onChange = (e) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  }
  return (
    <div className="container " style={{ backgroundColor: "rgb(101 187 206)", marginTop: "6rem" }}>
      <h1 className='text-center'>Add a note...</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" > <strong>Title</strong> </label>
          <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="emailHelp" placeholder='At least add 3 Letters...' minLength={3} required />

        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" ><strong>Description</strong></label>
          <input type="text" className="form-control" onChange={onChange} name="description" id="Description" placeholder='At least add 5 Letters...' minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" > <strong>Tag</strong> </label>
          <input type="text" className="form-control" onChange={onChange} name="tag" id="tag" placeholder='Optional' />
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-secondary my-3" onClick={handleaddingnote}>Add Note</button>
        </div>
      </form>
    </div>
  )
}

export default Addnote