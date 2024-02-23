import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './menu.js';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

describe('Menu component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );
  });
});
