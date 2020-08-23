import React from 'react';
import { render } from '@testing-library/react';
import { RaspberryPacman } from './index';

test('renders learn react link', () => {
  const { getByText } = render(<RaspberryPacman />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
