"use client";
import { IModal, IProducts } from "@/interfaces/interfaces";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";
import CommonButton from "./CommonButton";
import { getProduct } from "@/services/products";
import CommonModal from "./CommonModal";
import Loader from "./Loader";
import Feedback from "./Feedback";
import CommonTable from "./CommonTable";
import styled from '@emotion/styled';
import { withAuth } from "@/hoc/withAuth";

// Styled component for the .feedbacks class
const Feedbacks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/** This one will display all the products */
const ProductTable: React.FC<{ data: IProducts[] }> = ({ data }) => {
  const columnHelper = createColumnHelper<IProducts>();
  const [modalData, setModalData] = useState<Partial<IModal>>({
    children: <></>,
    open: false,
  });
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("description", {
      header: "Description",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("category", {
      header: 'Category',
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("brand", {
      header: "Brand",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("price", {
      header: "Price",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("discountPercentage", {
      header: "Discount",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("rating", {
      header: "Rating",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("tags", {
      header: "Tags",
      footer: (info) => info.column.id,
    }),
    columnHelper.display({
      id: "View Reviews",
      header: "View Reviews",
      cell: (props) => (
        <CommonButton
          title="View"
          type="button"
          variant="contained"
          disabled={false}
          onClickHandler={async () => {
            const id: number = props.row.getValue("id");
            setModalData({
              children: (
                <>
                  <Loader />
                </>
              ),
              open: true,
            });
            // make api req to get the product info
            let respone: any = await getProduct(id);
            respone = await respone.json();
            console.log((respone as IProducts).reviews);
            setModalData({
              children: (
                <Feedbacks>
                  {(respone as IProducts).reviews?.map((val, index) => {
                    return <Feedback {...val} key={index} />
                  })}
                </Feedbacks>
              ),
              open: true,
            });
          }}
        />
      ),
    }),
  ];
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  return (
    <>
      <CommonTable heading="Products" table={table} />
      <CommonModal
        open={modalData.open as boolean}
        children={modalData.children}
        handleClose={() => {
          setModalData({ ...modalData, open: false });
        }}
      />
    </>
  );
};

export default withAuth(ProductTable);
