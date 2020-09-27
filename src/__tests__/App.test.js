import React from 'react';
import { render } from '@testing-library/react';
import AppComponent from '../components/AppComponent';

test('renders welcome text', () => {
  const { getByText } = render(<AppComponent />);
  const linkElement = getByText(/React x Next.js/i);
  expect(linkElement).toBeInTheDocument();
});
