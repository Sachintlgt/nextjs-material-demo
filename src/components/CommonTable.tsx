import { ITable } from "@/interfaces/interfaces";
import { flexRender } from "@tanstack/react-table";
import Pagination from "./Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import styled from '@emotion/styled';
import { clearLocalStorage } from "@/utils/utility";

// Styled component for the .common-table-outer class
const CommonTableOuter = styled.div`
  background-color: #EEF2F6;
  padding: 30px;
`;

// Styled component for the .card class
const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
`;

// Styled component for the .card-header class
const CardHeader = styled.div`
  padding: 15px 30px;
  border-bottom: 1px solid #E0E0E0;
  display: flex;
  justify-content: space-between;
`;
/** A common table which can be used and modified as per requirement */
const CommonTable: React.FC<ITable> = ({ table, heading }) => {
  return (
    <CommonTableOuter>
      <Card>
        <CardHeader>
          <Typography>{heading}</Typography>
          <a href="javascript:" onClick={() => {clearLocalStorage(); window.location.reload()}}>Logout</a>
        </CardHeader>
        <Table
          sx={{
            display: "block",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <TableCell
                    sx={{
                      color: "#121926",
                      fontWeight: 700,
                      fontFamily: "Roboto",
                    }}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ backgroundColor: index % 2 === 0 ? "#F5F5F5" : "#fff" }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    sx={{
                      color: "#121926",
                      fontWeight: 300,
                      fontFamily: "Roboto",
                      border: "0.5px solid #E0E0E0",
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* display pagination */}
      <Pagination table={table} />
    </CommonTableOuter>
  );
};
export default CommonTable;
