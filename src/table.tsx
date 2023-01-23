import {
  ColumnFiltersState,
  ExpandedState,
  FilterFn,
  GroupingState,
  PaginationState,
  Row,
  SortingState,
  TableOptions,
  TableState,
  Updater,
  VisibilityState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  RankingInfo,
  compareItems,
  rankItem,
} from "@tanstack/match-sorter-utils";
import { SxProps, Theme } from "@mui/material";

import Box from "@mui/material/Box";
import { CheckboxHeaderCell } from "./components/selection";
import { ColorStyleOptions } from "./style";
import { ColumnSelectRT } from "./utils";
import { DebouncedInput } from "./components/input";
import { HeaderCell } from "./components/header";
import LinearProgress from "@mui/material/LinearProgress";
import { Pagination } from "./components/pagination";
import Paper from "@mui/material/Paper";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow } from "./components/group";
import TableRowMui from "@mui/material/TableRow";
import { useDebounce } from "./hooks/useDebounce";

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

interface TableProperties<T extends Record<string, unknown>>
  extends Omit<TableOptions<T>, "getCoreRowModel"> {
  //   tableKey: string;
  //   defaultGrouping: string[];
  //   defaultVisibilityState: Record<string, boolean>;
  children?: React.ReactNode;
  getRowStyling?: (row: Row<T>) => ColorStyleOptions | undefined;
  setSelected?: (rows: Row<T>[]) => void;
  selectedIds?: number[];
  preserveSelected?: boolean;
  isLoading: boolean;
  enableSelection?: boolean;
  tableState: TableState;
  setTableState: (
    value: TableState | ((val: TableState) => TableState)
  ) => void;
  tableContainerStyle: SxProps<Theme>;
}

export function TuTable<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const {
    columns,
    children,
    getRowStyling,
    setSelected,
    preserveSelected,
    selectedIds,
    enableSelection,
    setTableState,
    tableState,
    tableContainerStyle,
  } = props;

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  useEffect(() => {
    setPagination(tableState.pagination);
  }, []);

  const debouncedStatement = useDebounce<PaginationState>(
    { pageIndex, pageSize },
    1000
  );

  useEffect(() => {
    setTableState((prev) => {
      return { ...prev, pagination: debouncedStatement };
    });
  }, [debouncedStatement]);

  const [globalFilter, setGlobalFilter] = React.useState("");

  function updateGrouping(update: Updater<GroupingState>) {
    const grouping =
      update instanceof Function ? update(tableState.grouping) : update;
    setTableState((prev) => {
      return { ...prev, grouping };
    });
  }

  function updateColumnFilters(update: Updater<ColumnFiltersState>) {
    const columnFilters =
      update instanceof Function ? update(tableState.columnFilters) : update;
    setTableState((prev) => {
      return { ...prev, columnFilters };
    });
  }

  function updateVisibility(update: Updater<VisibilityState>) {
    const columnVisibility =
      update instanceof Function ? update(tableState.columnVisibility) : update;
    setTableState((prev) => {
      return { ...prev, columnVisibility };
    });
  }
  function updateExpanded(update: Updater<ExpandedState>) {
    const expanded =
      update instanceof Function ? update(tableState.expanded) : update;

    setTableState((prev) => {
      return { ...prev, expanded };
    });
  }

  function updateSorting(update: Updater<SortingState>) {
    const sorting =
      update instanceof Function ? update(tableState.sorting) : update;

    setTableState((prev) => {
      return { ...prev, sorting };
    });
  }

  /**Table instance */
  const table = useReactTable<T>({
    ...props,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    autoResetExpanded: false,
    state: { ...tableState, pagination: { pageIndex, pageSize }, globalFilter },
    enableRowSelection: true,
    enableMultiRowSelection: true,
    enableSubRowSelection: true,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onColumnFiltersChange: updateColumnFilters,
    onGroupingChange: updateGrouping,
    onColumnVisibilityChange: updateVisibility,
    onExpandedChange: updateExpanded,
    onSortingChange: updateSorting,
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
  });

  function getRowClassName(row: Row<T>) {
    if (getRowStyling !== undefined) {
      const className = getRowStyling(row);
      if (className !== undefined) {
        return `tu-table--${className}`;
      }
    }
    return "";
  }

  const [selectedRows, setSelectedRows] = useState<Row<T>[]>([]);

  useEffect(() => {
    if (selectedIds)
      setSelectedRows(
        table.getPreFilteredRowModel().rows.filter((r) => {
          return selectedIds.find((o) => o === r.getValue("id"));
        })
      );
  }, [selectedIds, table]);

  /**
   * Handle Row Selection:
   *
   * 1. Click + CMD/CTRL - Select multiple rows
   * 2. Click + SHIFT - Range Select multiple rows
   * 3. Single Click - Select only one row
   */
  const handleRowSelection = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>, row: Row<T>) => {
      // See if row is already selected
      const selectedRowIds = selectedRows?.map((r) => r.id) ?? [];
      const selectIndex = selectedRowIds.indexOf(row.id);
      const isSelected = selectIndex > -1;

      let updatedSelectedRows = [...(selectedRows ? selectedRows : [])];
      if (
        event.ctrlKey ||
        event.metaKey ||
        (preserveSelected && !event.shiftKey)
      ) {
        // 1. Click + CMD/CTRL - select multiple rows

        // Remove clicked element from list
        if (isSelected) {
          updatedSelectedRows.splice(selectIndex, 1);
        } else {
          updatedSelectedRows.push(row);
        }
      } else if (event.shiftKey) {
        // 2. Click + SHIFT - Range Select multiple rows

        if (selectedRows?.length) {
          const lastSelectedRow = selectedRows[0];
          // Calculate array indexes and reset selected rows
          const lastIndex = table.getRowModel().rows.indexOf(lastSelectedRow);
          const currentIndex = table.getRowModel().rows.indexOf(row);

          updatedSelectedRows = [];
          if (lastIndex < currentIndex) {
            for (let i = lastIndex; i <= currentIndex; i++) {
              const selectedRow = table.getRowModel().rows[i];
              if (!selectedRow.getIsGrouped()) {
                updatedSelectedRows.push(selectedRow);
              }
            }
          } else {
            for (let i = currentIndex; i <= lastIndex; i++) {
              const selectedRow = table.getRowModel().rows[i];
              if (!selectedRow.getIsGrouped()) {
                updatedSelectedRows.push(selectedRow);
              }
            }
          }
        } else {
          // No rows previously selected, select only current row
          updatedSelectedRows = [row];
        }
      } else {
        // 3. Single Click - Select only one row

        if (isSelected && updatedSelectedRows.length === 1) {
          updatedSelectedRows = [];
        } else {
          updatedSelectedRows = [row];
        }
      }

      if (setSelected && enableSelection) {
        setSelectedRows(updatedSelectedRows);
        setSelected(updatedSelectedRows);
      }
    },
    [selectedRows, preserveSelected, setSelected, enableSelection, table]
  );

  return (
    <>
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Box sx={{ display: "flex", height: "4em" }}>
          <Box sx={{ padding: 2 }}>
            <DebouncedInput
              label="Søk i alle kolonner"
              name="search"
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }}>{children}</Box>
          <ColumnSelectRT instance={table} />
        </Box>
        <Table
          style={{ overflowX: "auto" }}
          role="grid"
          size="small"
          aria-label="Table"
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRowMui key={headerGroup.id}>
                {enableSelection && (
                  <CheckboxHeaderCell
                    setSelected={setSelected}
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    table={table}
                  />
                )}
                {headerGroup.headers.map((header) => {
                  return (
                    <HeaderCell key={header.id} header={header} table={table} />
                  );
                })}
              </TableRowMui>
            ))}
          </TableHead>
          <TableBody>
            {props.isLoading && (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length}>
                  <LinearProgress sx={{ width: "100%" }} />
                </td>
              </tr>
            )}
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow<T>
                  enableSelection={enableSelection}
                  handleRowSelection={handleRowSelection}
                  key={row.id}
                  row={row}
                  state={tableState}
                  isSelected={!!selectedRows?.find((r) => r.id === row.id)}
                  rowClassName={getRowClassName(row)}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination table={table} />
    </>
  );
}
