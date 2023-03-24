import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({onSubmit}) => {
  const [search, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      alert('Введить запрос');
      return;
    }
    onSubmit(search.trim());
  };

  const handleChange = event => {
    setSearch(event.currentTarget.value);
  };

  return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={search}
            onChange={handleChange}
          />
        </form>
      </header>
    );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
