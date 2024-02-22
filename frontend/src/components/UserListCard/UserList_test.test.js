import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import ListCard from './ListCard';
import { MemoryRouter } from 'react-router-dom';

describe('ListCard', () => {
it('renders ListCard form', async () => {
  
  const queue = {
    list_description: {
      id: 1,
      list_name: 'Test List',
      list_current_number: 5,
    },
    list_image: null, 
  };

  const { container, getByText } = render(
    <MemoryRouter>
      <ListCard queue={queue} />
    </MemoryRouter>
  );

  expect(container.firstChild).toBeInTheDocument();

  expect(getByText('Test List')).toBeInTheDocument();

  expect(getByText('5')).toBeInTheDocument();

});
});