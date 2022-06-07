import { DialogProps } from "@mui/material";

export type BaseCRUDDialogProps = DialogProps & {
    title?: string;
    saveBtnLabel?: string;
    callback: (open: boolean) => void;
}