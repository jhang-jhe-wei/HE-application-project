import React from 'react';
import { mountToWindow } from '../helpers/helper';

const Example = ({ value }) => {
  return (
    <p>{value}</p>
  )
}

mountToWindow(Example, 'Example');
