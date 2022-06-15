import { Control } from "react-hook-form";

export type FormControlProps = {
    control: Control<any, any>;
    controlName: any;
    required?: boolean;
  };
