import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import Tile from '../src/components/board/Tile';
import props from '../__mocks__/props';

function setup() {
  const enzymeWrapper = shallow(<Board {...props} />);
  return {
    props,
    enzymeWrapper
  }
}

describe('Tile', () => {

  it('Tile renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Tile {...props} />, div);
  });

});
