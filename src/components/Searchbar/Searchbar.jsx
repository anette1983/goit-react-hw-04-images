import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';
import * as Css from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleQueryChange = event => {
    const target = event.target.value.toLowerCase();
    console.log('target :>> ', target);

    setSearchQuery(target);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      alert('Fill in search query');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <Css.StyledSearchbar>
      <Css.StyledForm onSubmit={handleSubmit}>
        <Css.SearchButton type="submit">
          <span>
            <BiSearch />
          </span>

          {/* <span>
              <BiSearch width="15" height="15"/>
            </span> */}
        </Css.SearchButton>

        <input
          onChange={handleQueryChange}
          type="text"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Css.StyledForm>
    </Css.StyledSearchbar>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
