import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Paper,
} from "@mui/material";
import useTag from "hooks/tag/useTag";
import { useEffect, useState } from "react";
import { Control, useForm } from "react-hook-form";
import FHSelect from "./FHSelect";
import FlexBox from "./FlexBox";

type TagSelectorInputs = {
  changeHandler?: (selectedValues) => void;
  control: Control<any, any>;
  controlName: any;
  required?: boolean;
};

const TagSelector = (props: TagSelectorInputs) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<{ category: number[] }>({ defaultValues: { category: [] } });

  const [tags, setTags] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);

  const [categories, setCategories] = useState([]);

  const { getTags, getCategories } = useTag();

  const searchCategoryTermHandler = (categories) => {
    setSelectedCats(categories);
  };

  useEffect(() => {
    getTags(1, false, selectedCats).then((tags) => {
      setTags(tags.data);
    });
  }, [selectedCats]);

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  return (
    <Paper sx={{p: '10px'}}>
      <FlexBox sx={{ flexDirection: "column", rowGap: "5px" }}>
       <Typography variant="subtitle1">Tag választó</Typography>
        <FHSelect
          changeHandler={searchCategoryTermHandler}
          placeholder="Kategóriák"
          options={categories}
          control={control}
          required={false}
          controlName={"category"}
        ></FHSelect>
        <FHSelect
          placeholder="Tagek"
          options={tags}
          control={props.control}
          required={props.required}
          controlName={props.controlName}
        ></FHSelect>
      </FlexBox>
    </Paper>
  );
};

export default TagSelector;
