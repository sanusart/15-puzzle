import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../src/components/NotFound';

function setup() {
  const enzymeWrapper = shallow(<NotFound />);

  return {
    enzymeWrapper
  };
}

describe('NotFound', () => {
  const { enzymeWrapper } = setup();

  it('NotFound should have specific text', () => {
    expect(enzymeWrapper.find('p').text()).toEqual('404: Not found');
  });
});
