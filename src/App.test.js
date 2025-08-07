import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Trio Lê Gia Mao Trung title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Trio Lê Gia Mao Trung/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders tab navigation', () => {
  render(<App />);
  const spinTab = screen.getAllByText(/Quay Số/i)[0]; // Get first match (tab)
  const inputTab = screen.getByText(/Nhập Dữ Liệu/i);
  expect(spinTab).toBeInTheDocument();
  expect(inputTab).toBeInTheDocument();
});

test('renders spin button', () => {
  render(<App />);
  // The spin button has emoji, so we look for the full text
  const spinButton = screen.getByText('🎯 QUAY SỐ');
  expect(spinButton).toBeInTheDocument();
  expect(spinButton).toBeDisabled(); // Should be disabled initially without data
});
