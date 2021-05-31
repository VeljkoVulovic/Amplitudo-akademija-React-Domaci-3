import React from "react";
import Character from "../components/character/Character";
import "../index.css";

export default {
  title: "Components/Character",
};

const Template = (args) => <Character {...args} />;

export const NoData = Template.bind({});
NoData.args = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  occupation: "",
};

export const withData = Template.bind({});
NoData.args = {
  firstName: "Kadin",
  lastName: "Hand",
  dateOfBirth: "2020-02-02",
  age: "20",
  gender: "MALE",
  occupation: "tester",
};
