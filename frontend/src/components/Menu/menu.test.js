import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from './menu';
import './menu.css';
import AuthService from '../../services/AuthService/auth.service';
import ReportsViews from '../../services/jsreports.service.list';
import ReportsGraphic from '../../services/jsreports.service.Graphic';
import ReportsUsers from '../../services/jsreports.service.Users';
import ReportsCalc from '../../services/jsreports.service.Calc';

describe('Menu', () => {
it('renders menu', async () => {
  const {container} =render(
    <MemoryRouter>
      <Menu />
      </MemoryRouter>);

  await waitFor(() => {
  expect(container.firstChild).toBeInTheDocument();

  });
});
});