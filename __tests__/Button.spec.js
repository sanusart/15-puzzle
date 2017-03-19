import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../src/components/Button';

it('Renders regular <Button />', () => {
  const regularBtn = renderer.create(<Button className="btn-start" text="Text" />);
  const json = regularBtn.toJSON();
  expect(json).toMatchSnapshot();
});

it('Renders <Button /> with link', () => {
  const buttonWithLink = renderer.create(<Button className="btn-start" to="/404" text="Text" />);
  const json = buttonWithLink.toJSON();
  expect(json).toMatchSnapshot();
});
