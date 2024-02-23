import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainAdmin from './main.js';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

describe('MainAdmin component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <MainAdmin />
      </MemoryRouter>
    );
  });
});
