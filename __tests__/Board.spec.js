import React from 'react';
import {shallow} from 'enzyme';
import Board from '../src/components/Board';
import props from '../__mocks__/props';
import pkg from '../package.json';

function setup() {
  const enzymeWrapper = shallow(<Board {...props} />);
  return {
    props,
    enzymeWrapper
  }
}

describe('Board', () => {

  const { enzymeWrapper } = setup();

  it('Should match description from package.json', () => {
    const pkgName = pkg.name;
    expect(enzymeWrapper.contains(pkgName)).toBe(true);
  });

});
