import React from 'react';
import { render } from '@testing-library/react';
import Main from './main';
import ListCard from '../../components/ClientListCard/ListCard';

describe('Main Page', () => {
  it('renders list of ListCard components', () => {
    const queues = [
      { 
        list_description: { 
          id: 1, 
          list_name: 'Queue 1', 
          list_current_number: 5 
        }, 
        list_image: null 
      },
      { 
        list_description: { 
          id: 2, 
          list_name: 'Queue 2', 
          list_current_number: 8 
        }, 
        list_image: null 
      },
    ];

    const { getAllByTestId } = render(<Main queues={queues} />);

    const ListCardComponents = getAllByTestId('ListCard');
    
    expect(ListCardComponents).toHaveLength(queues.length);

    ListCardComponents.forEach((card, index) => {
      const queue = queues[index];
      expect(card).toHaveTextContent(queue.list_description.list_name);
      expect(card).toHaveTextContent(`${queue.list_description.list_current_number}`);
    });
  });
});
