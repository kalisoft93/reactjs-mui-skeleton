import { Box } from "@mui/material";
import { BoxProps } from "@mui/system";
import { Control, Controller } from "react-hook-form";
import WYSIWYGEditor from "./WYSIWYGEditor";

type RichTextProps = {
  control: Control<any, any>;
  controlName: any;
  required?: boolean;
  label: string;
};

function RichText({ control, required, controlName, label, sx }: RichTextProps & BoxProps) {
  return (
    <Box sx={sx}>
      <Box  sx={{ color: "gray", fontSize: "1.1rem", marginBottom: "5px" }}>{label}</Box>
      <div
        style={{
          border: "1px solid #ccc",
          minHeight: 60,
          padding: 10,
        }}
      >
        <Controller
          name={controlName}
          control={control}
          rules={{ required: required !== undefined ? required : false }}
          render={({ field }) => <WYSIWYGEditor {...field} />}
        />
      </div>
    </Box>
  );
}

export default RichText;
