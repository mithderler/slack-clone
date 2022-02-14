import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import './Backdrop.css';

const Backdrop = (props) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(uiActions.hideSidebar());
  };

  return (
    <div>
      <div className='backdrop' onClick={closeModal}>
        {props.children}
      </div>
    </div>
  );
};

export default Backdrop;
