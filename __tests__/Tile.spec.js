import React from 'react';
import ReactDOM from 'react-dom';
import { Tile } from '../src/components/board/Tile';
import props from '../__mocks__/props';

describe('Tile', () => {
  it('Tile renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tile {...props} />, div);
  });

  it('Empty tile renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tile empty {...props} />, div);
  });
});
