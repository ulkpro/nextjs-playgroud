import { Widget } from "./types";

export const WIDGETS_BY_ROLE: Record<string, Widget[]> ={
  admin:[
    { title: "Total Users", unit: "", value: "125" },
    { title: "Monthly Revenue", unit: "$", value: "10,000" },
    { title: "Tasks Completed", unit: "", value: "85%" },
    { title: "Reports Submitted", unit: "", value: "230" },
    { title: "Growth Rate", unit: "", value: "15%" },
  ],

  user: [
    { title: "Tasks Assigned", unit: "", value: "5" },
  ],

};