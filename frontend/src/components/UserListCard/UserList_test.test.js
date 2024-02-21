import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import ListCard from './ListCard';
import { MemoryRouter } from 'react-router-dom';

describe('ListCard', () => {
it('renders ListCard form', async () => {
  const {container} =render(
    <MemoryRouter>
      <ListCard />
      </MemoryRouter>);

  await waitFor(() => {
  expect(container.firstChild).toBeInTheDocument();

  });
});
});