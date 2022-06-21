import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import useProduct, { Product } from "hooks/products/useProduct";
import React, { useEffect } from "react";
import { useState } from "react";
import CRUDProductDialog from "./CRUDProductDialog";

interface Column {
  id: "id" | "title" | "description" | "created_at";
  label: string;
  minWidth?: number;
  width?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", width: 70 },
  { id: "title", label: "Cím", width: 100 },
  { id: "description", label: "Leírás" },
  { id: "created_at", label: "date" },
];

const ProductList = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { getProductList, showProduct } = useProduct();
  const [defaultData, setDefaultData] = useState<Product>();

  const init = (page = 1) => {
    getProductList(page).then((tagData) => {
      setRowsPerPage(tagData.per_page);
      setRows(tagData.data);
    });
  };

  useEffect(() => {
    init(page);
  }, [page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
  };

  const closeDialogHandle = (status) => {
    setOpen(status);
    init();
  };

  const closeUpdateDialogHandle = (status) => {
    setOpenUpdate(status);
    init();
  }
 
  const deleteMediaHandle = (id) => {
    // deleteMedia(id).then(() => {
    //   notifier.enqueueSnackbar('Sikeres mentés', {variant: 'success'});
    //   init();
    // });
  };

  const editMediaHandle = (id) => {
    showProduct(id).then((data) => {
      setDefaultData(data);
      setOpenUpdate(true);
    });
  };

  return (
    <Box>
      {open && (
        <CRUDProductDialog
          maxWidth="lg"
          open={open}
          title={'Termék hozzaadás'}
          saveBtnLabel={'Hozzaadás'}
          callback={(status) => closeDialogHandle(status)}
        ></CRUDProductDialog>
      )}
      {openUpdate  && (
        <CRUDProductDialog
          maxWidth="lg"
          open={openUpdate}
          title={'Termék szerkesztés'}
          saveBtnLabel={'Mentés'}
          defaults={defaultData}
          callback={(status) => closeUpdateDialogHandle(status)}
        ></CRUDProductDialog>
      )}
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        startIcon={<Add sx={{ color: "common.white" }}></Add>}
      >
        Hozzaadás
      </Button>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}

                    <TableCell key={"action"}>
                      <FlexBox  sx={{cursor: "pointer"}} columnGap="10px">
                        <Edit onClick={() => editMediaHandle(row.id)}></Edit>
                        <Delete
                          onClick={() => deleteMediaHandle(row.id)}
                        ></Delete>
                      </FlexBox>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ProductList;
