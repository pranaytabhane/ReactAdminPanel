import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-image-lightbox/style.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import ApiClient from "../../api-client";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Spinner,
  CardImg,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { generateTempPassword } from "../../utils/common";

function AddCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePicPrev, setProfilePicPrev] = useState();
  const [loader, setLoader] = useState(false);
  const [inputName, setInputName] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    profilePic: "",
  });

  const validate = () => {
    const errors = {};
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }
    if (formData.phoneNumber && formData.phoneNumber.toString().length !== 9) {
      errors.phoneNumber = "Phone number is invalid";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    return errors;
  };

  useEffect(() => {
    if (inputName) {
      const validationErrors = validate();
      setErrors((previousData) => {
        return {
          ...previousData,
          [inputName]: validationErrors[inputName] || "",
        };
      });
    }
  }, [inputName, formData]);

  const handleImageChange = (e) => {
    setFormData((previousData) => {
      return {
        ...previousData,
        profilePic: e.target.files[0],
      };
    });
    setProfilePicPrev(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (
      (name == "phoneNumber" || name == "pincode") &&
      !parseInt(value, 10) &&
      (name == "phoneNumber" || name == "pincode") &&
      value
    ) {
      return;
    }
    setFormData((previousData) => {
      return {
        ...previousData,
        [name]:
          (name == "phoneNumber" || name == "pincode") && value
            ? parseInt(value, 10)
            : value,
      };
    });
    setInputName(name);
  };

  const resetForm = () => {
    setProfilePicPrev("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      address1: "",
      address2: "",
      city: "",
      pincode: "",
      profilePic: "",
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoader(true);
      try {
        let registerFormData = new FormData();
        let updateFormData = new FormData();
        const tempPass = generateTempPassword();
        for (const key in formData) {
          if (key == "firstName" || key == "lastName" || key == "email") {
            registerFormData.append(key, formData[key]);
          } else {
            updateFormData.append(key, formData[key]);
          }
        }
        registerFormData.append("role", "customer");
        updateFormData.append("role", "customer");
        registerFormData.append("password", tempPass);
        registerFormData.append("confirmPassword", tempPass);
        //Register customer first and the update their details
        const registerCustomer = await ApiClient._postFormData(
          `users/signup/customer`,
          registerFormData,
          true,
          dispatch
        );
        if (registerCustomer.status) {
          toast.success(registerCustomer.message, { autoClose: 3000 });
          //Update customer details
          updateFormData.append("id", registerCustomer?.data?._id);
          const updateCustomer = await ApiClient._putFormData(
            `users/updateprofile`,
            updateFormData,
            true,
            dispatch
          );
          if (updateCustomer.status) {
            resetForm();
            setLoader(false);
            navigate("/admin/customer/list")
          }
        }
      } catch (error) {
        toast.error(error.response.data.message, { autoClose: 3000 });
      }
    }
  };

  return (
    <>
      <div className="content">
        <Button
          color="primary"
          className="ml-10 common-button"
          onClick={() => navigate("/admin/customer/list")}
        >
          <IoMdArrowRoundBack /> Back
        </Button>
        <Container>
          <Card>
            <CardBody className="mb-15">
              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label for="firstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && (
                        <div className="error-message">{errors.firstName}</div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="lastName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && (
                        <div className="error-message">{errors.lastName}</div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label for="phoneNumber">Phone Number</Label>
                      <Input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                      {errors.phoneNumber && (
                        <div className="error-message">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="gender">Gender</Label>
                      <Input
                        type="select"
                        name="gender"
                        id="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="dateOfBirth">Date of birth</Label>
                      <Input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="address1">Address1</Label>
                      <Input
                        type="text"
                        name="address1"
                        id="address1"
                        value={formData.address1}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="address2">Address2</Label>
                      <Input
                        type="text"
                        name="address2"
                        id="address2"
                        value={formData.address2}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label for="pincode">Pincode</Label>
                      <Input
                        type="text"
                        name="pincode"
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4"></Col>
                </Row>
                <Row>
                  <Col md="4">
                    <FormGroup className="upload_files">
                      <Label for="profilePic">Customer profile</Label>
                      <Input
                        type="file"
                        name="profilePic"
                        id="profilePic"
                        accept=".jpeg, .jpg, .png"
                        className="file-input"
                        onChange={handleImageChange}
                      />
                      {profilePicPrev && (
                        <CardImg
                          alt="Thumbnail"
                          className="img-preview-small"
                          src={profilePicPrev}
                          top
                        />
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Button
                  className="common-button"
                  onClick={handleSubmit}
                  color="primary"
                >
                  {"Add Customer"} {loader && <Spinner size="sm" />}
                </Button>{" "}
                <Button className="common-button-secondary" onClick={resetForm}>
                  Reset
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default AddCustomer;
