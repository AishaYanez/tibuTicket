import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListCard from './ListCard';
import ListService from '../../services/ListService/list.service';

describe('ListCard', () => {
  it('calls increaseNumber function when the increase button is clicked', async () => {
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
      <ListCard queue={queue} />
    );

    const increaseButton = getByTestId('increase-button');
    fireEvent.click(increaseButton);

    await increaseNumberMock;

    expect(increaseNumberMock).toHaveBeenCalledWith(queue.list_description.id);
  });

  it('calls decreaseNumber function when the decrease button is clicked', async () => {
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
      <ListCard queue={queue} />
    );

    const decreaseButton = getByTestId('decrease-button');
    fireEvent.click(decreaseButton);

    await decreaseNumberMock;

    expect(decreaseNumberMock).toHaveBeenCalledWith(queue.list_description.id);
  });

});
