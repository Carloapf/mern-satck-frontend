import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Navigation } from './components/Navigation';
import  NoteList  from './components/NoteList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <div className="container p-4">
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/edit/:id" element={<CreateNote />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/user" element={<CreateUser />} />
          Hello Wolrd
        </Routes>
      </div>



    </BrowserRouter>
  );
}

export default App;
