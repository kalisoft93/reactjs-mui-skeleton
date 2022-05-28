import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Input,
  DialogProps,
  FormHelperText,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import FHSelect from "components/shared/FHSelect";
import useTag from "hooks/tag/useTag";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import theme from "themes/theme";

type Props = {
  callback: (open: boolean) => void;
};

export type TagDialogInputs = {
  categoryIDs: number[];
  tagTitle: string;
};


const CRUDTagDialog = ({ callback, open, ...rest }: Props & DialogProps) => {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TagDialogInputs>({defaultValues: {categoryIDs: []}});

  const { getCategories, postTag } = useTag();

  const handleClose = () => {
    callback(false);
  };

  useEffect(() => {
    getCategories().then((cats) => {
      setCategories(cats);
    });
  }, []);

  const onSubmit = (data: TagDialogInputs) => {
    console.log(data);
    postTag(data.tagTitle, data.categoryIDs).then(() => {
      callback(false);
    })
  };

  console.log('render');

  return (
    <div>
      <Dialog open={open} {...rest} fullWidth={true} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Tag hozzaadás</DialogTitle>
          <DialogContent>
            <FlexBox sx={{ flexDirection: "column", rowGap: "5px" }}>
              <FHSelect placeholder="Kategoriák" options={categories} control={control} required={true} controlName="categoryIDs"></FHSelect>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Név
                </InputLabel>
                <Input {...register("tagTitle", { required: true })}></Input>
                  {
                  errors.tagTitle && (
                          <FormHelperText error={true}>Kötelező mező</FormHelperText>
                        )
                  }
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

CRUDTagDialog.defaultProps = {
  maxWidth: "xs",
};

export default CRUDTagDialog;
