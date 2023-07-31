import '../../../styles/AddBook.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import axios from 'axios';

function EditBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { book_id, title, author, published, genres, readed } = data;

  const [bookTitle, setTitle] = useState(title);
  const [bookAuthor, setAuthor] = useState(author);
  const [bookPublished, setPublished] = useState(published);
  const [bookGenres, setBookGenres] = useState(genres);
  const [bookReaded, setReaded] = useState(readed);
  const [loading, setLoading] = useState(false);

  const genresList = ['Action', 'Adventure', 'Classics', 'Comic', 'Novel', 'Detective', 'Mystery', 'Fantasy', 'Historical', 'Horror', 'Literary', 'Romance', 'Sci-fi', 'Short Story', 'Suspense', 'Thriller'];
  const currentGenres = [...bookGenres];

  const genreHandle = (e) => {
    const value = e.target.innerText;
    if (bookGenres.includes(value)) {
      currentGenres.splice(currentGenres.indexOf(value), 1);
      setBookGenres([...currentGenres].sort());
      return;
    }

    currentGenres.push(value);
    setBookGenres([...currentGenres].sort());
  };

  const saveBook = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = {
        book_id,
        title: bookTitle,
        author: bookAuthor,
        published: bookPublished,
        genres: bookGenres,
        readed: bookReaded,
      };

      const response = await axios.post('/update', data);
      setLoading(false);
      setTitle('');
      setAuthor('');
      setPublished('');
      setBookGenres([]);
      setReaded(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addbook-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="addbook-content">
        <h1 className="page-title">Add New Book</h1>
        <form id="addbookForm" onSubmit={(e) => saveBook(e)}>
          <h3 className="addbook-title">
            Book Title<span>*</span>
          </h3>
          <input type="text" placeholder="input book's title..." value={bookTitle} onChange={(e) => setTitle(e.target.value)} required />
          <h3 className="addbook-author">
            Author/writer<span>*</span>
          </h3>
          <input type="text" placeholder="input author/writer's name..." value={bookAuthor} onChange={(e) => setAuthor(e.target.value)} required />
          <h3 className="addbook-published">
            Publish Date<span>*</span>
          </h3>
          <input type="date" placeholder="mm/dd/yy" value={bookPublished} onChange={(e) => setPublished(e.target.value)} required />
          <div className="addbook-genres">
            <h3 className="addbook-genres-title">Book Genre(s)</h3>
            <div className="genres">
              {genresList.map((item, i) => {
                return (
                  <p key={item + i} className={bookGenres.includes(item) ? 'genre checked' : 'genre'} onClick={(e) => genreHandle(e)}>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked={bookReaded} onClick={(e) => setReaded(e.target.checked)} />
            <h3 className="book-state">Mark as readed</h3>
          </div>
          <p>Make sure to input the data correctly so you won't have to edit it in the future. But of course you can edit it anytime you want, it's just wasting time.</p>
          <button id="saveBookBtn" type="submit">
            <div className="loading" hidden={!loading} />
            Save Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
