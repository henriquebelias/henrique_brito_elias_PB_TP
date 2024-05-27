import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from '../components/Button';

describe('Button', () => {
  it('should render the Button component', () => {
    const mockHandleClick = jest.fn();

    const { getByText } = render(
      <Button handleClick={mockHandleClick} modal="register-modal">
        Clique aqui
      </Button>
    );

    const buttonElement = getByText('Clique aqui');

    expect(buttonElement).toHaveClass('system-button');

    fireEvent.click(buttonElement);

    expect(mockHandleClick).toHaveBeenCalledWith('register-modal', true);
  });
});
