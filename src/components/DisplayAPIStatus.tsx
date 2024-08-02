'use client'
import { IAPIStatus } from "@/interfaces/interfaces"
import styled from '@emotion/styled';

// Styled component for the .error class
const Error = styled.div`
  color: red;
`;


export const DisplayAPIStatus: React.FC<IAPIStatus> = ({error, message}) => {
    return error ? <Error>{error}</Error> : message
}