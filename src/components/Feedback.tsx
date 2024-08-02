import { IFeedback } from "@/interfaces/interfaces"
import { Rating, Typography } from "@mui/material"
import styled from '@emotion/styled';

// Styled component for the .feedback class
const FeedbackStyledDiv = styled.div`
  background-color: #f5f5f5a3; /* Semi-transparent background */
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Feedback: React.FC<IFeedback> = ({comment, date, rating, reviewerName}) => {
    return  <FeedbackStyledDiv>
    <Typography variant="h5">{reviewerName} </Typography>
    <Rating value={rating} readOnly={true} />
    <Typography variant="body1">{comment}</Typography>
  </FeedbackStyledDiv>
}   
export default Feedback