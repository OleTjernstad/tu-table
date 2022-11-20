/* eslint-disable @typescript-eslint/ban-types */
import { Cell, Row, TableState, flexRender } from "@tanstack/react-table";

import Button from "@mui/material/Button";
import { CheckboxCell } from "./selection";
import React from "react";
import TableCellMui from "@mui/material/TableCell";
import TableRowMui from "@mui/material/TableRow";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

interface TableRowProps<T extends {}> {
  row: Row<T>;
  state: TableState;
  isSelected: boolean;
  rowClassName: string;
  enableSelection: boolean | undefined;
  handleRowSelection: (
    event: React.MouseEvent<HTMLButtonElement>,
    row: Row<T>
  ) => void;
}
export function TableRow<T extends {}>({
  row,
  state,
  rowClassName,
  isSelected,
  enableSelection,
  handleRowSelection,
}: TableRowProps<T>) {
  return (
    <TableRowMui
      data-row-index={row.index}
      data-row-is-group-row={row.getIsGrouped() ? 1 : undefined}
      style={{
        cursor: !row.getIsGrouped() ? "pointer" : "auto",
      }}
      className={`${rowClassName} ${
        !row.getIsGrouped() && "tu-table-selectable"
      } ${isSelected && "Mui-selected"}`}
    >
      {enableSelection && !row.getIsGrouped() && (
        <CheckboxCell<T>
          handleRowSelection={handleRowSelection}
          row={row}
          isSelected={isSelected}
        />
      )}
      {row.getVisibleCells().map((cell) => {
        return <TableCell key={cell.id} cell={cell} state={state} />;
      })}
    </TableRowMui>
  );
}

interface TableCellProps<T extends {}> {
  cell: Cell<T, unknown>;
  state: TableState;
}
export function TableCell<T extends {}>({ cell }: TableCellProps<T>) {
  if (cell.getIsGrouped() || cell.row.getIsGrouped())
    return (
      <TableCellMui
        data-is-action={cell.column.id === "action" ? 1 : undefined}
        aria-describedby="rowActionDescription"
      >
        {cell.getIsGrouped() ? (
          // If it's a grouped cell, add an expander and row count
          <>
            <Button
              {...{
                onClick: cell.row.getToggleExpandedHandler(),
                style: {
                  cursor: cell.row.getCanExpand() ? "pointer" : "normal",
                },
              }}
              variant="text"
              size="small"
              startIcon={
                cell.row.getIsExpanded() ? (
                  <UnfoldLessIcon />
                ) : (
                  <UnfoldMoreIcon />
                )
              }
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())} (
              {cell.row.subRows.length})
            </Button>
          </>
        ) : cell.getIsAggregated() ? (
          // If the cell is aggregated, use the Aggregated
          // renderer for cell
          flexRender(
            cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
            cell.getContext()
          )
        ) : cell.getIsPlaceholder() ? null : cell.row.getIsGrouped() ? (
          <span></span>
        ) : null}
      </TableCellMui>
    );

  return (
    <TableCellMui aria-describedby="rowActionDescription">
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCellMui>
  );
}
