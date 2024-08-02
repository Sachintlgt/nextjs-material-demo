import { ITable } from "@/interfaces/interfaces"
import CommonButton from "./CommonButton";

import styled from '@emotion/styled';

// Styled component for the .pagination class
const PaginationStyledDiv = styled.div`
  padding: 0 30px;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: end;
  margin-top: 15px;
`;

// Styled component for the .pagination span selector
const PaginationSpan = styled.span`
  display: flex;
  gap: 8px;
`;

// this will show pagination
const Pagination: React.FC<Partial<ITable>> = ({table}) => {
    return table && <PaginationStyledDiv>
    <CommonButton
      title="<"
      type="button"
      variant="contained"
      onClickHandler={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      color="info"
      size="small"
    >
    </CommonButton>
   
    <PaginationSpan>
      <strong>
        {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount().toLocaleString()}
      </strong>
    </PaginationSpan>

    <CommonButton
      title=">"
      type="button"
      variant="contained"
      onClickHandler={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      color="info"
      size="small"
    >
    </CommonButton>
  </PaginationStyledDiv>
}
export default Pagination;