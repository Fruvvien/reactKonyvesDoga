import { HttpRequest } from './services/http-requests'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Ibooks } from './interface/Ibooks'
import { useEffect, useState } from 'react'

function App() {
  const[books, setBooks] = useState<Ibooks[]>([]);

  useEffect(() => {
    HttpRequest.getDatas().then((data) =>{
      setBooks(data)
    })
  }, [])


  return (
    <>
    <div className="container">
      <div  id='cards'>

      {books.map((book) => (
        <div >
          <div className="card " style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">Title: {book.title}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Author: {book.author}</h6>
              <p className="card-text">Year: {book.year}</p>
              <p className="card-text">Genre: {book.genre}</p>
              <p className='card-text'>Available: { book.available.}</p>
              <button className='btn btn-primary' >Update</button>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
            
          ))
        }
      </div>
     
    </div>
       
    </>
    
  )
}

export default App
