import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ConfirmDialogProps } from 'models/types';
import { FC } from 'react';

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  children,
  open,
  setOpen,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='confirm-dialog'
    >
      <DialogTitle id='confirm-dialog' style={{fontWeight: 550}}>{title.toUpperCase()}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => setOpen(false)}
          color='primary'
        >
          Нет
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color='error'
        >
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
