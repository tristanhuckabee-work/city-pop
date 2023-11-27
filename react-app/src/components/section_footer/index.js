import React from 'react';
import './footer.css'

function MyFooter({parent}) {
  return (
    <footer className={parent}>
      <p>Tristan Huckabee 2023</p>
      <span>
        <a href='https://github.com/tristanhuckabee-work' target='_blank'>Github</a>
        <a href='https://www.linkedin.com/in/tristan-huckabee/' target='_blank'>LinkedIn</a>
        <a href='http://tristan-huckabee.com/' target='_blank'>Portfolio</a>
      </span>
    </footer>
  )
}

export default MyFooter;
