import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Control } from "react-hook-form";
import FHSelect from "./FHSelect";
import FlexBox from "./FlexBox";
import debounce from "lodash/debounce";
import { Search } from "@mui/icons-material";

export interface CommonSelectorData {
  id: any;
  title: string;
}

type CommonSelectorProps = {
  fetcher: (searchTerm: string) => Promise<any>;
  mapper: (rawData: any) => CommonSelectorData[];
  changeHandler?: (selectedValues) => void;
  control: Control<any, any>;
  controlName: any;
  required?: boolean;
  singleSelect?: boolean;
  withFilter?: boolean;
  title?: string;
  placeholder?: string;
};

const CommonSelector = ({ fetcher, mapper, ...props }: CommonSelectorProps) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = (searchTerm: string = "") => {
    fetcher(searchTerm).then((resp) => {
      setData(mapper(resp));
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    init(event.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  return (
    <Paper sx={{ p: "10px" }}>
      <FlexBox sx={{ flexDirection: "column" }}>
        <Typography variant="subtitle1">{props.title || "Választó"}</Typography>
        {props.withFilter &&
           <TextField
            variant="standard"
            onChange={debouncedResults}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          ></TextField>
        }
        <FHSelect
          placeholder={props.placeholder}
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
