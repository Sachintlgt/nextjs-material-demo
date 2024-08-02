import { IModal } from "@/interfaces/interfaces";
import { Box, Modal } from "@mui/material";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
/** A common Modal which can be used and modified as per requirement */
const CommonModal: React.FC<IModal> = ({handleClose, open, children}) => {
    return <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {children}
    </Box>
  </Modal>
}
export default CommonModal;