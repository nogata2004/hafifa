import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import LogInPage from './pages/logInPage/logInPage';
import MainPage from './pages/mainPage/mainPage';

const App: React.FC = () => {
  const [count, setCount] = useState(0) //unused

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogInPage />}></Route>
        <Route path='/spoofy' element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
};
export default App;
