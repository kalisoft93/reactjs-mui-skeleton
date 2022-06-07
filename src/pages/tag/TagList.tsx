import { Add, Delete } from "@mui/icons-material";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button, Box } from "@mui/material";
import useTag from "hooks/tag/useTag";
import React, { useEffect, useState } from "react";
import CRUDTagDialog from "./CRUDTagDialog";

interface Column {
    id: 'id' | 'title' | 'categories';
    label: string;
    minWidth?: number;
    width?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: readonly Column[] = [
    { id: "id", label: 'ID', width: 70 },
    { id: 'title', label: 'Cím', width: 100 },
    { id: 'categories', label: 'Kategóriák'}
  ];
  
 

  const TagList = () => {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const {getTags} = useTag();

    const init = (page = 1) => {
      getTags(page).then((tagData) => {
        setRowsPerPage(tagData.per_page);
        setRows(tagData.data);
      });
    }

    useEffect(() => {
      init(page);
    }, [page]);

   
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);

    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
    };

    const closeDialogHandle = (status) => {
      setOpen(status);
      init(1);
    }
  
    return (
      
      <Box>
        { open && <CRUDTagDialog open={open} callback={(status) => closeDialogHandle(status)}></CRUDTagDialog>}
        <Button onClick={() => setOpen(true)} variant="contained" startIcon={<Add sx={{color: 'common.white'}}></Add>}>
          Hozzaadás
        </Button>
        <TableContainer sx={{ maxHeight: '100%' }}>
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
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                   
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
  }

  export default TagList;