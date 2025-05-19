import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TextEncoder, TextDecoder } from 'util';
import ShippingOrderView from '../views/ShippingOrderView';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// src/tests/setupTests.ts

test('renders Hello, World! text', () => {
  process.env.VITE_SERVE_URL = 'http://localhost:4000';
  render(<ShippingOrderView />);
  expect(screen.getByText('Crear Orden')).toBeInTheDocument();
});