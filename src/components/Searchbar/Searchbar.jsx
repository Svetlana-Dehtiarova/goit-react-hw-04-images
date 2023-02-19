import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from './search.svg';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.toLowerCase().trim() === '') {
      return Notify.warning('Пожалуйста введите запрос!');
    }

    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <SearchIcon width="20" height="20" />
          <span className={s.label}>Search</span>
        </button>
        <input
          className={s.input}
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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
