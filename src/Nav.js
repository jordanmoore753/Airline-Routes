import React from 'react';

function Nav(props) {
  return (
    <div>
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