import { useNavigate } from 'react-router-dom';
import Button from '../components/buttons/button';
import '../App.css';

const NotFound = ({ error }) => {
  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigate('/');
  };

  return (
    <div className='notfound'>
      <h2>404</h2>
      <h1>Page not found</h1>
      <h3>
        We're sorry, something went wrong. The page you requested could not be
        found.
      </h3>
      <p>{error}</p>
      <Button onClick={gotoHomePage}>Homepage</Button>
    </div>
  );
};

export default NotFound;
