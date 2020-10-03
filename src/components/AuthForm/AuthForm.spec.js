import React from 'react';
import { render } from '@testing-library/react';
import AuthForm from '.';

describe('components/AuthForm', () => {
  it('should render with provided title', () => {
    const title = 'Login Form';
    const { getByText } = render(<AuthForm title={title} />);

    const heading = getByText(title);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveStyle('text-align: center');
  });
});
