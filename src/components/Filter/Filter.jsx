import React from 'react';
import PropTypes from 'prop-types';
import { Input } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';

const Filter = ({ filter }) => {
  const dispatch = useDispatch();
  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Filter;
