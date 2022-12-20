import PropTypes from 'prop-types';
import { useState } from 'react';

import {
  SearchbarStyled,
  SearchButton,
  SearchButtonLabel,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [formInput, setFormInput] = useState('');

  const handleFormInput = event => {
    setFormInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(formInput);
  };

  return (
    <SearchbarStyled>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchInput
          type="text"
          autocomplete="off"
          name="name"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleFormInput}
        />
      </SearchForm>
    </SearchbarStyled>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
