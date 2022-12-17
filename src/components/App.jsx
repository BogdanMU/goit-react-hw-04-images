import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import { GalleryList } from './GalleryList/GalleryList';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  searchQueryUpdate = newValue => {
    this.setState({ searchQuery: newValue });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Searchbar onSubmit={this.searchQueryUpdate} />
        <GalleryList searchValue={this.state.searchQuery} />
      </div>
    );
  }
}
