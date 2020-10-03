import React from 'react';
import { render } from '@testing-library/react';
import MedalCard from '.';

describe('components/MedalCard', () => {
  it('should render with provided args', () => {
    const title = 'tester';
    const text = 'lorem ipsum';
    const type = 'qa';

    const { getByText } = render(
      <MedalCard title={title} text={text} type={type} />
    );

    const renderedTitle = getByText(title);
    const renderedText = getByText(text);
    const renderedType = getByText(type);

    expect(renderedTitle).toBeInTheDocument();
    expect(renderedText).toBeInTheDocument();
    expect(renderedType).toBeInTheDocument();
  });
});
