import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import { BaseCRUDDialogProps } from "components/shared/types/BaseCRUDDialogProps";
import useMedia from "hooks/media/useMedia";
import { useForm } from "react-hook-form";

type MediaDialogInputs = {
  type: string;
  url: string;
  files: File[];
  label: string;
};

const CRUDMediaDialog = ({ callback, open, ...rest }: BaseCRUDDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<MediaDialogInputs>();

  const {postMedia} = useMedia();

  const handleClose = () => {
    callback(false);
  };

  const onSubmit = (data: MediaDialogInputs) => {

    const formData = new FormData();
    formData.set("type", data.type);
    formData.set("label", data.label);
    if (data.url) formData.set("url", data.url);
    if (data.files && data.files.length > 0)
      formData.append("file", data.files[0]);

    postMedia(formData).then(() => {handleClose();});
  };

  const type = watch("type");

  return (
    <Dialog open={open} {...rest} fullWidth={true} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Média hozzaadás</DialogTitle>
        <DialogContent>
          <FlexBox sx={{ flexDirection: "column", rowGap: "5px" }}>
            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Típus
              </InputLabel>
              <Select
                {...register("type", { required: true })}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Típus"
              >
                <MenuItem value="image">image</MenuItem>
                <MenuItem value="gif">gif</MenuItem>
                <MenuItem value="audio">audio</MenuItem>
                <MenuItem value="video">video</MenuItem>
                <MenuItem value="youtube">youtube</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard">
              <InputLabel id="demo-simple-select-standard-label">
                Címke
              </InputLabel>
              <Input
                name="label"
                {...register("label", { required: true })}
              ></Input>
            </FormControl>

            {type === "youtube" && (
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  URL
                </InputLabel>
                <Input name="label" {...register("url")}></Input>
              </FormControl>
            )}

            {type !== "youtube" && (
              <FormControl variant="standard">
                <InputLabel id="demo-simple-select-standard-label">
                  File
                </InputLabel>
                <Input type="file" name="file" {...register("files")}></Input>
              </FormControl>
            )}
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
  );
};

CRUDMediaDialog.defaultProps = {
  maxWidth: "xs",
};

export default CRUDMediaDialog;
