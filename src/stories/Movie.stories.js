import React from "react";
import Movie from "../components/movie/Movie";
import "../index.css";

export default {
  title: "Components/Movie",
};

const Template = (args) => <Movie {...args} />;

export const NoData = Template.bind({});
NoData.args = {
  name: "",
  directorName: "",
  writerName: "",
  duration: "",
  rating: "",
};

export const withData = Template.bind({});
NoData.args = {
  name: "Avangers: Endgame",
  directorName: "Ironman",
  writerName: "Spiderman",
  duration: "120",
  rating: "9",
};
