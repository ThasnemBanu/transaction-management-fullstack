import React, { createElement } from 'react';
import NewTransaction from '../NewTransaction';
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

it("renders NewTransaction form without any crashing", () => {
  const {getByTestId} = render(<NewTransaction />);
  expect(getByTestId('new-transaction-form'));
  expect(getByTestId('new-transaction-form')).toHaveClass('border rounded mt-3 p-3');
})

it("renders Account Id Label correctly", () => {
  const {getByTestId} = render(<NewTransaction />);
  expect(getByTestId('label-account-id')).toHaveTextContent('Account ID:')
})

it("renders Account Id Input Field correctly", () => {
  const {getByTestId} = render(<NewTransaction />);
  expect(getByTestId('input-account-id')).toHaveAttribute('placeholder','Enter Account ID')
})

it("renders button correctly",() =>{
  const {container} = render(<NewTransaction />);
  const button = container.querySelector('button')
  expect(button).toHaveAttribute('type','submit');
  expect(button).toHaveTextContent('Submit');
  expect(button).toHaveClass('btn btn-outline-primary');
})