import { Paper, Typography } from "@mui/material";
import useMedia from "hooks/media/useMedia";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import FHSelect from "./FHSelect";
import FlexBox from "./FlexBox";

export interface CommonSelectorData {
  id: any,
  title: string
}

type CommonSelectorProps = {
  fetcher: (searchTerm: string) => Promise<any>;
  mapper: (rawData: any) => CommonSelectorData[];
  changeHandler?: (selectedValues) => void;
  control: Control<any, any>;
  controlName: any;
  required?: boolean;
  singleSelect?: boolean;
  title?: string;
};

const CommonSelector = ({fetcher, mapper, ...props}: CommonSelectorProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = (searchTerm: string = "") => {
    fetcher( searchTerm).then((resp) => {
      setData(mapper(resp));
    });
  }
 

  return (
    <Paper sx={{ p: "10px" }}>
      <FlexBox sx={{ flexDirection: "column"}}>
        <Typography variant="subtitle1">{props.title || 'Választó'}</Typography>
        <FHSelect
          placeholder="Media"
          options={data}
          control={props.control}
          required={props.required}
          controlName={props.controlName}
          singleSelect={props.singleSelect}
        ></FHSelect>
      </FlexBox>
    </Paper>
  );
};

export default CommonSelector;
