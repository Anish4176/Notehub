import React from 'react'
import Notes from './Notes';
import Addnote from './Addnote';
export default function Home(props) {
  const { showAlert } = props;
  return (
    <>
      <Addnote showAlert={showAlert} />
      <div className="container" style={{ backgroundColor: "rgb(101 187 206)" }}>
        <h1 style={{ "marginTop": "4rem" }} className='text-center'>Your Notes:</h1>
        <Notes showAlert={showAlert} />
      </div>
    </>
  )
}
