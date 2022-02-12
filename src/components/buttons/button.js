import classes from './button.module.css';

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={classes.button}>
      {props.children}
    </button>
  );
};

export default Button;
