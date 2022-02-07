import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    // BEM naming convention
    <div className='App'>
      <Header />
      <div className='app__body'>
        <Sidebar />
        {/* React-Router -> Chat screen */}
      </div>
    </div>
  );
}

export default App;
