import React from 'react';


const List = (props) => {
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_URL : process.env.REACT_APP_DEV_URL;
  return (
    <div>
      <div>New URL:<a href={`${baseUrl}/${props.entry.shorten}`}>
        {baseUrl}/${props.entry.shorten}</a></div>
      <div>Original: {props.entry.orig}</div>
      <br />
    </div>
  );
};

export default List;
