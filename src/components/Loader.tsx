import { CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const LoaderStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// for loading state
const Loader = () => {
  return (
    <LoaderStyle>
      <CircularProgress />
    </LoaderStyle>
  );
};
export default Loader;
