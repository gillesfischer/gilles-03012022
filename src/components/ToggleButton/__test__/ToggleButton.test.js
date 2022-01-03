import { render, screen } from '@testing-library/react';

import ToggleButton from '../ToggleButton';

describe('ToggleButton', () => {
  it('Should contain a button', () => {
    const title = 'press here';
    render(<ToggleButton title={title} />);

    const resultEl = screen.getByText(/press here/i);
    expect(resultEl).toContainHTML('button');
  });

  it('Should render component correctly', () => {
    const title = 'press here';
    render(<ToggleButton title={title} />);

    const resultEl = screen.getByText(/press here/i);
    expect(resultEl).toBeInTheDocument();
  });
});
