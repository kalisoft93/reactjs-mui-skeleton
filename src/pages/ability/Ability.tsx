import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "components/shared/TabPanel";
import PlanTaskList from "pages/plan/PlanTaskList";
import React from "react";
import PurposeList from "./purpose/PurposeList";
import TaskList from "./task/TaskList";

const Ability = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Fejlesztési cél" />
          <Tab label="Fejlesztési feladat" />
          <Tab label="Tevékenységek" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PurposeList></PurposeList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TaskList></TaskList>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PlanTaskList></PlanTaskList>
        </TabPanel>
      </Box>
  );
};

export default Ability;
