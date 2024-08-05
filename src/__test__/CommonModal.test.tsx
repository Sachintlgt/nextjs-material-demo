import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for better assertions
import CommonModal from '../components/CommonModal'; // Adjust the import path as necessary
import { IModal } from '../interfaces/interfaces';

describe('CommonModal', () => {
  const mockHandleClose = jest.fn();

  const renderModal = (props: Partial<IModal> = {}) => {
    return render(
      <CommonModal
        handleClose={mockHandleClose}
        open={true}
        {...props}
      >
        <div>Modal Content</div>
      </CommonModal>
    );
  };
  test('should render modal when open is true', () => {
    renderModal();

    expect(screen.getByTestId('modal-dialog')).toBeInTheDocument();
  });
});
