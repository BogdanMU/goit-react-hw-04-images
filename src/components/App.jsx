import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';

import { GalleryList } from './GalleryList/GalleryList';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchQueryUpdate = newValue => {
    setSearchQuery(newValue);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Searchbar onSubmit={searchQueryUpdate} />
      <GalleryList searchValue={searchQuery} />
    </div>
  );
};
