import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'timeago.js'
import Swal from 'sweetalert2';

export default class NoteList extends Component {

  state = {
    notes: []
  }

  async componentDidMount() {
    this.getNotes();
  }

  async getNotes() {
    const res = await axios.get('https://mern-stack-carlo-be.onrender.com/api/notes')
    this.setState({ notes: res.data })
  }

  deleteNote = async (id) => {
    const willDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'No, cancela'
    })
    if (willDelete.isConfirmed) {
      await axios.delete('https://mern-stack-carlo-be.onrender.com/api/notes/' + id);
      this.getNotes();
      Swal.fire(
        '¡Eliminado!',
        'Tu archivo ha sido eliminado.',
        'success'
      )
    }
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
            <div className='col.md-4 p-2' key={note._id}>
              <div className='card'>
                <div className="card-header d-flex justify-content-between">
                  <h5>{note.title}</h5>
                  <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                    Edit
                  </Link>

                </div>
                <div className='card-body'>
                  <p>{note.content}</p>
                  <p>{note.author}</p>
                  <p>{format(note.date)}</p>
                </div>
                <div className="card-footer">
                  <button className='btn btn-danger' onClick={() => this.deleteNote(note._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
