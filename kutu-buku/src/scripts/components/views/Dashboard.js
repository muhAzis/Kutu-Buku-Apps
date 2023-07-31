import '../../../styles/Dashboard.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import StatusBar from '../ui/StatusBar';
import BookCard from '../ui/BookCard';

function Dashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!document.cookie.includes('ref_token')) {
      return navigate('/login');
    }
    (async () => {
      try {
        const response = await axios.get('/books');
        console.log(response.data.payload);
        setBooks(response.data.payload);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // const bookList = () => {
  //   books.map((item, i) => {
  //     return <BookCard key={i} bookData={item} />;
  //   });
  // };

  return (
    <div className="container">
      <div className="sidebar-container">
        <Sidebar page="Dashboard" />
      </div>
      <div className="dashboard-container">
        {/* <StatusBar /> */}
        <div className="books-container">
          {books.map((item, i) => {
            return <BookCard key={i} bookData={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
