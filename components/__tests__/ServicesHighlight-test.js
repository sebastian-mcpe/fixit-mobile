import React from "react";
import renderer from "react-test-renderer";
import { Text, View } from "react-native";
import {
  Entypo,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import ServicesHighlight, { styles } from "../ServicesHighlight";

describe("ServicesHighlight", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<ServicesHighlight />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("contains the correct number of service items", () => {
    const instance = renderer.create(<ServicesHighlight />).root;
    const serviceItems = instance.findAll(
      (node) =>
        node.type === View &&
        node.props.style &&
        node.props.style.borderWidth === styles.servicesItem.borderWidth &&
        node.props.style.borderColor === styles.servicesItem.borderColor &&
        node.props.style.alignItems === styles.servicesItem.alignItems &&
        node.props.style.paddingVertical === styles.servicesItem.paddingVertical
    );
    // We expect 8 service items
    expect(serviceItems.length).toBe(8);
  });

  it("contains the correct icons with styles", () => {
    const instance = renderer.create(<ServicesHighlight />).root;

    const icons = [
      { type: MaterialIcons, name: "carpenter" },
      { type: Feather, name: "tv" },
      { type: MaterialCommunityIcons, name: "mower-bag" },
      { type: FontAwesome5, name: "box" },
      { type: MaterialCommunityIcons, name: "vacuum" },
      { type: MaterialIcons, name: "home-repair-service" },
      { type: MaterialCommunityIcons, name: "tools" },
      { type: Entypo, name: "air" },
    ];

    icons.forEach((icon) => {
      const foundIcon = instance
        .findAllByType(icon.type)
        .find((ic) => ic.props.name === icon.name);
      expect(foundIcon).toBeTruthy();
      expect(foundIcon.props.size).toBe(50);
      expect(foundIcon.props.color).toBe("black");
    });
  });

  it("contains the correct text elements with styles", () => {
    const instance = renderer.create(<ServicesHighlight />).root;
    const textElements = instance.findAllByType(Text);

    const texts = [
      "Carpintery",
      "Technicians",
      "Gardening",
      "Haulage",
      "Cleaning",
      "Home Repairs",
      "Appliance Repair",
      "AC Service & Repair",
    ];

    texts.forEach((text) => {
      const textElement = textElements.find(
        (element) => element.props.children === text
      );
      expect(textElement).toBeTruthy();
      expect(textElement.props.style).toMatchObject({
        fontFamily: "Roboto",
      });
    });
  });
});
