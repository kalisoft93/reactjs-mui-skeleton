import { FormControl, InputLabel, Input } from "@mui/material";
import RichText from "components/shared/RichText";
import { FormControlProps } from "components/shared/types/FormControlProps";
import { Fragment } from "react";

export type PlanTaskFormCenterProps = {
  titleProps: FormControlProps;
  descriptionProps: FormControlProps;
  contentProps: FormControlProps;
  pedagogicalSuggProps: FormControlProps;
};

const PlanTaskFormRight = ({
  titleProps,
  descriptionProps,
  contentProps,
  pedagogicalSuggProps
}: PlanTaskFormCenterProps) => {
  return (
    <Fragment>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel>Cím</InputLabel>
        <Input type="text" name="title" {...titleProps}></Input>
      </FormControl>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel>Leírás</InputLabel>
        <Input
          type="text"
          multiline
          rows={4}
          {...descriptionProps}
        ></Input>
      </FormControl>
      <FormControl sx={{ width: "100%" }} variant="standard">
        <InputLabel>Pedagógiai megjegyzés</InputLabel>
        <Input
          type="text"
          multiline
          rows={4}
          {...pedagogicalSuggProps}
        ></Input>
      </FormControl>
      <RichText
        sx={{ mt: "10px" }}
        label="Tartalom"
        {...contentProps}
      ></RichText>
    </Fragment>
  );
};

export default PlanTaskFormRight;
