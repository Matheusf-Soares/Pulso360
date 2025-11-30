import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login screen', () => {
  render(<App />);
  expect(screen.getByText(/Pulso360/i)).toBeInTheDocument();
  expect(screen.getByText(/Gestão de Pessoas/i)).toBeInTheDocument();
});
