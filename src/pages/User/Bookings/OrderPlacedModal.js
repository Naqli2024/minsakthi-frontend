import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
} from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";

const OrderPlacedModal = ({ open, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "420px",
          borderRadius: "20px",
          textAlign: "center",
          overflow: "hidden",
          paddingBottom: "15px",
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <MdOutlineCancel
          size={25}
          color="#777"
          cursor="pointer"
          onClick={onClose}
        />
      </DialogTitle>

      <DialogContent>
        <div className="success-animation-wrapper">
          <svg
            className={`checkmark ${animate ? "animate" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14 27l7 7 16-16"
            />
          </svg>
        </div>

        <h4 className="fw-bold mt-3 mb-2" style={{ color: "#2e7d32" }}>
          Order Placed Successfully!
        </h4>
        <p className="text-muted mb-3">Your order has been confirmed 🎉</p>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#2fb972",
            borderRadius: "25px",
            textTransform: "none",
            px: 4,
            "&:hover": { backgroundColor: "#256628" },
          }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderPlacedModal;
