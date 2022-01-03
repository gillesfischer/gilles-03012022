import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('Should contain h1 element', () => {
    const name = 'orderbook';
    render(<Header title={name} />);

    const title = screen.getByText('orderbook');
    expect(title).toContainHTML('h1');
  });

  it('Should render component correctly', () => {
    const name = 'orderbook';
    render(<Header title={name} />);

    const title = screen.getByText('orderbook');
    expect(title).toBeInTheDocument();
  });
});
