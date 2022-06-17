import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

// Toaster notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.info('Please enter category name');
    }

    onSubmit(searchQuery);

    setSearchQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.searchForm} onSubmit={handleSubmit}>
        <input
          value={searchQuery}
          onChange={handleChange}
          className={s.searchFormInput}
          type="text"
          placeholder="Search images and photos"
        />
        <button type="submit" className={s.searchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
