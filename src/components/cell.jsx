import { createRoot } from 'react-dom/client';

import React from 'react';

export default function Cell({ value, onClick }) {
  return (
    <button
      type='button'
      onClick={ onClick }
      className='cell'
      aria-label={ `cell ${ value }` }
    />
  );
}