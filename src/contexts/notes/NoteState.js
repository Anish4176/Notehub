import { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {
  // const s1={
  //    "name":"Anish",
  //    "branch":"Computer Engineering"
  // }
  // const s2={
  //    "name":"Bhandari",
  //    "branch":"Mechanical Engineering"
  // }
  // const [state, setstate] = useState(s1)
  // const update=()=>{
  //    setInterval(() => {
  //       setstate(s2)/api/notes/fetchnotes
  //    }, 3000);
  // }

  const host = 'http://localhost:5000';
  const stateinitails = [];
  const [state, setstate] = useState(stateinitails)


  //FETCHING ALL NOTES
  const fetchallnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

    });
    const response1 = await response.json(); // parses JSON response into native JavaScript objects
    // console.log('infetch')
    setstate(response1);
    // console.log('infetchafter')
  }



  //ADDING A NOTE
  const addnote = async (title, description, tag) => {
    // console.log('hi' + title, description, tag);
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url    
    });
    const json = await response.json();
    // console.log('thisadd' + json._id);
    fetchallnotes();
    // console.log('thisaddafter')
    // const note = {
    //   "_id": "645f7177ef47ffdf4ff43e180e0",
    //   "user": "645f5ab3abbaccd3e0698f42",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-05-13T11:15:56.212Z",
    //   "__v": 0
    // }
    // setstate(state.concat({"title": title, "description": description, "tag": tag,"id":json._id}))
  }
  const deletenote = async (id) => {
    // console.log('delete button has been clicked')
    // console.log(id)
    await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url    
    });


    const newnote = state.filter((element) => { return element._id !== id; })
    setstate(newnote);
  }

  const editnote = async (id, title, description, tag) => {
    // console.log("Edit note" + id + " " + title + " " + description + " " + tag);
    await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url    
    });

    fetchallnotes();
    // for (let index = 0; index < state.length; index++) {
    //   const element = state[index];
    //   if(element._id === id){
    //      element.title=title;
    //      element.description=description;
    //      element.tag=tag;

    //   }

 
}
return (
  //  <noteContext.Provider value={{state:state,dupdate:update}}>
  <noteContext.Provider value={{ state, addnote, deletenote, editnote, fetchallnotes }}>
    {props.children}
  </noteContext.Provider>
)
}

export default NoteState;