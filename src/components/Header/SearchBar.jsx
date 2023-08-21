import React, { useState, useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import styled from 'styled-components';
import apis from '../../services/apis';
import { useNavigate } from 'react-router-dom';


export default function UserSearch({token}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.length >= 3) {
      apis.searchUsers(searchQuery, token)
        .then((response) => {
          setSearchResults(response);
        })
        .catch((error) => {
          console.error('Error searching users:', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, token]);

  const handleSearchInputChange = (value) => {
    setSearchQuery(value);
    setShowSuggestions(value.length >= 3);
  };

  const handleSuggestionClick = (username) => {
    setSearchQuery(username);
    setShowSuggestions(false);
  };

  const handleSearchIconClick = () => {
    if (searchQuery) {
      const user = searchResults.find((user) => user.username === searchQuery);
      if (user) {
        navigate(`/user/${user.id}`); // Redirect to user's page using their ID
      }
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        minLength={3}
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => handleSearchInputChange(e.target.value)}
      />
      <SearchIcon onClick={handleSearchIconClick}>🔍</SearchIcon>
      {showSuggestions && (
        <SuggestionsContainer>
          {searchResults.map((user) => (
            <Suggestion key={user.id} onClick={() => handleSuggestionClick(user.username)}>
              <SuggestionImage src={user.profile_image} />
              <SuggestionUsername>{user.username}</SuggestionUsername>
            </Suggestion>
          ))}
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
}

const SearchInput = styled(DebounceInput)`

 @media screen and (min-width: 768px) {

   width: 563px;
   height: 35px;
   padding: 8px;
   border: none;
   border-radius: 20px;
   background-color: #f5f5f5;
   outline: none;
 }
`;

const SearchContainer = styled.div`
@media screen and (max-width: 767px) {
    display: none; /* Hide the SearchBar on smaller screens */
  }

@media screen and (min-width: 768px) {
  display: block;
  margin-top: 20px;
  position: relative;
}
`;

const SearchIcon = styled.span`

@media screen and (min-width: 768px) {

  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}
`;

const SuggestionsContainer = styled.div`
@media screen and (min-width: 768px) {

  position: absolute;
  top: 35.5px;
  left: 15px;
  right: 0;
  background-color: #EFEFEF;
  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: auto;
  width: 525px;
}
`;

const Suggestion = styled.div`
@media screen and (min-width: 768px) {

  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
}
`;

const SuggestionImage = styled.img`
@media screen and (min-width: 768px) {
  
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
`

const SuggestionUsername = styled.div`
@media screen and (min-width: 768px) {
  font-weight: bold;
  }
`;


