import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdOutlineExpandMore } from "react-icons/md";
import { getOrderByOrderId } from "../../../../redux/User/BookingSlice";
import { IoArrowBackOutline } from "react-icons/io5";

const ViewServiceProcessDetails = ({ backToList, orderId }) => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (!orderId) return;

    dispatch(getOrderByOrderId(orderId))
      .unwrap()
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => toast.error(error.message));
  }, [dispatch, orderId]);

  const getColor = (index) => {
    const gradients = [
      "linear-gradient(135deg, #E8FFF5, #DFFFEA)", // 1 mint light
      "linear-gradient(135deg, #FFF4E6, #FFEBD9)", // 2 peach light (updated)
      "linear-gradient(135deg, #EFF4FF, #E4EBFF)", // 3 cool pale blue (updated)
      "linear-gradient(135deg, #FFF8E8, #FFF1D6)", // 4 mild sand (updated)
      "linear-gradient(135deg, #F3FFEA, #E8FFD7)", // 5 fresh green fog (updated)
      "linear-gradient(135deg, #FFF0F6, #FFE4F0)", // 6 soft pink (new)
      "linear-gradient(135deg, #EFFFFF, #DFFFFF)", // 7 aqua breeze (new)
    ];

    return gradients[index % gradients.length];
  };

  const getBorderColor = (index) => {
    const borderColors = [
      "#76c7a1", // 1 mint dark
      "#d79b6c", // 2 peach brownish (updated)
      "#6f8fd9", // 3 blue mid-tone (updated)
      "#d6a446", // 4 golden sand (updated)
      "#75bb64", // 5 natural green (updated)
      "#d4669e", // 6 deep rose pink (new)
      "#50b6b6", // 7 teal aqua (new)
    ];

    return borderColors[index % borderColors.length];
  };

  return (
    <div className="admin-pl-new-service-process">
      <h1 className="admin-pl-new-service-process-header">
        <IoArrowBackOutline
          size={20}
          cursor={"Pointer"}
          onClick={backToList}
          className="me-2"
        />
        Service Processes
      </h1>
      <p className="text-muted">
        Order ID: <span>{orderId}</span>
      </p>
      <div>
        <div className="mt-4 d-flex flex-column align-items-center">
          {orderData.processes
            ?.slice()
            ?.sort((a, b) => a.order - b.order)
            .map((orderProc, pIndex) => (
              <div
                key={`proc-${pIndex}`}
                className="d-flex align-items-center mb-4"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    borderRadius: "12px",
                    background: getColor(pIndex),
                    padding: "12px 8px",
                    width: "100%",
                    border: `1px solid ${getBorderColor(pIndex)}`,
                  }}
                >
                  <Accordion
                    style={{
                      borderRadius: "10px",
                      background: "transparent",
                      boxShadow: "none",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<MdOutlineExpandMore size={20} />}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="px-3 py-2"
                          style={{
                            backgroundColor: getBorderColor(pIndex),
                            border: `1px solid ${getBorderColor(pIndex)}`,
                            borderRadius: "50%",
                            color: "white",
                          }}
                        >
                          {pIndex + 1}
                        </div>
                        <div className="d-flex flex-column ms-3">
                          <p className="text-muted fw-bold mb-1">
                            {orderProc.processName}
                          </p>
                          <p className="text-muted mb-1">
                            {orderProc.processDescription}
                          </p>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails
                      style={{
                        borderTop: `1px solid ${getBorderColor(pIndex)}`,
                      }}
                    >
                      <p className="fw-bold text-muted">Sub Process</p>
                      {orderProc.subProcesses?.map((subProc, sIndex) => (
                        <div
                          key={`api-sub-${pIndex}-${sIndex}`}
                          className="mb-3 d-flex align-items-center gap-3"
                        >
                          <div className="admin-pl-count mb-3">
                            {sIndex + 1}
                          </div>
                          <div className="d-flex flex-column">
                            <p className="fw-bold text-muted mb-1">
                              {subProc.name}
                            </p>
                            <p className="text-muted">
                              {subProc.subProcessDescription}
                            </p>
                          </div>
                        </div>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewServiceProcessDetails;
