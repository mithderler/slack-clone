import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import '../App.css';

const NotFound = ({ error }) => {
  const navigate = useNavigate();

  const gotoHomePage = () => {
    navigate('/');
  };

  return (
    <div className='not-found'>
      <h2 className='not-found__code'>404</h2>
      <h1 className='not-found__title'>Page not found</h1>
      <h3 className='not-found__description'>
        We're sorry, the page you requested could not be found.
        <div>{error}</div>
      </h3>
      <Button variant='outlined' onClick={gotoHomePage}>
        Homepage
      </Button>
    </div>
  );
};

export default NotFound;
