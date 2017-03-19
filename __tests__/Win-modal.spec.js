import React from 'react';
import { mount } from 'enzyme';
import WinModal from '../src/components/board/Win-modal';

function setup() {
  const enzymeWrapper = mount(<WinModal moves="42" time="4200" />);
  const input = enzymeWrapper.find('input').first();
  const btn = enzymeWrapper.find('.btn-start').first();

  return {
    enzymeWrapper,
    input,
    btn
  };
}

describe('Win-modal', () => {

  const { enzymeWrapper, input, btn } = setup();

  it('should have heading', () => {
    expect(enzymeWrapper.find('h2').text()).toEqual('Solved!!!');
  });

  it('should have paragraph with text from props', () => {
    expect(enzymeWrapper.find('p').text()).toEqual('It took you 42 moves and 4200 seconds to solve it.');
  });

  it('should populate input with text', () => {
    input.value = 'Test';
    expect(input.value).toEqual('Test');
  });

  it('should validate and complain about length', () => {
    input.node.value = 'sa';
    input.simulate('change', input);
    btn.simulate('click');
    expect(enzymeWrapper.instance().state.validation).toEqual('User name must be longer than 3 characters');
  });

  it('should validate and complain about special chars', () => {
    input.node.value = 'sas@_';
    input.simulate('change', input);
    btn.simulate('click');
    expect(enzymeWrapper.instance().state.validation).toEqual('Please only use a-z and 0-9 characters');
  });

});
