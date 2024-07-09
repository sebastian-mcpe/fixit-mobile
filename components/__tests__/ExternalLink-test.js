import React from 'react';
import renderer from 'react-test-renderer';

import ExternalLink from '../ExternalLink';
describe('ExternalLink', () => {
  it('renders correctly', () => {
    const href = "https://example.com";
    const tree = renderer.create(<ExternalLink href={href}>Click Here</ExternalLink>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
