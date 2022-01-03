import { render, screen } from '@testing-library/react';

import Spread from '../Spread';

describe('Spread', () => {
  it('Should contain h2 element', () => {
    const spread = 10;
    const percentage = 0.1;
    render(<Spread spread={spread} percentage={percentage} />);

    const resultEl = screen.getByText('Spread 10.0 (0.10%)');
    expect(resultEl).toContainHTML('h2');
  });

  it('Should render component correctly', () => {
    const spread = 10;
    const percentage = 0.1;
    render(<Spread spread={spread} percentage={percentage} />);

    const resultEl = screen.getByText('Spread 10.0 (0.10%)');
    expect(resultEl).toBeInTheDocument();
  });
});
