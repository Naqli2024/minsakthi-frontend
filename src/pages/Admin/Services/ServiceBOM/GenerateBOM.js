import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  getAllOrders,
  getOrderByOrderId,
} from "../../../../redux/User/BookingSlice";
import { toast } from "react-toastify";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import { editBOM, generateBOM } from "../../../../redux/Admin/ServiceSlice";
import { MdAdd } from "react-icons/md";
import { FiMinusCircle } from "react-icons/fi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Loader from "../../../../components/Loader";

const GenerateBOM = ({ backToList, orderId, viewBOM, setTableOrderData, isEditBOM }) => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getOrderByOrderId(orderId))
      .unwrap()
      .then((res) => setOrderData(res?.data || []))
      .catch((error) => toast.error(error));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    serviceType: "",
    materialItems: [
      {
        itemName: "",
        qty: "",
        unitPrice: "",
      },
    ],
    serviceCharge: "",
    additionalCharges: "",
    taxPercentage: "",
  });

  useEffect(() => {
    if (orderData) {
      setFormData((prev) => ({
        ...prev,
        serviceType: orderData.serviceType || "",
      }));
    }
  }, [orderData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMaterialChange = (e, index) => {
    const { name, value } = e.target;

    const updated = [...formData.materialItems];
    updated[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      materialItems: updated,
    }));
  };

  const addMaterialItem = () => {
    setFormData((prev) => ({
      ...prev,
      materialItems: [
        ...prev.materialItems,
        { itemName: "", qty: "", unitPrice: "" },
      ],
    }));
  };

  const removeMaterialItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      materialItems: prev.materialItems.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      serviceCharge: Number(formData.serviceCharge),
      additionalCharges: Number(formData.additionalCharges),
      taxPercentage: Number(formData.taxPercentage),
      materialItems: formData.materialItems.map((item) => ({
        itemName: item.itemName,
        qty: Number(item.qty),
        unitPrice: Number(item.unitPrice),
      })),
    };

    try {
    setLoading(true)
     const response = isEditBOM
    ? await dispatch(editBOM({ orderId, payload })).unwrap()
    : await dispatch(generateBOM({ orderId, payload })).unwrap()
          toast.success(response.message);
          setLoading(false)
          backToList();
          dispatch(getAllOrders())
            .unwrap()
            .then((res) => setTableOrderData(res?.data || []));
    } catch (err) {
      toast.error(err);
      setLoading(false)
    }
  };

useEffect(() => {
  if (!isEditBOM || !orderData?.billOfMaterial) return;

  setFormData({
    serviceType: orderData?.serviceType || "",
    materialItems: orderData?.billOfMaterial?.materialItems?.length
      ? orderData.billOfMaterial.materialItems.map(item => ({
          itemName: item.itemName || "",
          qty: item.qty || "",
          unitPrice: item.unitPrice || "",
        }))
      : [{ itemName: "", qty: "", unitPrice: "" }],
    serviceCharge: orderData?.billOfMaterial?.serviceCharge|| "",
    additionalCharges: orderData?.billOfMaterial?.additionalCharges || "",
    taxPercentage: orderData?.billOfMaterial?.taxPercentage || "",
  });
}, [isEditBOM, orderData]);


  return (
    <div className="admin-generate-bom-container">
      {loading && <Loader isLoading={loading} />}
      <h1 className="admin-generate-bom-container-header">
        <IoArrowBackOutline
          size={20}
          cursor={"Pointer"}
          onClick={backToList}
          className="me-2"
        />
        Generate Bill Of Materials
      </h1>
      <div className="admin-generate-bom-top-content">
        <div>
          <p className="fw-bold mb-2">Order ID:</p>
          <p className="admin-generate-bom-orderid-tag">
            {orderData?.orderId || "N/A"}
          </p>
        </div>
        <div>
          <p className="fw-bold mb-2">Service Name:</p>
          <p>{orderData?.serviceName || "N/A"}</p>
        </div>
        <div>
          <p className="fw-bold mb-2">Service Type:</p>
          <p>
            <span className="admin-generate-bom-scope-tag">
              {orderData?.serviceScope}
            </span>
          </p>
        </div>
        <div>
          <p className="fw-bold mb-2">Category:</p>
          <p>{orderData?.category || "N/A"}</p>
        </div>
        <div>
          <p className="fw-bold mb-2">Order Type:</p>
          <p>{orderData?.orderType || "N/A"}</p>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-5 mb-3">
        <h1 className="fw-bold">Material Items</h1>
        {!viewBOM && (
          <div
            className="admin-generate-bom-item-btn"
            onClick={addMaterialItem}
          >
            <MdAdd size={15} />
            Add Item
          </div>
        )}
      </div>
      {!viewBOM ? (
        <div>
          {formData.materialItems.map((item, index) => (
            <div key={index} className="admin-generate-bom-bottom-content mb-3">
              <Form.Group className="col-md-4">
                <Form.Label className="fw-bold">Item Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={item.itemName}
                  onChange={(e) => handleMaterialChange(e, index)}
                />
              </Form.Group>

              <Form.Group className="col-md-3">
                <Form.Label className="fw-bold">Qty:</Form.Label>
                <Form.Control
                  type="number"
                  name="qty"
                  value={item.qty}
                  onChange={(e) => handleMaterialChange(e, index)}
                />
              </Form.Group>

              <Form.Group className="col-md-3">
                <Form.Label className="fw-bold">Unit Price:</Form.Label>
                <Form.Control
                  type="number"
                  name="unitPrice"
                  value={item.unitPrice}
                  onChange={(e) => handleMaterialChange(e, index)}
                />
              </Form.Group>
              <div>
                {formData.materialItems.length > 1 && (
                  <FiMinusCircle
                    size={18}
                    color="red"
                    cursor={"Pointer"}
                    onClick={() => removeMaterialItem(index)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TableContainer
          sx={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            maxHeight: "450px",
            overflow: "auto",
          }}
        >
          <Table
            stickyHeader
            sx={{
              width: "100%",
              border: "1px solid #DBDBDB",
              "& thead": { backgroundColor: "#2fb972" },
              "& thead th": {
                backgroundColor: "#2fb972",
                color: "#fff",
                fontWeight: 600,
                textAlign: "center",
              },
              "& tbody td": { textAlign: "center" },
              "& tbody tr:last-child td": { borderBottom: "none" },
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
      )}

      <div className="d-flex justify-content-end my-4">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center">
            <Form.Label className="bom-label">Service Charge:</Form.Label>
            {!viewBOM ? (
              <InputGroup>
                <Form.Control
                  type="number"
                  name="serviceCharge"
                  value={formData.serviceCharge}
                  onChange={handleChange}
                />
              </InputGroup>
            ) : (
              <p>₹{orderData?.billOfMaterial?.serviceCharge || 0}</p>
            )}
          </div>

          <div className="d-flex align-items-center">
            <Form.Label className="bom-label">Additional Charges:</Form.Label>
            {!viewBOM ? (
              <InputGroup>
                <Form.Control
                  type="number"
                  name="additionalCharges"
                  value={formData.additionalCharges}
                  onChange={handleChange}
                />
              </InputGroup>
            ) : (
              <p>₹{orderData?.billOfMaterial?.additionalCharges || 0}</p>
            )}
          </div>

          <div className="d-flex align-items-center">
            <Form.Label className="bom-label">Tax (%):</Form.Label>
            {!viewBOM ? (
              <InputGroup>
                <Form.Control
                  type="number"
                  name="taxPercentage"
                  value={formData.taxPercentage}
                  onChange={handleChange}
                />
              </InputGroup>
            ) : (
              <p>{orderData?.billOfMaterial?.taxPercentage || 0}%</p>
            )}
          </div>
          {viewBOM && (
            <p className="d-flex align-items-center fw-bold">
              <span className="bom-label">Total:</span>₹
              {orderData?.billOfMaterial?.totalPayable || 0}
            </p>
          )}
        </div>
      </div>
      {!viewBOM && (
        <div className="d-md-flex justify-content-center">
          <div className="admin-pl-create-btn px-5" onClick={handleSubmit}>
            {isEditBOM ? "Edit BOM" : "Create BOM"}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateBOM;
