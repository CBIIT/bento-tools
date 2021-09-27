import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('Should render header component correctly.', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
