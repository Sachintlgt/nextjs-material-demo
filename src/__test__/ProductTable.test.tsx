import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductTable from "../components/ProductTable";
import { IProducts } from "../interfaces/interfaces";
import { getProduct } from "@/services/products";

// Mock dependencies
jest.mock("@tanstack/react-table", () => ({
  useReactTable: jest.fn().mockReturnValue({
    getHeaderGroups: () => [],
    getRowModel: () => ({ rows: [] }),
    getState: () => ({}),
    getPagination: () => ({ pageIndex: 0, pageSize: 10 }),
    getPageCount: () => 1,
  }),
  createColumnHelper: jest.fn().mockReturnValue({
    accessor: jest.fn(),
    display: jest.fn(),
  }),
  getCoreRowModel: jest.fn(),
  getPaginationRowModel: jest.fn(),
}));
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => mockUsePathname,
}));

jest.mock("../services/products", () => ({
  getProduct: jest.fn(),
}));

jest.mock("../components/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

jest.mock("../components/Feedback", () => ({
  __esModule: true,
  default: ({ message }: { message: string }) => <div>{message}</div>,
}));

jest.mock("../components/ProductTable", () => ({
  __esModule: true,
  default: jest.fn(({data}) => (
    <div>
      Products
      <table>
        <tbody>
          {data.map((val: any) => {
            return (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.brand}</td>
                <td>{val.category}</td>
                <td>{val.description}</td>
                <td>{val.discountPercentage}</td>
                <td>{val.price}</td>
                <td>{val.rating}</td>
                <td>{val.stock}</td>
                <td>{val.title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  )),
}));

jest.mock("../components/CommonTable", () => ({
  __esModule: true,
  default: jest.fn(() => <table>Products</table>),
}));
// Mocking the getProduct function
jest.mock("../services/products", () => ({
  getProduct: jest.fn(),
}));

const mockData: IProducts[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Description 1",
    category: "Category 1",
    brand: "Brand 1",
    price: 100,
    discountPercentage: 10,
    rating: 4.5,
    stock: 50,
    tags: ["tag1", "tag2"],
  },
];

describe("ProductTable Component", () => {
  test("renders without crashing", () => {
    render(<ProductTable data={mockData} />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("renders table columns correctly", () => {
    render(<ProductTable data={mockData} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Brand 1")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });
});
