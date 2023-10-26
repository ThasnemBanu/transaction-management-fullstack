import React from 'react';
import App from './App'

import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

it('renders app without any crashing', () => {
  const {getByTestId} = render(<App />);
  expect(getByTestId('root'))
});
