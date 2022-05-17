import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  DialogProps,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import useTag from "hooks/tag/useTag";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  callback: (open: boolean) => void;
};

type TagDialogInputs = {
  categoryID: number;
  tagTitle: string;
};

const AddEditTagDialog = ({callback, open, ...rest}: Props & DialogProps) => {
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TagDialogInputs>();

  const { getCategories } = useTag();

  const handleClose = () => {
    callback(false);
  };

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const onSubmit = (data: TagDialogInputs) => {
    console.log(data);
  };

  return (
    <div>
      <Dialog open={open} {...rest} fullWidth={true} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Tag hozzaadás</DialogTitle>
        <DialogContent>
            <FlexBox sx={{flexDirection:'column', rowGap: '5px'}}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Kategória
                </InputLabel>
                <Select
                  {...register("categoryID", { required: true })}
                  id="demo-simple-select-standard"
                  label="Kategória"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((category, index) => {
                    return (
                      <MenuItem key={index} value={category.id}>{category.title}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Név
                </InputLabel>
                <Input {...register("tagTitle", { required: true })}></Input>
              </FormControl>
            </FlexBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Mégse</Button>
          <Button color="success" type="submit">
            Mentés
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddEditTagDialog;
