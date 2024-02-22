import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListCard from './ListCard';
import { MemoryRouter } from 'react-router-dom';

describe('ListCard', () => {
  it('renders ListCard form with correct data', () => {
    const queue = {
      list_description: {
        id: 1,
        list_name: 'Test List',
        list_current_number: 5,
      },
      list_image: null, 
    };

    const { getByText } = render(
      <MemoryRouter>
        <ListCard queue={queue} />
      </MemoryRouter>
    );

    expect(getByText('Test List')).toBeInTheDocument();
    expect(getByText('5')).toBeInTheDocument();
  });

  it('calls increaseNumber function when the increase button is clicked', () => {
    const queue = {
      list_description: {
        id: 1,
        list_name: 'Test List',
        list_current_number: 5,
      },
      list_image: null, 
    };

    const increaseNumberMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <ListCard queue={queue} increaseNumber={increaseNumberMock} />
      </MemoryRouter>
    );

    const increaseButton = getByTestId('increase-button');
    fireEvent.click(increaseButton);

    expect(increaseNumberMock).toHaveBeenCalledWith(queue.list_description.id);
  });

  it('calls decreaseNumber function when the decrease button is clicked', () => {
    const queue = {
      list_description: {
        id: 1,
        list_name: 'Test List',
        list_current_number: 5,
      },
      list_image: null, 
    };

    const decreaseNumberMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <ListCard queue={queue} decreaseNumber={decreaseNumberMock} />
      </MemoryRouter>
    );

    const decreaseButton = getByTestId('decrease-button');
    fireEvent.click(decreaseButton);

    expect(decreaseNumberMock).toHaveBeenCalledWith(queue.list_description.id);
  });

  it('calls deleteList function when the delete button is clicked', () => {
    const queue = {
      list_description: {
        id: 1,
        list_name: 'Test List',
        list_current_number: 5,
      },
      list_image: null, 
    };

    const deleteListMock = jest.fn();

    const { getByTestId } = render(
      <MemoryRouter>
        <ListCard queue={queue} deleteList={deleteListMock} />
      </MemoryRouter>
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(deleteListMock).toHaveBeenCalledWith(queue.list_description.id);
  });
});
