import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ nextPage }) => {
  return (
    <button className={s.Button} type="button" onClick={nextPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};

export default Button;
