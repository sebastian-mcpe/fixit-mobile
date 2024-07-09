import React from "react";
import renderer from "react-test-renderer";
import { Pressable } from "react-native";
import { router } from "expo-router";

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock("@gluestack-ui/config", () => ({
  config: {},
}));

jest.mock("@gluestack-ui/themed", () => ({
  GluestackUIProvider: ({ children }) => <div>{children}</div>,
  Center: ({ children, ...props }) => <div {...props}>{children}</div>,
  HStack: ({ children, ...props }) => <div {...props}>{children}</div>,
  VStack: ({ children, ...props }) => <div {...props}>{children}</div>,
  Text: ({ children, ...props }) => <span {...props}>{children}</span>,
}));

import ServiceTile from "../ServiceTile";
import Colors from "@/constants/Colors";

describe("ServiceTile", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <ServiceTile
          date={new Date("2023-07-15")}
          service="Plumbing"
          status="Completed"
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("navigates correctly when the 'View details' button is pressed", () => {
    const instance = renderer.create(
      <ServiceTile
        date={new Date("2023-07-15")}
        service="Plumbing"
        status="Completed"
      />
    ).root;

    const pressable = instance.findByType(Pressable);
    pressable.props.onPress();

    expect(router.push).toHaveBeenCalledWith("bookings");
  });

  it("displays the 'View details' text with correct style", () => {
    const instance = renderer.create(
      <ServiceTile
        date={new Date("2023-07-15")}
        service="Plumbing"
        status="Completed"
      />
    ).root;

    const viewDetailsText = instance.findByProps({ children: "View details" });

    expect(viewDetailsText).toBeTruthy();
    expect(viewDetailsText.props.style).toMatchObject({ color: Colors.blue });
  });
});
