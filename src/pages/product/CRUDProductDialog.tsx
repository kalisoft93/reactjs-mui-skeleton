import {
  Dialog,
  DialogContent,
  FormControl,
  Paper,
  Input,
  InputLabel,
  Button,
  DialogActions,
  Box,
  DialogTitle,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import CommonSelector from "components/shared/CommonSelector";
import RichText from "components/shared/RichText";
import TagSelector from "components/shared/TagSelector";
import { BaseCRUDDialogProps } from "components/shared/types/BaseCRUDDialogProps";
import useProduct, { Product } from "hooks/products/useProduct";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import useMedia from "hooks/media/useMedia";
import { selectorDefaultMap } from "utils/utils";

type Props = BaseCRUDDialogProps & {
  defaults?: Product;
};

type ProductDialogInputs = {
  tags: number[];
  banner: number[];
  media: number[];
  source: string;
  title: string;
  description: string;
  content: string;
  webshop_url: string;
};

const CRUDProductDialog = ({ callback, defaults, open, ...rest }: Props) => {
  const notifier = useSnackbar();
  const { postProduct, updateProduct } = useProduct();
  const { getMediaListData } = useMedia();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductDialogInputs>({
    defaultValues: defaults || { tags: [], media: [] },
  });

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
    formData.set("webshop_url", data.webshop_url);

    let savePromise: Promise<any> = null;

    if (!defaults) {
      savePromise = postProduct(formData);
    } else {
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
      <DialogTitle>{rest.title || "Termék hozzaadás"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FlexBox columnGap={2}>
            <FlexBox flex="1 0 30%" flexDirection="column" rowGap="10px">
              <TagSelector
                control={control}
                required={true}
                controlName="tags"
              ></TagSelector>
              <CommonSelector
                fetcher={getMediaListData}
                mapper={selectorDefaultMap}
                control={control}
                required={true}
                title="Kép választó"
                placeholder="Kép"
                controlName="media"
              ></CommonSelector>

              <CommonSelector
                fetcher={getMediaListData}
                mapper={selectorDefaultMap}
                control={control}
                required={true}
                controlName="banner"
                placeholder="Banner "
                title="Banner választó"
                singleSelect={true}
              ></CommonSelector>
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
                      type="description"
                      multiline
                      rows={4}
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
                      {...register("webshop_url", { required: true })}
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
            {rest.saveBtnLabel || "Mentés"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CRUDProductDialog;
