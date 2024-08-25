import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormAdd from './components/FormAdd';
import Header from './components/Header';
import EditForm from './components/EditForm';
import IndexTrade from './components/IndexTrade';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<IndexTrade />} />
        <Route path="/index" element={<IndexTrade />} />
        <Route path="/add" element={<FormAdd />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;