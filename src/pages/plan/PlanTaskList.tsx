import { Add, Edit, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import FlexBox from "components/shared/FlexBox";
import useAbilityPurpose from "hooks/ability/useAbilityPurpose";
import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import usePlan from "hooks/plan/usePlan";
import CRUDPlanTaskDialog from "./CRUDPlanDIalog";

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

const PlanTaskList = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = useState(null);

  const [defaultData, setDefaultData] = useState<any>();

  const { getPlanTaskList, showPlanTask } = usePlan();

  const init = (page = 1, searchTerm = null) => {
    getPlanTaskList(page, searchTerm).then((tagData) => {
      setRowsPerPage(tagData.per_page);
      setRows(tagData.data);
    });
  };

  useEffect(() => {
    init(page);

    return () => {
      debouncedResults.cancel();
    };
  }, [page]);

  useEffect(() => {
    init(1, searchTerm);
  }, [searchTerm]);

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
  };

  const editPlanTaskHandle = (id) => {
    showPlanTask(id).then((data) => {
      setDefaultData(data);
      setOpenUpdate(true);
    });
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  return (
    <Box>
      {open && (
        <CRUDPlanTaskDialog
          maxWidth="xl"
          open={open}
          title={"Tevékenység hozzaadás"}
          saveBtnLabel={"Hozzaadás"}
          callback={(status) => closeDialogHandle(status)}
        ></CRUDPlanTaskDialog>
      )}
      {openUpdate && (
        <CRUDPlanTaskDialog
          maxWidth="xl"
          open={openUpdate}
          title={"Tevékenység szerkesztése"}
          saveBtnLabel={"Mentés"}
          defaults={defaultData}
          callback={(status) => closeUpdateDialogHandle(status)}
        ></CRUDPlanTaskDialog>
      )}
      <FlexBox
        justifyContent="space-between"
        alignItems="center"
        columnGap="10px"
      >
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<Add sx={{ color: "common.white" }}></Add>}
        >
          Hozzaadás
        </Button>
        <TextField
          variant="standard"
          onChange={debouncedResults}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        ></TextField>
      </FlexBox>

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
                      <FlexBox columnGap="10px">
                        <Edit onClick={() => editPlanTaskHandle(row.id)}></Edit>
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

export default PlanTaskList;
