import { HttpRequest } from './services/http-requests'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { Ibooks } from './interface/Ibooks'
import { useEffect, useState } from 'react'

function App() {
  const[books, setBooks] = useState<Ibooks[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<string>('desc');
  const [formState, setFormState] = useState<Ibooks>({
    id: '',
    title: '',
    author: '',
    year: 0,
    genre: '',
    pages: 0,
    available: true
  })
  const [editMode, setEditMode] = useState(false)

  function setValues(e: React.ChangeEvent<HTMLInputElement>, target: string) {
   
    setFormState({
      ...formState,
      [target]: target === 'available' ? e.target.checked : e.target.value
    })
  }

  async function postDatas(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
   await HttpRequest.postDatas(formState).then((data) => {
      console.log(data)
      fetchData();
    })
  }
  
  async function patchDatas(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()
    await HttpRequest.patchDatas(formState, id).then((data) => {
      console.log(data)
      fetchData();
      setEditMode(false);
      setFormState({
        id: '',
        title: '',
        author: '',
        year: 0,
        genre: '',
        pages: 0,
        available: false

      })
    })
  }

  function updateButtonClickEvent(id: string){
    
    HttpRequest.getDatasById(id).then((data) => {
      setFormState(data)
      setEditMode(true);

    })
  }


  useEffect(() => {
    fetchData()
  }, [currentPage,sortOrder,sortBy])

  function fetchData(){
    HttpRequest.getDatas(currentPage,5, sortBy, sortOrder).then((data) =>{
      setTotalPages(data.totalPages)
      setBooks(data.items)
    })
  }

  function deleteButtonClickEvent(id: string){

    HttpRequest.deleteDatas(id).then((data) => {
      console.log(data)
      fetchData();
    });
  }

  const goToNextPage = () => { 
      if (currentPage < totalPages) { 
      setCurrentPage(currentPage + 1); 
      } 
    }; 
  const goToPrevPage = () => { 
      if (currentPage > 1) { 
        setCurrentPage(currentPage - 1); 
      } 
    }; 

    
  return (
    <>  
        <div id="selectionAndPageChange">
          <div> 
            <button onClick={goToPrevPage} disabled={currentPage === 1}>Previous</button> 
            <span>Oldal: {currentPage} / {totalPages}</span> 
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>Next</button> 
          </div> 
          <br />
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value='title'>Title</option>
            <option value='author'>Author</option>
            <option value='year'>Year</option>
            <option value='genre'>Genre</option>
          </select>
          <select onChange={(e) => setSortOrder(e.target.value) }>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
        <div id='container'>
          <div  id='cards'>

          {books.map((book) => (
            <div >
              <div className="card" style={{ width: '18rem', height: '18rem' }}>
                <div className="card-header">
                  <h5 className="card-title">Title: {book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Author: {book.author}</h6>
                <div className='card-body'>
                  <p className="card-text">Year: {book.year}</p>
                  <p className="card-text">Genre: {book.genre}</p>
                  <p className='card-text'>Available: { book.available }</p>
                  <p className='card-text'>Pages: { book.pages }</p>
                </div>
                 
                <div >
                  <button className='btn btn-primary' onClick={() =>{updateButtonClickEvent(book.id)}} >Update</button>
                  <button className="btn btn-danger" onClick={() => deleteButtonClickEvent(book.id)}>Delete</button>
                </div>
                 
                </div>
              </div>
            </div>
                
              ))
            }
          </div>
        
        </div>
        <div className='container'>
          <form onSubmit={!editMode ? postDatas : (e) => patchDatas(e, formState.id)}>
            <div className='form-group'>
              <label htmlFor="title">Title</label>
              < input className='form-control' name='title' required value={formState.title || "" } type='text'  onChange={(e) => setValues(e, "title")}/>
            </div>
            <div className='form-group'>
              <label htmlFor="author" >Author</label>
              <input className='form-control' name='author' required value={formState.author || ""} type='text' onChange={(e) => setValues(e, "author")} />
            </div>
            <div className='form-group'>
              <label htmlFor="year">Year</label>
              <input className='form-control' name='year' required value={formState.year || ""} type='text' onChange={(e) => setValues(e,"year")} />
            </div>
            <div className='form-group'>
              <label htmlFor="genre">Genre</label>
              <input className='form-control' name='genre' required value={formState.genre || ""} type='text' onChange={(e) => setValues(e, "genre")} />
            </div>
            <div className='form-group'>
              <label htmlFor="pages">Pages</label>
              <input className='form-control' name='pages' required value={formState.pages || ""} type='numer' onChange={(e) => setValues(e, "pages")} />
            </div>
            <div className='form-group'>
              <input type="checkbox" className="form-check-input"   name='available'  onChange={(e) => setValues(e,"available")}/>
              <label className='form-check-label'>Available</label>
            </div>
            <button className='btn btn-success' type='submit'>{!editMode ? "Add" : "Change"}</button>

          </form>
        </div>
        
    </>
    
  )
}

export default App
