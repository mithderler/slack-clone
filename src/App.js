import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { useStateValue } from './context/auth-context';
import './App.css';

function App() {
  const [{ user }] = useStateValue();

  return (
    // BEM naming convention
    <div className='App'>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <div className='app__body'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<h1>Welcome</h1>} />
              <Route path='/room/:roomId' element={<Chat />} />
              <Route path='*' element={<h1>Page not found</h1>} />
            </Routes>

            {/* React-Router -> Chat screen */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
