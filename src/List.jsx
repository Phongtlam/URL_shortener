import React from 'react';
import propTypes from 'prop-types';

const List = (props) => {
  const baseUrl = (process.env.NODE_ENV === 'development') ? process.env.REACT_APP_URL : process.env.REACT_APP_PROD_URL;
  return (
    <div>
      <div>New URL:<a href={`${baseUrl}/${props.entry.shorten}`}>
        {baseUrl}/{props.entry.shorten}</a></div>
      <div>Original: {props.entry.orig}</div>
      <br />
    </div>
  );
};

export default List;

List.propTypes = {
  entry: propTypes.obj,
};

List.defaultProps = {
  entry: {},
};
