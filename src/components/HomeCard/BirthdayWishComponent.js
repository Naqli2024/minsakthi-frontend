import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { BsCake2 } from "react-icons/bs";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

const BirthdayWishComponent = ({ userData }) => {
  const [openBirthDayWishModal, setOpenBirthDayWishModal] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

useEffect(() => {
  if (userData?.dob) {
    const userBirthDate = userData.dob.slice(5, 10);
    const currentDate = new Date().toISOString().slice(5, 10);
    const wishKey = `birthdayWishShown_${currentDate}`;
    const isAlreadyShown = Cookies.get(wishKey);

    // Only show if it's the user's birthday AND cookie not yet set
    if (userBirthDate === currentDate && !isAlreadyShown) {
      setOpenBirthDayWishModal(true);

      // Set cookie so it doesn’t show again today (expires at midnight)
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      Cookies.set(wishKey, "true", { expires: midnight });
    }
  }
}, [userData]);

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AnimatePresence>
      {openBirthDayWishModal && (
        <>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={250}
            gravity={0.25}
            colors={["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF9CEE"]}
          />

          <Dialog
            open={openBirthDayWishModal}
            onClose={() => setOpenBirthDayWishModal(false)}
            sx={{
              "& .MuiDialog-paper": {
                width: "500px",
                maxWidth: "100vw",
                borderRadius: "20px",
                background: "linear-gradient(145deg, #fff7e6, #fff)",
                boxShadow: "0 8px 30px rgba(255, 183, 77, 0.4)",
                overflow: "hidden",
              },
            }}
          >
            <DialogTitle sx={{ padding: 0 }}>
              <div className="d-flex justify-content-end p-3">
                <MdOutlineCancel
                  color="#3F3F3F"
                  cursor="pointer"
                  size={25}
                  onClick={() => setOpenBirthDayWishModal(false)}
                />
              </div>
            </DialogTitle>

            <DialogContent>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                className="text-center py-3"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                  className="mb-3"
                >
                  <BsCake2
                    size={60}
                    color="#FF6B6B"
                    style={{
                      filter: "drop-shadow(0 0 10px rgba(255, 107, 107, 0.6))",
                    }}
                  />
                </motion.div>

                <motion.h2
                className="birthday-text"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  🎉 Happy Birthday 🎊
                </motion.h2>

                <p className="fw-bold mt-2 wish-name">
                  {userData?.fullName.toUpperCase()}   
                </p> 
                <p className="text-center mb-3 px-3 wish-description">
                  ✨ Wishing you joy, success, and happiness on your special day —
                  from all of us at <strong style={{ color: "#2FB972" }}>MinSakthi </strong>!🎁
                </p>
              </motion.div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </AnimatePresence>
  );
};

export default BirthdayWishComponent;
