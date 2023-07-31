import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './scripts/components/views/Login';
import Signin from './scripts/components/views/Signin';
import Dashboard from './scripts/components/views/Dashboard';
import Profile from './scripts/components/views/Profile';
import AddBook from './scripts/components/views/AddBook';
import EditBook from './scripts/components/views/EditBook';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book" element={<EditBook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
