import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';
import Layout from './layout';

describe('Networks page', () => {
  test('renders the layout with its children', () => {
    render(<Layout>{<div>children</div>}</Layout>);
    expect(screen.getByText(/children/i)).toBeInTheDocument();
  });

  test('renders the page with the title', () => {
    render(<Page />);
    expect(
      screen.getByRole('heading', { level: 1, name: /discover bike networks/i })
    ).toBeInTheDocument();
  });
});
