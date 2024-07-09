import React from "react";
import renderer from "react-test-renderer";

import EditScreenInfo from "../EditScreenInfo";
describe("EditScreenInfo", () => {
  it("renders correctly with a given path", () => {
    const path = "/example/path";
    const tree = renderer.create(<EditScreenInfo path={path} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
