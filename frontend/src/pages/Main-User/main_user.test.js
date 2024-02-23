import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainUser from './main.js';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

describe('MainUser component', () => {
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

  
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MainUser queues={queues} />
      </MemoryRouter>
    );
  });
});
