import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../src/components/Loading';

it('Snapshot for <Loading /> should match', () => {
  const loading = renderer.create(<Loading />);
  const json = loading.toJSON();
  expect(json).toMatchSnapshot();
});
