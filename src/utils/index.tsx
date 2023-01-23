/* eslint-disable @typescript-eslint/ban-types */
import { Column, Table } from "@tanstack/react-table";
import React, { ReactElement } from "react";

import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import { ColumnFilter } from "../components/columFilter";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";

type ColumnHidePageProps<T extends Record<string, unknown>> = {
  instance: Table<T>;
};
export function ColumnSelectRT<T extends Record<string, unknown>>({
  instance,
}: ColumnHidePageProps<T>): ReactElement | null {
  const [open, setOpen] = React.useState(false);
  // const { allColumns, toggleHideColumn } = instance;
  const hideableColumns = instance
    .getAllColumns()
    .filter((column) => !(column.id === "actions"));
  const checkedCount = hideableColumns.reduce(
    (acc, val) => acc + (val.getIsVisible() ? 0 : 1),
    0
  );

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length;

  return (
    <>
      <Button
        style={{ margin: "10px", marginLeft: 0 }}
        variant="contained"
        color="info"
        onClick={() => setOpen(true)}
      >
        Velg kolonner
      </Button>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Velg kolonner</DialogTitle>
        <DialogContent dividers>
          <FormControl component="fieldset">
            <FormLabel component="legend">Velg kolonner</FormLabel>
            <FormGroup>
              {instance
                .getAllLeafColumns()
                .filter((column) => !(column.id === "actions"))
                .map((c) => (
                  <FormControlLabel
                    key={c.id}
                    control={
                      <Switch
                        name={c.id}
                        color="primary"
                        size="small"
                        disabled={c.getIsVisible() && onlyOneOptionLeft}
                      />
                    }
                    onChange={c.getToggleVisibilityHandler()}
                    checked={c.getIsVisible()}
                    label={c.columnDef.header?.toString()}
                  />
                ))}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)}>
            lukk
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

interface ColumnActionProps<T extends {}> {
  column: Column<T, unknown>;
  table: Table<T>;
}
export function ColumnAction<T extends {}>({
  column,
  table,
}: ColumnActionProps<T>) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="kolonne meny"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={close}
      >
        {column.getCanSort() && [
          <MenuItem key="removeSort">
            <Button
              disabled={!column.getIsSorted()}
              variant="text"
              startIcon={<ClearIcon />}
              onClick={() => column.clearSorting()}
            >
              Fjern sortering
            </Button>
          </MenuItem>,
          <MenuItem key="raisingSort">
            <Button
              disabled={column.getIsSorted() === "asc"}
              variant="text"
              startIcon={<KeyboardArrowUpIcon />}
              onClick={() => column.toggleSorting(false)}
            >
              Sorter stigende
            </Button>
          </MenuItem>,
          <MenuItem key="downSort">
            <Button
              disabled={column.getIsSorted() === "desc"}
              variant="text"
              startIcon={<KeyboardArrowDownIcon />}
              onClick={() => column.toggleSorting(true)}
            >
              Sorter synkende
            </Button>
          </MenuItem>,
        ]}
        {column.getCanFilter() && (
          <MenuItem>
            <ColumnFilter column={column} table={table} />
          </MenuItem>
        )}
      </Menu>
    </>
  );
}
