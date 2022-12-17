import PropTypes from 'prop-types';
import { Component } from 'react';

import {
  SearchbarStyled,
  SearchButton,
  SearchButtonLabel,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    formInput: '',
  };

  handleFormInput = event => {
    this.setState(() => {
      return { formInput: event.target.value };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const newSearch = this.state.formInput;
    this.props.onSubmit(newSearch);
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>

          <SearchInput
            type="text"
            autocomplete="off"
            name="name"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleFormInput}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
