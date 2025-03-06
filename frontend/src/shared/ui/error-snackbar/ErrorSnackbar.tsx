import { ErrorSnackbarRef } from "@/shared";
import { Close as CloseIcon } from "@mui/icons-material";
import { IconButton, Snackbar, SnackbarCloseReason } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
  message?: string;
};

export const ErrorSnackbar = forwardRef<ErrorSnackbarRef, Props>(
  ({ message }, ref) => {
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        showError() {
          setIsSnackBarOpen(true);
        },
      };
    });

    const handleSnackBarClose = (
      _: React.SyntheticEvent | Event,
      reason?: SnackbarCloseReason
    ) => {
      if (reason === "clickaway") {
        return;
      }

      setIsSnackBarOpen(false);
    };

    const action = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    );

    return (
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
        message={message}
        action={action}
      />
    );
  }
);
