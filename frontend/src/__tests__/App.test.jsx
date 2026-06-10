import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Frontend smoke test', () => {
  it('renders the test component successfully', () => {
    render(<div>OBITO STORE front-end smoke test</div>);
    expect(screen.getByText(/OBITO STORE front-end smoke test/i)).toBeTruthy();
  });
});
