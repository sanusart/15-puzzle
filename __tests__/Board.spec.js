import React from 'react';
import { shallow } from 'enzyme';
import Board from '../src/components/board/Board';
import props from '../__mocks__/props';
import pkg from '../package.json';

function setup() {
  const enzymeWrapper = shallow(<Board {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe('Board', () => {
  const { enzymeWrapper } = setup();

  const delay = value => new Promise(resolve =>
    setTimeout(() => resolve(), value)
  );

  it('Should match description from package.json', () => {
    const pkgName = pkg.name;
    expect(enzymeWrapper.contains(pkgName)).toBe(true);
  });

  it('Should have tiles state === 16', () => {
    expect(enzymeWrapper.instance().state.tiles.length).toBe(16);
  });

  it('Should have tiles state === 16', () => {
    expect(enzymeWrapper.instance().state.boardWidth).toBe(320);
  });

  it('Should be able to count moves', () => {
    enzymeWrapper.instance().recordMove();
    enzymeWrapper.instance().recordMove();
    expect(enzymeWrapper.instance().state.moves).toBe(2);
  });

  it('Should be able to randomize tiles', async () => {
    enzymeWrapper.instance().randomize(10);
    await delay(1000);
    expect(enzymeWrapper.instance().state.tiles).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]);
  });
});
