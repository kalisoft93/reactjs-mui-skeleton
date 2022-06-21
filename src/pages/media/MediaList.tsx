import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import useMedia from "hooks/media/useMedia";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useState } from "react";
import CRUDMediaDialog from "./CRUDMediaDialog";

interface Column {
  id: "id" | "label" | "type" | "parsedUrl" | "action" | "created_at";
  label: string;
  minWidth?: number;
  width?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", width: 70 },
  { id: "label", label: "Címke", width: 100 },
  { id: "type", label: "Típus", width: 50 },
  { id: "parsedUrl", label: "URL" },
  { id: "created_at", label: "Dátum" }
];

const MediaList = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { getMediaList, deleteMedia } = useMedia();
  const notifier = useSnackbar();

  const init = (page = 1) => {
    getMediaList(page).then((tagData) => {
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
    init(1);
  };

  const deleteMediaHandle = (id) => {
    deleteMedia(id).then(() => {
      notifier.enqueueSnackbar('Sikeres mentés', {variant: 'success'});
      init();
    });
  }

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
        <CRUDMediaDialog
          open={open}
          callback={(status) => closeDialogHandle(status)}
        ></CRUDMediaDialog>
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
                    <TableCell sx={{cursor: "pointer"}}  key={"action"}>
                      <Delete onClick={() => deleteMediaHandle(row.id)}></Delete>
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

export default MediaList;
