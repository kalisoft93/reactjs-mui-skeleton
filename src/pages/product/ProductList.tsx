import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import CRUDProductDialog from "./CRUDProductDialog";

const ProductList = () => {
  const [open, setOpen] = useState(false);

  const closeDialogHandle = (status) => {
    setOpen(status);
  };

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        p: "10px",
        boxSizing: "border-box",
      }}
    >
      {open && (
        <CRUDProductDialog
          maxWidth="lg"
          open={open}
          callback={(status) => closeDialogHandle(status)}
        ></CRUDProductDialog>
      )}
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        startIcon={<Add sx={{ color: "common.white" }}></Add>}
      >
        Hozzaadás
      </Button>
    </Box>
  );
};

export default ProductList;
