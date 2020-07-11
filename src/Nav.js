import React from 'react';

function Nav(props) {
  return (
    <div>
      <p>
        You are on page {props.currentPage} out of {props.maxPage}.
      </p>
      <button 
        onClick={props.prevPage}
      >
        Previous
      </button>
      <button 
        onClick={props.nextPage}
      >
        Next
      </button>
    </div>
  );
}

export default Nav;