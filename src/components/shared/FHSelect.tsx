import {
  FormControl,
  InputLabel,
  Input,
  Box,
  Chip,
  MenuItem,
  TextField,
  Select,
  FormHelperText,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Control,
  Controller
} from "react-hook-form";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type SearchSelectProps = {
  changeHandler?: (selectedValues) => void;
  options: { id: string; title: string }[];
  control: Control<any, any>;
  controlName: any;
  placeholder?: string;
  required?: boolean;
  singleSelect?: boolean; 
};

const FHSelect = (props: SearchSelectProps) => {
  const [currOptions, setCurrOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrOptions(props.options);
  }, [props.options]);

  // const handleSearchChange = (event: any) => {
  //   const value = event.currentTarget.value;
  //   const filteredOptions = props.options.filter((o) =>
  //     o.value.includes(value)
  //   );
  //   setCurrOptions(filteredOptions);
  //   setSearchTerm(value);
  // };

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const result = typeof value === "string" ? value.split(",") : value;
    if (props.changeHandler) props.changeHandler(result);
    return result;
  };

  return (
    <Controller
      name={props.controlName}
      control={props.control}
      rules={{required: props.required !== undefined ? props.required : false}}
      render={({ field, fieldState }) => (
        <FormControl variant="standard">
          <InputLabel id="demo-multiple-chip-label">{props.placeholder}</InputLabel>
          <Select
            displayEmpty
            multiple={props.singleSelect ? false: true}
            value={field.value}
            onChange={(e) => field.onChange(handleChange(e))}
            input={
              <Input id="select-multiple-chip" />
          }
            renderValue={(selected: any) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(props.options.length > 0 && selected ? Array.isArray(selected) ? selected : [selected] :  []).map((value) => {
                  const label = props.options.find((o) => o.id === value).title;
                  return (
                  <Chip key={value} label={label} />
                  );
                }
                )}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em>{props.placeholder}</em>
            </MenuItem>
            {/* <MenuItem>
              <Input value={searchTerm} onChange={handleSearchChange} placeholder="Keresés"></Input>
            </MenuItem> */}
            {currOptions.map((option, index) => {
              return (
                <MenuItem key={index} value={option.id}>
                  {option.title}
                </MenuItem>
              );
            })}
          </Select>
          {
          fieldState.error && (
                <FormHelperText error={true}>Kötelező mező</FormHelperText>
                )
          }
        </FormControl>
      )}
    ></Controller>
  );
};

export default FHSelect;
