import { render, screen } from '@testing-library/react';
import { OrderBookProvider } from '../OrderBookContext';

describe('OrderBookContext', () => {
  it('Should display its children correctly', () => {
    render(
      <OrderBookProvider>
        <h1>Hello</h1>
      </OrderBookProvider>
    );

    const resultEl = screen.getByText(/Hello/i);
    expect(resultEl).toBeInTheDocument();
  });
});
