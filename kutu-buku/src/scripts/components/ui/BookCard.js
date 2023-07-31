import axios from 'axios';
import '../../../styles/BookCard.css';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function BookCard({ bookData }) {
  const navigate = useNavigate();

  const { book_id, title, author, published, genres, readed } = bookData;

  const [bookTitle, setBookTitle] = useState(title);
  const [bookAuthor, setBookAuthor] = useState(author);
  const [bookPublished, setBookPublished] = useState(published);
  const [bookGenres, setBookGenres] = useState(genres);
  const [bookReaded, setBookReaded] = useState(readed);

  const toggleRead = async () => {
    try {
      setBookReaded(!bookReaded);
      await axios.post('/update', { ...bookData, readed: !bookReaded });
    } catch (error) {
      console.log(error);
    }
  };

  const editBook = () => {
    const data = bookData;
    navigate.push('/edit-book', data);
  };

  const deleteBook = async () => {
    try {
      await axios.post('/delete', { book_id });
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="book-container">
      <div className="book-main-data">
        <div className="book-logo">
          <i className={bookReaded ? 'uil uil-file-check-alt' : 'uil uil-file-alt'}></i>
        </div>
        <div className="book-data-col1">
          <h2 className="book-title">{bookTitle}</h2>
          <h4 className="book-id">{'ID: ' + book_id}</h4>
          <p className="book-status">
            Status: <span>{bookReaded ? 'Readed' : 'Unreaded'}</span>
          </p>
        </div>
        <div className="book-data-col2">
          <h4 className="book-author">{bookAuthor}</h4>
          <h5 className="book-published">{bookPublished}</h5>
          <p className="book-genre">{bookGenres.join(', ')}</p>
        </div>
        <div className="book-main-action">
          <Link to="/edit-book" state={bookData} className="edit-btn edit-btn uil uil-edit"></Link>
          <i className={bookReaded ? 'toggle-read-btn uil uil-book-open' : 'toggle-read-btn uil uil-book'} onClick={() => toggleRead()}></i>
          <i className="delete-btn uil uil-trash-alt" onClick={() => deleteBook()}></i>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
