import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  Paper,
  Input,
  InputLabel,
  Typography,
  styled,
  Button,
  DialogActions,
  Box,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import MediaSelector from "components/shared/MediaSelector";
import RichText from "components/shared/RichText";
import TagSelector from "components/shared/TagSelector";
import useProduct, { Product } from "hooks/tag/useProduct";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  callback: (open: boolean) => void;
  defaults?: Product;
};

type ProductDialogInputs = {
  tags: number[];
  banner: number[];
  media: number[];
  title: string;
  source: string;
  description: string;
  content: string;
  webshopURL: string;
};

const CRUDProductDialog = ({
  callback,
  defaults,
  open,
  ...rest
}: Props & DialogProps) => {
  const notifier = useSnackbar();
  const { postProduct, updateProduct } = useProduct();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductDialogInputs>({ defaultValues: defaults || { tags: [], media: [] } });

  const onSubmit = (data: ProductDialogInputs) => {
    const formData = new FormData();
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => {
        formData.append("tags[]", tag.toString());
      });
    }

    if (data.media && data.media.length > 0) {
      data.media.forEach((media) => {
        formData.append("media[]", media.toString());
      });
    }

    if (data.banner) {
      formData.append("banner", data.banner.toString());
    }

    formData.set("title", data.title);
    formData.set("description", data.description);
    formData.set("content", data.content);
    formData.set("source", data.source);
    formData.set("webshop_url", data.webshopURL);

    let savePromise: Promise<any> = null;

    if (!defaults){
      savePromise = postProduct(formData);
    }else{
      savePromise = updateProduct(defaults.id, formData);
    }

    savePromise.then(() => {
      notifier.enqueueSnackbar("Sikeres mentés", { variant: "success" });
      callback(false);
    });

  
  };

  return (
    <Dialog
      open={open}
      {...rest}
      fullWidth={true}
      onClose={() => callback(false)}
    >
      <DialogTitle>Termék hozzaadás</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FlexBox columnGap={2}>
            <FlexBox flex="1 0 30%" flexDirection="column" rowGap="10px">
              <TagSelector
                control={control}
                required={true}
                controlName="tags"
              ></TagSelector>
              <MediaSelector
                control={control}
                required={true}
                controlName="media"
              ></MediaSelector>

              <MediaSelector
                control={control}
                required={true}
                controlName="banner"
                title="Banner választó"
                singleSelect={true}
              ></MediaSelector>
            
            </FlexBox>
            <Box flex="1 0 70%">
              <Paper sx={{ p: "10px" }}>
                <FlexBox flex="1 0 70%" flexDirection="column" rowGap={1}>
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                      Cím
                    </InputLabel>
                    <Input
                      type="text"
                      name="title"
                      {...register("title", { required: true })}
                    ></Input>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                      Leírás
                    </InputLabel>
                    <Input
                      type="text"
                      name="title"
                      {...register("description", { required: true })}
                    ></Input>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                      Forrás
                    </InputLabel>
                    <Input
                      type="text"
                      name="source"
                      {...register("source", { required: true })}
                    ></Input>
                  </FormControl>
                  <FormControl sx={{ width: "100%" }} variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">
                      Webshop URL
                    </InputLabel>
                    <Input
                      type="text"
                      name="webshopUrl"
                      {...register("webshopURL", { required: true })}
                    ></Input>
                  </FormControl>
                  <RichText
                    sx={{ mt: "10px" }}
                    label="Tartalom"
                    controlName="content"
                    control={control}
                  ></RichText>
                </FlexBox>
              </Paper>
            </Box>
          </FlexBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => callback(false)}>Mégse</Button>
          <Button color="success" type="submit">
            Mentés
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CRUDProductDialog;
