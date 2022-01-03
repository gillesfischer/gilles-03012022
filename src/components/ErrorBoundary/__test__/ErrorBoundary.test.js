import { render, screen } from '@testing-library/react';
import { Component, useEffect } from 'react';
import ErrorBoundary from '../ErrorBoundary';

import React from 'react';

function ComponentWithError() {
  useEffect(() => {
    throw new Error();
  }, []);
  return <div>something</div>;
}

describe('ErrorBoundary', () => {
  it('Should display its children correctly when no error', () => {
    render(
      <ErrorBoundary>
        <h1>Hello</h1>
      </ErrorBoundary>
    );

    const resultEl = screen.getByText(/Hello/i);
    expect(resultEl).toBeInTheDocument();
  });

  it('Should display error message when an error occurs', () => {
    render(
      <ErrorBoundary key={'unique'}>
        <ComponentWithError />
      </ErrorBoundary>
    );
    const resultEl = screen.getByText(/Oops something went wrong!/i);
    expect(resultEl).toBeInTheDocument();
  });
});
