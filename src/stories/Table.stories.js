import React from "react";
import TableComponent from "../components/table/TableComponent";

export default {
  title: "Components/Table",
};

const Template = (args) => <TableComponent {...args} />;

export const NoData = Template.bind({});
NoData.args = {
  headers: [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
  ],
  rows: [],
};

export const RowsPropsUndefined = Template.bind({});
RowsPropsUndefined.args = {
  headers: [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "Name",
    },
  ],
};

export const MultiCols = Template.bind({});
MultiCols.args = {
  headers: [
    { key: "id", title: "Id" },
    { key: "isbn", title: "Name" },
    { key: "writerName", title: "Writer" },
    { key: "publisherName", title: "Publisher" },
    { key: "publishedDate", title: "Published date" },
    { key: "genre", title: "Genre" },
  ],
  rows: [],
};
