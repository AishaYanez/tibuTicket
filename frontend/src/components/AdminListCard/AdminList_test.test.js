import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminListCard from './ListCard';
import ListService from '../../services/ListService/list.service';

describe('AdminListCard', () => {
  it('calls increaseNumber function when the increase button is clicked', () => {
    const queue = {
      list_description: {
        id: 1,
        list_name: 'Test List',
        list_current_number: 5,
      },
      list_image: null,
    };

    const increaseNumberMock = jest.spyOn(ListService, 'increaseNumber').mockResolvedValue();

    const { getByTestId } = render(
      <AdminListCard queue={queue} />
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

    const decreaseNumberMock = jest.spyOn(ListService, 'decreaseNumber').mockResolvedValue();

    const { getByTestId } = render(
      <AdminListCard queue={queue} />
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

    const deleteListMock = jest.spyOn(ListService, 'deleteList').mockResolvedValue();

    const { getByTestId } = render(
      <AdminListCard queue={queue} />
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);

    expect(deleteListMock).toHaveBeenCalledWith(queue.list_description.id);
  });
});
