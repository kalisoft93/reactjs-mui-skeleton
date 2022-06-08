import { Box, Tab, Tabs } from "@mui/material";
import MainPageContainer from "components/shared/containers/MainPageContainer";
import TabPanel from "components/shared/TabPanel";
import React from "react";
import PurposeList from "./purpose/PurposeList";

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
          <Tab label="Fejlesztési játék" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <PurposeList></PurposeList>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
  );
};

export default Ability;
