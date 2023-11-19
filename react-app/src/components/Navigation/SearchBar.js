import React, { useState } from 'react';

function SearchBar() {
  const [searchVal, setSearchVal] = useState('');
  const [searchCat, setSearchCat] = useState('songs');

  const search = (e) => {
    e.preventDefault();

    if (searchCat === 'songs') {
      console.log('searching songs');
    }
    if (searchCat === 'playlists') {
      console.log('searching playlists');
    }

    if (searchCat === 'users') {
      console.log('searching users');
    }

    return;
  }

  return (
    <form
      id='search'
      onSubmit={search}
    >
      <select
        id='search-type'
        name='content'
        onChange={(e) => setSearchCat(e.target.value)}
        value={searchCat}
      >
        <option value='songs'>Songs</option>
        <option value='playlists'>Playlists</option>
        <option value='users'>Users</option>
      </select>
      <input
        type='text'
        placeholder='looking for something?'
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button type='submit'>
        <i className="fas fa-magnifying-glass fa-2x"></i>
      </button>
    </form>
  );
}

export default SearchBar;