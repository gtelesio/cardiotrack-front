import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type AlertType = {
  isOpen: boolean;
  disagree: string;
  agree: string;
  message: string;
  title: string;
  onClose: any;
};

export default function Alert({
  isOpen,
  disagree,
  agree,
  message,
  title,
  onClose,
}: AlertType) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{disagree}</Button>
          <Button onClick={handleClose} autoFocus>
            {agree}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
