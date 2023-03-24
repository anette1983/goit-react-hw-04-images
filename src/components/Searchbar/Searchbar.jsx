import { Component } from 'react';
import PropTypes from 'prop-types';
import {BiSearch} from 'react-icons/bi'
import * as Css from './Searchbar.styled'

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    
  };

  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    const target = event.target.value.toLowerCase();
    console.log('target :>> ', target);
    this.setState(prevState => ({
      ...prevState,
      searchQuery: target,
    }));
    
  };


  handleSubmit = event => {
    event.preventDefault();
    if(this.state.searchQuery.trim()==='') {
      alert('Fill in search query');
      return;
    }
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

 
  render() {
    return (
      <Css.StyledSearchbar>
        <Css.StyledForm onSubmit={this.handleSubmit}>
          <Css.SearchButton type="submit">
            {/* <span>Search</span>  */}
            <span><BiSearch/></span> 
           
            {/* <span>
              <BiSearch width="15" height="15"/>
            </span> */}

          </Css.SearchButton>

          <input onChange={this.handleQueryChange}
            type="text"
            value={this.state.searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Css.StyledForm>
      </Css.StyledSearchbar>
    );
  }
}

export default Searchbar;
