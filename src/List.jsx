import React from 'react';

const List = props => (
  <div>
    <div>New URL:<a href={`${process.env.REACT_APP_URL}/${props.entry.shorten}`}>
      {process.env.REACT_APP_URL}/${props.entry.shorten}</a></div>
    <div>Original: {props.entry.orig}</div>
    <br />
  </div>
);

export default List;
