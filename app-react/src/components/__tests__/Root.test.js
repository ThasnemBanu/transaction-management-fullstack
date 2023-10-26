import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../Root';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

it("renders Root without any crashing", () => {
  const {getByTestId} = render(<Root />);
  expect(getByTestId('stack'))
})