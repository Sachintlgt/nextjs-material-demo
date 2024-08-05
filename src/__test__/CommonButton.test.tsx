import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import CommonButton from '../components/CommonButton';

test('renders a button with the correct text', () => {
    render(<CommonButton disabled={false} title='Click Me' type='button' variant='contained' color='info' onClickHandler={() => {
      console.log('click') 
    }}/>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
  });