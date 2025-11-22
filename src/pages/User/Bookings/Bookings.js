import React, { useEffect, useState } from "react";
import SuperCoin from "../../../assets/images/supercoin.svg";
import CancelBooking from "../../../assets/images/cancel-booking.svg";
import { MdAdd } from "react-icons/md";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { InputGroup, Form } from "react-bootstrap";
import { CiFilter } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Button from "@mui/material/Button";
import { IoIosEye } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import { MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import TrackLocation from "./TrackLocation";
import Drawer from "@mui/material/Drawer";
import { MdReport } from "react-icons/md";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import {
  deleteOrderByOrderId,
  getAllDeletedOrder,
  getOrderByCustomer,
  orderRating,
} from "../../../redux/User/BookingSlice";

const Bookings = () => {
  const navigateTo = useNavigate();
  const [value, setValue] = useState("1");
  const [openTrackLocation, setOpenTrackLocation] = useState(false);
  const [openCancelBookingModal, setOpenCancelBookingModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openRatingsDialog, setOpenRatingsDialog] = useState(false);
  const dispatch = useDispatch();
  const userId = Cookies.get("userId");
  const [orderData, setOrderData] = useState();
  const [deletedOrderData, setDeleteOrderData] = useState();
  const [viewOrderData, setViewOrderData] = useState();
  const [orderId, setOrderId] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchDeletedQuery, setSearchDeletedQuery] = useState("");
  const [selectedDeletedFilter, setSelectedDeletedFilter] = useState("All");
  const [selectedDeletedSort, setSelectedDeletedSort] = useState("");
  const [selectedDeletedDate, setSelectedDeletedDate] = useState("");
  const closeDrawer = () => setDrawerOpen(false);
  const completedOrders = orderData?.filter(
    (o) => o.orderStatus === "Completed"
  );
  const allOrders = orderData;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleViewDetail = (orderData) => {
    setViewOrderData(orderData);
    setDrawerOpen(true);
  };

  useEffect(() => {
    dispatch(getOrderByCustomer(userId))
      .unwrap()
      .then((response) => setOrderData(response.data))
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDeletedOrder(userId))
      .unwrap()
      .then((response) => {
        setDeleteOrderData(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [dispatch]);

  const handleDelete = (e) => {
    try {
      dispatch(deleteOrderByOrderId(orderId))
        .unwrap()
        .then((response) => {
          toast.success(response.message);
          setOpenCancelBookingModal(false);
          dispatch(getOrderByCustomer(userId)).then((response) =>
            setOrderData(response.data)
          );
        });
    } catch (error) {
      toast.error(error);
    }
  };

  const filteredOrders = React.useMemo(() => {
    if (!orderData) return [];

    let filtered = [...orderData];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(query) ||
          order.serviceName?.toLowerCase().includes(query) ||
          order.category?.toLowerCase().includes(query) ||
          order.issueLocation?.toLowerCase().includes(query)
      );
    }

    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (order) =>
          order.serviceName?.toLowerCase() === selectedFilter.toLowerCase() ||
          order.category?.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    if (selectedDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.serviceRequiredDate)
          .toISOString()
          .split("T")[0];
        return orderDate === selectedDate;
      });
    }

    if (selectedSort === "A - Z") {
      filtered.sort((a, b) =>
        a.serviceName?.localeCompare(b.serviceName || "")
      );
    } else if (selectedSort === "Z - A") {
      filtered.sort((a, b) =>
        b.serviceName?.localeCompare(a.serviceName || "")
      );
    }

    return filtered;
  }, [orderData, searchQuery, selectedFilter, selectedSort, selectedDate]);

  const filteredDeletedOrders = React.useMemo(() => {
    if (!deletedOrderData) return [];

    let filtered = [...deletedOrderData];

    if (searchDeletedQuery.trim()) {
      const query = searchDeletedQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          (order.orderId?.toLowerCase() || "").includes(query) ||
          (order.serviceName?.toLowerCase() || "").includes(query) ||
          (order.category?.toLowerCase() || "").includes(query) ||
          (order.issueLocation?.toLowerCase() || "").includes(query)
      );
    }

    if (selectedDeletedFilter !== "All") {
      filtered = filtered.filter(
        (order) =>
          order.serviceName?.toLowerCase() ===
            selectedDeletedFilter.toLowerCase() ||
          order.category?.toLowerCase() === selectedDeletedFilter.toLowerCase()
      );
    }

    if (selectedDeletedDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.serviceRequiredDate)
          .toISOString()
          .split("T")[0];
        return orderDate === selectedDeletedDate;
      });
    }

    if (selectedDeletedSort === "A - Z") {
      filtered.sort((a, b) =>
        a.serviceName?.localeCompare(b.serviceName || "")
      );
    } else if (selectedDeletedSort === "Z - A") {
      filtered.sort((a, b) =>
        b.serviceName?.localeCompare(a.serviceName || "")
      );
    }

    return filtered;
  }, [
    deletedOrderData,
    searchDeletedQuery,
    selectedDeletedFilter,
    selectedDeletedSort,
    selectedDeletedDate,
  ]);

  const handleSubmit = (e) =>{
    e.preventDefault() 
    const payload = {
      orderId,
      rating
    }
    dispatch(orderRating(payload))
    .unwrap()
    .then((response) =>{
      toast.success(response.message)
      setOpenRatingsDialog(false)
      setRating(0)
    }).catch((error) => {
       toast.error(error)
    })
  }

  return (
    <div>
      {openTrackLocation ? (
        <TrackLocation backToItems={() => setOpenTrackLocation(false)} />
      ) : (
        <div className="booking-overall-content">
          <div className="bookings-head">
            <h3>Orders</h3>
            <p className="super-coin">
              <img src={SuperCoin} className="me-2" />0
            </p>
          </div>
          <button
            className=" new-booking-btn"
            onClick={() => navigateTo("/user/new-bookings")}
          >
            <MdAdd size={18} />
            New Booking
          </button>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    "& .MuiTab-root": {
                      textTransform: "capitalize",
                      color: "#413F3F",
                    },
                    "& .Mui-selected": {
                      color: "#27ae60 !important",
                    },
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#27ae60",
                    },
                  }}
                >
                  <Tab label="All" value="1" />
                  <Tab label="Completed" value="2" />
                  <Tab label="Cancelled" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {allOrders?.length > 0 && (
                  <div className="booking-header-bar">
                    <div className="booking-search">
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            className="booking-search-input"
                            placeholder="Search by Order ID, Service, Location..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                    <div className="booking-filter">
                      <PopupState variant="popover" popupId="filter-menu">
                        {(popupState) => (
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<CiFilter size={15} />}
                              {...bindTrigger(popupState)}
                              sx={{
                                color: "black",
                                borderColor: "#E5E9F0",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedFilter === "All"
                                ? "Filter"
                                : `Filter: ${selectedFilter}`}
                            </Button>

                            <Menu {...bindMenu(popupState)}>
                              {[
                                "All",
                                "Eb Complaints",
                                "Electrical",
                                "Contract",
                              ].map((filter) => (
                                <MenuItem
                                  key={filter}
                                  onClick={() => {
                                    setSelectedFilter(filter);
                                    popupState.close();
                                  }}
                                >
                                  {filter}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        )}
                      </PopupState>
                      <PopupState variant="popover" popupId="sort-menu">
                        {(popupState) => (
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<IoFilterOutline size={15} />}
                              {...bindTrigger(popupState)}
                              sx={{
                                color: "black",
                                borderColor: "#E5E9F0",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedSort || "Sort"}
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                              {["A - Z", "Z - A"].map(
                                (sort) => (
                                  <MenuItem
                                    key={sort}
                                    onClick={() => {
                                      setSelectedSort(sort);
                                      popupState.close();
                                    }}
                                  >
                                    {sort}
                                  </MenuItem>
                                )
                              )}
                            </Menu>
                          </>
                        )}
                      </PopupState>
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            type="date"
                            className="date-picker"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Button
                        variant="outlined"
                        startIcon={<MdOutlineRefresh />}
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedFilter("All");
                          setSelectedSort("");
                          setSelectedDate("");
                        }}
                        sx={{
                          color: "black",
                          borderColor: "#E5E9F0",
                          borderRadius: "5px",
                          textTransform: "capitalize",
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
                <div className="all-bookings-container">
                  {filteredOrders?.length > 0 ? (
                    filteredOrders.map((order, index) => (
                      <div className="booking-container">
                        <div className="booking-content">
                          <div>
                            <p className="booking-id">
                              Order ID: {order.orderId}
                            </p>
                            <p className="booking-address mt-3">
                              {order.serviceName}
                            </p>
                            <p className="booking-address">
                              {order.issueLocation}{" "}
                              <span className="ms-md-5">
                                {order.serviceRequiredDate
                                  ? new Date(
                                      order.serviceRequiredDate
                                    ).toLocaleDateString()
                                  : ""}
                              </span>
                            </p>
                            <div className="booking-actions">
                              <button
                                className="btn view"
                                onClick={() => handleViewDetail(order)}
                              >
                                <IoIosEye />
                                View Details
                              </button>
                              <button
                                className="btn track"
                                onClick={() => setOpenTrackLocation(true)}
                              >
                                <MdLocationPin />
                                Track location
                              </button>
                              <button
                                className="btn cancel"
                                onClick={() => {
                                  setOpenCancelBookingModal(true);
                                  setOrderId(order.orderId);
                                }}
                              >
                                <MdOutlineCancel />
                                Cancel booking
                              </button>
                              <button
                                className="btn rate"
                                onClick={() => {
                                  setOpenRatingsDialog(true); 
                                  setOrderId(order.orderId)}}
                              >
                                <MdStarRate />
                                Rate Our Service
                              </button>
                              <button className="btn invoice">
                                <MdDownload />
                                Download Invoice
                              </button>
                            </div>
                          </div>
                          <div>
                            <p
                              className={`${
                                order.orderStatus === "Completed"
                                  ? "completed-status"
                                  : order.orderStatus === "Cancelled"
                                  ? "cancelled-status"
                                  : "confirmed-status"
                              } mt-3`}
                            >
                              {order.orderStatus}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center mt-5">No orders found </p>
                  )}
                </div>
              </TabPanel>
              <TabPanel value="2">
                {completedOrders?.length > 0 && (
                  <div className="booking-header-bar">
                    <div className="booking-search">
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            className="booking-search-input"
                            placeholder="Search by Order ID, Service, Location..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                    <div className="booking-filter">
                      <PopupState variant="popover" popupId="filter-menu">
                        {(popupState) => (
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<CiFilter size={15} />}
                              {...bindTrigger(popupState)}
                              sx={{
                                color: "black",
                                borderColor: "#E5E9F0",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedFilter === "All"
                                ? "Filter"
                                : `Filter: ${selectedFilter}`}
                            </Button>

                            <Menu {...bindMenu(popupState)}>
                              {[
                                "All",
                                "Eb Complaints",
                                "Electrical",
                                "Contract",
                              ].map((filter) => (
                                <MenuItem
                                  key={filter}
                                  onClick={() => {
                                    setSelectedFilter(filter);
                                    popupState.close();
                                  }}
                                >
                                  {filter}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        )}
                      </PopupState>
                      <PopupState variant="popover" popupId="sort-menu">
                        {(popupState) => (
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<IoFilterOutline size={15} />}
                              {...bindTrigger(popupState)}
                              sx={{
                                color: "black",
                                borderColor: "#E5E9F0",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedSort || "Sort"}
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                              {["A - Z", "Z - A"].map(
                                (sort) => (
                                  <MenuItem
                                    key={sort}
                                    onClick={() => {
                                      setSelectedSort(sort);
                                      popupState.close();
                                    }}
                                  >
                                    {sort}
                                  </MenuItem>
                                )
                              )}
                            </Menu>
                          </>
                        )}
                      </PopupState>
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            type="date"
                            className="date-picker"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </InputGroup>
                      </Form.Group>
                      <Button
                        variant="outlined"
                        startIcon={<MdOutlineRefresh />}
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedFilter("All");
                          setSelectedSort("");
                          setSelectedDate("");
                        }}
                        sx={{
                          color: "black",
                          borderColor: "#E5E9F0",
                          borderRadius: "5px",
                          textTransform: "capitalize",
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
                <div className="all-bookings-container">
                  {orderData?.filter(
                    (order) => order.orderStatus === "Completed"
                  ).length > 0 ? (
                    orderData
                      .filter((order) => order.orderStatus === "Completed")
                      .map((order, index) => (
                        <div key={index} className="booking-container">
                          <div className="booking-content">
                            <div>
                              <p className="booking-id">
                                Order ID: {order.orderId}
                              </p>
                              <p className="booking-address mt-3">
                                {order.serviceName}
                              </p>
                              <p className="booking-address">
                                {order.issueLocation}{" "}
                                <span className="ms-md-5">
                                  {order.serviceRequiredDate
                                    ? new Date(
                                        order.serviceRequiredDate
                                      ).toLocaleDateString()
                                    : ""}
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="completed-status mt-3">
                                {order.orderStatus}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p className="text-center mt-5">
                      No completed orders found
                    </p>
                  )}
                </div>
              </TabPanel>
              <TabPanel value="3">
                {deletedOrderData?.length > 0 && (
                  <div className="booking-header-bar">
                    <div className="booking-search">
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            className="booking-search-input"
                            placeholder="Search by Order ID, Service, Location..."
                            type="text"
                            value={searchDeletedQuery}
                            onChange={(e) =>
                              setSearchDeletedQuery(e.target.value)
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                    </div>
                    <div className="booking-filter">
                      <PopupState variant="popover" popupId="filter-menu">
                        {(popupState) => (
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<CiFilter size={15} />}
                              {...bindTrigger(popupState)}
                              sx={{
                                color: "black",
                                borderColor: "#E5E9F0",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedFilter === "All"
                                ? "Filter"
                                : `Filter: ${selectedFilter}`}
                            </Button>

                            <Menu {...bindMenu(popupState)}>
                              {[
                                "All",
                                "Eb Complaints",
                                "Electrical",
                                "Contract",
                              ].map((filter) => (
                                <MenuItem
                                  key={filter}
                                  onClick={() => {
                                    setSelectedDeletedFilter(filter);
                                    popupState.close();
                                  }}
                                >
                                  {filter}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        )}
                      </PopupState>
                      <PopupState variant="popover" popupId="sort-menu">
                        {(popupState) => (
                          <>
                            <Button
                              variant="outlined"
                              startIcon={<IoFilterOutline size={15} />}
                              {...bindTrigger(popupState)}
                              sx={{
                                color: "black",
                                borderColor: "#E5E9F0",
                                borderRadius: "5px",
                                textTransform: "capitalize",
                              }}
                            >
                              {selectedDeletedSort || "Sort"}
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                              {["A - Z", "Z - A"].map(
                                (sort) => (
                                  <MenuItem
                                    key={sort}
                                    onClick={() => {
                                      setSelectedDeletedSort(sort);
                                      popupState.close();
                                    }}
                                  >
                                    {sort}
                                  </MenuItem>
                                )
                              )}
                            </Menu>
                          </>
                        )}
                      </PopupState>
                      <Form.Group>
                        <InputGroup>
                          <Form.Control
                            type="date"
                            className="date-picker"
                            value={selectedDeletedDate}
                            onChange={(e) =>
                              setSelectedDeletedDate(e.target.value)
                            }
                          />
                        </InputGroup>
                      </Form.Group>
                      <Button
                        variant="outlined"
                        startIcon={<MdOutlineRefresh />}
                        onClick={() => {
                          setSearchDeletedQuery("");
                          setSelectedDeletedFilter("All");
                          setSelectedDeletedSort("");
                          setSelectedDeletedDate("");
                        }}
                        sx={{
                          color: "black",
                          borderColor: "#E5E9F0",
                          borderRadius: "5px",
                          textTransform: "capitalize",
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
                <div className="all-bookings-container">
                  {filteredDeletedOrders?.length > 0 ? (
                    filteredDeletedOrders?.map((order, index) => (
                      <div className="booking-container">
                        <div className="booking-content">
                          <div>
                            <p className="booking-id">
                              Order ID: {order.originalOrderId}
                            </p>
                            <p className="booking-address mt-3">
                              {order.serviceName}
                            </p>
                            <p className="booking-address">
                              {order.issueLocation}{" "}
                              <span className="ms-md-5">
                                {order.serviceRequiredDate
                                  ? new Date(
                                      order.serviceRequiredDate
                                    ).toLocaleDateString()
                                  : ""}
                              </span>
                            </p>
                            <div className="booking-actions">
                              <button
                                className="btn view"
                                onClick={() => handleViewDetail(order)}
                              >
                                <IoIosEye />
                                View Details
                              </button>
                            </div>
                          </div>
                          <div>
                            <p className="cancelled-status">
                              Cancelled
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center mt-5">No orders found </p>
                  )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}

      {/********** Cancel Booking Modal ********/}
      <Dialog
        open={openCancelBookingModal}
        onClose={() => setOpenCancelBookingModal(false)}
        sx={{
          "& .MuiDialog-paper": { width: "600px", maxWidth: "100vw" },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="d-flex justify-content-end p-3">
            <MdOutlineCancel
              cursor="pointer"
              size={25}
              onClick={() => setOpenCancelBookingModal(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="congrats-logo">
            <img src={CancelBooking} alt="congrats" />
          </div>
          <div className="d-flex justify-content-center m-3 fw-bold">
            Are you sure you want to cancel the booking?
          </div>
          <div className="new-user-text ">
            If you cancel now, Your booking details will be lost,
            <br />
            and you'll need to start again.
          </div>
        </DialogContent>
        <DialogActions className="d-md-flex align-items-center justify-content-center m-3">
          <Button
            className="address-modal-btn text-white px-5 text-capitalize"
            onClick={() => setOpenCancelBookingModal(false)}
          >
            No, Continue
          </Button>
          <Button
            className="bg-danger border-0 text-white px-5 text-capitalize"
            onClick={handleDelete}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/********** Ratings Modal ********/}
      <Dialog
        open={openRatingsDialog}
        onClose={() => setOpenRatingsDialog(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "400px",
            maxWidth: "100vw",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle sx={{ padding: 0 }}>
          <div className="new-booking-dialog-header px-4 py-3">
            <p className="m-0 fw-bold">Rate Our Service</p>
            <MdOutlineCancel
              color="#ffff"
              cursor="pointer"
              size={25}
              onClick={() => setOpenRatingsDialog(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <p className="d-flex justify-content-center text-center text-muted mt-5 fw-bold">
            A Spark Of Your Ratings Can Light Big Improvements!
          </p>
          <div className="star-rating d-flex justify-content-center align-items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <MdStarRate
                key={star}
                size={40}
                style={{ cursor: "pointer" }}
                color={star <= (hover || rating) ? "#FFD700" : "#ccc"}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions className="mb-2 d-md-flex align-items-center justify-content-center mx-5">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#2fb972",
              borderRadius: "8px",
              textTransform: "none",
              px: 4,
              "&:hover": { backgroundColor: "#256628" },
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/********** View Bookings Details Drawer ********/}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            width: "800px",
            mx: "auto",
          },
        }}
      >
        <Box className="drawer-booking-details">
          <div className="new-booking-dialog-header px-3 py-3">
            <p className="m-0 fw-bold">View Details</p>
            <MdOutlineCancel
              color="white"
              cursor="pointer"
              size={25}
              onClick={closeDrawer}
            />
          </div>
          <div className="booking-view-details">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="fw-bold">
                Order ID: {viewOrderData?.orderId || viewOrderData?.originalOrderId  || "N/A"}
              </h4>
              <div
                className="report-btn"
                onClick={() => navigateTo("/user/help-support")}
              >
                <MdReport size={20} />
                Report
              </div>
            </div>
            <div className="px-3 py-5 row gap-5">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <p className="fw-bold mb-2">Service Type</p>
                    <p className="text-muted">
                      {viewOrderData?.serviceScope || "N/A"} -{" "}
                      {viewOrderData?.serviceType.charAt(0).toUpperCase() +
                        viewOrderData?.serviceType.slice(1) || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="fw-bold mb-2">Order Type</p>
                    <p className="text-muted">
                      {viewOrderData?.orderType || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Category</p>
                    <p className="text-muted">
                      {viewOrderData?.category || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Service Name</p>
                    <p className="text-muted">
                      {viewOrderData?.serviceName || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Service Provider</p>
                    <div className="d-flex">
                      <div className="view-details-avatar"></div>
                      <div className="ms-3">
                        <p className="text-muted mb-1">Rahul</p>
                        <p className="text-muted">123-456</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mt-4">
                    <p className="fw-bold mb-2">Status</p>
                    <p
                      className={`${
                        viewOrderData?.orderStatus === "Completed"
                          ? "completed-status"
                          : viewOrderData?.orderStatus === "Confirmed"
                          ? "confirmed-status"
                          : "cancelled-status"
                      } mt-3 text-center`}
                    >
                      {viewOrderData?.orderStatus || "Cancelled"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Service Address</p>
                    <p className="text-muted">
                      {viewOrderData?.issueLocation || "N/A"}
                    </p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <p className="fw-bold mb-2">Scheduled Date</p>
                    <p className="text-muted">
                      {viewOrderData?.serviceRequiredDate
                        ? new Date(
                            viewOrderData.serviceRequiredDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <p className="fw-bold text-left">Picture of the Issue</p>
                <div className="booking-view-details-card">
                  {viewOrderData?.pictureOfTheIssue ? (
                    <img
                      src={viewOrderData.pictureOfTheIssue}
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <p className="mt-3">No image uploaded</p>
                  )}
                </div>
                <p className="fw-bold text-left mt-4 mb-2">
                  Recorded Voice of the Issue
                </p>
                <div className="booking-view-details-card">
                  {viewOrderData?.voiceRecordOfTheIssue ? (
                    <audio
                      src={viewOrderData.voiceRecordOfTheIssue}
                      controls
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <p className="mt-3">No voice message available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default Bookings;
