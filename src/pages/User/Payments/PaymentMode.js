import { MdOutlineCancel } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderPlacedModal from "../Bookings/OrderPlacedModal";

const PaymentMode = () => {
  const [openPaymentModeModal, setOpenPaymentModeModal] = useState(true);
  const [openOrderPlacedModal, setOpenOrderPlacedModal] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (openOrderPlacedModal) {
      const timer = setTimeout(() => {
        setOpenOrderPlacedModal(false);
        navigateTo("/user/orders");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [openOrderPlacedModal, navigateTo]);

  return (
    <div>
      <Dialog
        open={openPaymentModeModal}
        onClose={() => navigateTo("/user/new-bookings")}
        sx={{
          "& .MuiDialog-paper": {
            width: "480px",
            borderRadius: "20px",
            padding: "10px 0",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: "16px 24px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ margin: 0, fontWeight: "600", color: "#333" }}>
            Select Payment Mode
          </h5>
          <MdOutlineCancel
            color="#555"
            cursor="pointer"
            size={24}
            onClick={() => navigateTo("/user/new-bookings")}
          />
        </DialogTitle>

        <DialogContent sx={{ padding: "24px" }}>
          <div className="payment-mode-container">
            <div
              className="payment-option"
              onClick={() => {
                setOpenPaymentModeModal(false);
                setOpenOrderPlacedModal(true);
              }}
            >
              <FaMoneyBillWave size={25} color="#2fb972" />
              <div>
                <h6>Cash on Delivery</h6>
                <p>Pay directly when the service is completed</p>
              </div>
            </div>
            <div
              className="payment-option"
              onClick={() => {
                setOpenPaymentModeModal(false);
                setOpenOrderPlacedModal(true);
              }}
            >
              <FaCreditCard size={25} color="#2fb972" />
              <div>
                <h6>Online Payment</h6>
                <p>Pay securely using UPI, Card, or Wallet</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {openOrderPlacedModal && (
        <OrderPlacedModal
          open={openOrderPlacedModal}
          onClose={() => navigateTo("/user/orders")}
        />
      )}
    </div>
  );
};

export default PaymentMode;
