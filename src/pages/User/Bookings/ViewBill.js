import React, { useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MinsakthiLogo from "../../../assets/images/logo.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { getOrderByOrderId } from "../../../redux/User/BookingSlice";
import { toast } from "react-toastify";
import { getUserById } from "../../../redux/User/UserSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { bomAcceptance } from "../../../redux/Admin/ServiceSlice";

const ViewBill = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigateTo = useNavigate();
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [rejectQuote, setRejectQuote] = useState(false);
  const [rejectDes, setRejectDes] = useState();
  const [animateCard, setAnimateCard] = useState(false);

  const showEditCard = location.pathname.endsWith("/edit");

useEffect(() => {
  setTimeout(() => {
    setAnimateCard(true);
  }, 300); 
}, []);


  const handleDownloadPDF = () => {
    const input = document.querySelector(".orders-bill-card-container");
    html2canvas(input, {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: document.body.scrollWidth,
      windowHeight: input.scrollHeight,
      backgroundColor: null,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Minsakthi Bill.pdf");
    });
  };

  useEffect(() => {
    dispatch(getOrderByOrderId(orderId))
      .unwrap()
      .then((response) => setOrderData(response.data))
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!orderData?.customer) return;
    dispatch(getUserById(orderData?.customer))
      .unwrap()
      .then((response) => setUserData(response.data))
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch, orderData?.customer]);

    const handleAcceptOrRejectQuotation = async (status) => {
      try {
        const payload = {
          status: status,
          rejectionReason: rejectDes
        }
        await dispatch(bomAcceptance({ orderId: orderId, payload: payload }))
          .unwrap()
          .then((response) => {
            toast.success(response.message);
            setRejectQuote(false)
            navigateTo("/user/orders")
          });
      } catch (error) {
        toast.error(error);
      }
    };

  return (
    <div className="orders-bill-container">
      <div className="d-flex justify-content-end mt-4">
        <div
          className="orders-bill-download-pdf-btn m-3"
          onClick={handleDownloadPDF}
        >
          <HiOutlineDownload size={30} />
        </div>
      </div>
      <div className="orders-bill-card-container">
        <div className="d-md-flex justify-content-between align-items-center">
          <div className="orders-bill-head">
            <img src={MinsakthiLogo} className="orders-bill-logo" />
          </div>
          <div>
            <p className="fs-5 fw-bold text-primary mb-1">
              {orderData?.orderId || "N/A"}
            </p>
            <p className="mb-0">
              {orderData?.billOfMaterial?.generatedAt
                ? new Date(
                    orderData?.billOfMaterial?.generatedAt
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="d-md-flex justify-content-between">
          <div className="col-12 col-md-3">
            <p className="fw-bold mb-1">Service Type</p>
            <p className="text-muted mb-1">
              {orderData?.serviceType.charAt(0).toUpperCase() +
                orderData?.serviceType.slice(1) || "N/A"}
            </p>
          </div>
          <div className="col-12 col-md-3">
            <p className="fw-bold mb-1">Order Type</p>
            <p className="text-muted mb-1">{orderData?.orderType || "N/A"}</p>
          </div>
          <div className="col-12 col-md-3">
            <p className="fw-bold mb-1">Category</p>
            <p className="text-muted mb-1">
              {orderData?.serviceScope || "N/A"}
              {" - "}
              {orderData?.category || "N/A"}
            </p>
          </div>
        </div>
        <hr className="mt-4" />
        <div className="d-md-flex justify-content-between">
          <div className="col-12 col-md-3">
            <p className="fw-bold mb-1">Service Name</p>
            <p className="text-muted mb-1">{orderData?.serviceName || "N/A"}</p>
          </div>
          <div className="col-12 col-md-3">
            <p className="fw-bold mb-1">Issue Location</p>
            <p className="text-muted mb-1">
              {orderData?.issueLocation || "N/A"}
            </p>
          </div>
          <div className="col-12 col-md-3">
            <p className="fw-bold mb-1">Customer Name</p>
            <p className="text-muted mb-1">{userData?.fullName || "N/A"}</p>
          </div>
        </div>
        <hr className="mt-4" />
        <TableContainer
          sx={{
            height: "auto",
            overflow: "auto",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <Table
            stickyHeader
            sx={{
              width: "100%",
              border: "1px solid #DBDBDB",
              "& thead": {
                backgroundColor: "#2fb972",
              },
              "& thead th": {
                backgroundColor: "#2fb972",
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
                padding: "10px 0px !important",
              },
              "& tbody td": {
                textAlign: "center",
                padding: "15px 0px !important",
              },
              "& tbody tr:last-child td": {
                borderBottom: "none",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData?.billOfMaterial?.materialItems?.length > 0 ? (
                orderData?.billOfMaterial?.materialItems?.map((item, index) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.itemName || "N/A"}</TableCell>
                    <TableCell>{item.qty || 0}</TableCell>
                    <TableCell>{item.unitPrice || "N/A"}</TableCell>
                    <TableCell>{item.qty * item.unitPrice}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colspan={10}>No Items Found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="d-md-flex justify-content-between">
          <div className="orders-bill-user-address mt-4">
            <p className="fw-bold text-dark">Address:</p>
            <p className="fw-bold text-muted">{userData?.fullName || "N/A"}</p>
            <p className="text-muted">{userData?.emailAddress || "N/A"}</p>
            <p className="text-muted">{userData?.phoneNumber || "N/A"}</p>
            <p className="text-muted">{userData?.address || "N/A"}</p>
          </div>
          <div className="mt-4 d-flex flex-column">
            {[
              ["Material Cost", orderData?.billOfMaterial?.materialCost || 0],
              ["Service Charge", orderData?.billOfMaterial?.serviceCharge || 0],
              [
                "Additional Charges",
                orderData?.billOfMaterial?.additionalCharges || 0,
              ],
              ["Sub Total", orderData?.billOfMaterial?.subtotal || 0],
              ["Tax", `${orderData?.billOfMaterial?.taxPercentage || 0}%`],
              ["Tax Amount", orderData?.billOfMaterial?.taxAmount || 0],
              ["Total", orderData?.billOfMaterial?.totalPayable || 0],
            ].map(([label, value]) => (
              <div
                key={label}
                className="d-flex justify-content-between"
                style={{ width: "300px", marginBottom: "15px" }}
              >
                <span className={label === "Total" && "fw-bold"}>
                  {label} :
                </span>
                <span className={label === "Total" && "fw-bold"}>
                  {label !== "Tax" && "₹"}
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {(orderData?.billOfMaterial?.bomStatus === "Pending" || showEditCard) && (
        <div className={`orders-bill-flip-card  ${animateCard ? "show" : ""} ${rejectQuote ? "flipped" : ""}`}>
        <div className="orders-bill-flip-inner">
          <div className="orders-bill-flip-front">
            <p className="accept-quote-btn" onClick={() => handleAcceptOrRejectQuotation("Approved")}>Accept Quotation</p>
            <p
              className="reject-quote-btn"
              onClick={() => setRejectQuote(true)}>
              Reject Quotation
            </p>
          </div>
          <div className="orders-bill-flip-back p-3">
            <Form.Group as={Col}>
              <Form.Label className="fw-bold">
                Describe the Rejection Reason
              </Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="rejectionReason"
                  value={rejectDes}
                  onChange={(e)=> setRejectDes(e.target.value)}
                  placeholder="Please provide as much detail as possible..."
                />
                <InputGroup.Text
                  onClick={() => handleAcceptOrRejectQuotation("Rejected")}
                  style={{
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <IoMdCheckmarkCircleOutline color="#2fb972" size={16} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ViewBill;
