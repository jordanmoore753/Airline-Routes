import React from 'react';

function generateLowAndHighPages(max, page) {
  let lo = 1;

  for (let i = 1; i < page; i += 1) {
    lo += 25;
  }

  let hi = max < 26 ? max : lo + 25;

  if (page !== 1) {
    hi -= 1;
  }

  return [lo, hi].join('-');
}

function Nav(props) {
  const indices = generateLowAndHighPages(props.maxPage, props.currentPage);

  return (
    <div>
      <p>
        You are on page {indices} out of {props.maxPage}.
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