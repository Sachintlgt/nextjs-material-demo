import { Table } from "@tanstack/react-table";

export interface IAPIStatus {
  loading: boolean;
  error: string;
  message: string;
}

export interface ICommonButton {
  title: string;
  onClickHandler?: any;
  variant: "contained" | "outlined" | "text";
  type: "button" | "submit";
  disabled: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'info',
  size?: 'large' | 'medium' | 'small'
}
export interface IProducts {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  reviews?: {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
  }[];
}

export interface IModal {
    open: boolean
    handleClose: any
    children: any
}
export interface ITable {
  table: Table<IProducts>
  heading: string
}
export interface IFeedback {
  rating: number
  reviewerName: string
  comment: string
  date: string
}