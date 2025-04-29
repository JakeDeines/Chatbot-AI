import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Chatbot from '../components/Chatbot';
jest.mock('axios');

describe('Chatbot', () => {
  test('renders input placeholder', () => {
    render(<Chatbot />);
    const inputElement = screen.getByPlaceholderText('Type your question here...');
    expect(inputElement).toBeInTheDocument();
  });
});
