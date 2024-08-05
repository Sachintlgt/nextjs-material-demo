import { ICommonButton } from "@/interfaces/interfaces";
import { Button } from "@mui/material";

/** A common btn which can be used and modified as per requirement */
const CommonButton: React.FC<ICommonButton> = ({
    onClickHandler,
    title,
    variant,
    type,
    disabled = false,
    color,
    size = 'medium'
}) => {
  return (
    <Button data-testid="btn" size={size} color={color ? color : 'primary'} disabled={disabled} type={type} onClick={onClickHandler} variant={variant}>{title}</Button>
  );
}
export default CommonButton;
