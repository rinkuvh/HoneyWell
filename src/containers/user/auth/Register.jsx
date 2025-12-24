import React, { useEffect, useState } from "react";
import Index from "../../Index";
import PageIndex from "../../PageIndex";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAllCollegeServices,
  getAllDistrictServices,
  getAllTalukaServices,
  userRegisterModalService,
} from "../../../redux/services/AdminService";
import { userRegisterSchema } from "../../../validations/Schema";
import DarkLight from "../../web/pages/webLayout/DarkLight";
import { Link } from "react-router-dom";
import { getAllSemesterServices, getAllStreamServices } from "../../../redux/services/UserService";


export default function Register() {
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState({
    register: false,
    googleRegister: false,
  });
  const [isError, setIsError] = useState("");
  const [districtListData, setDistrictListData] = useState([]);
  const [districtDataId, setDistrictDataId] = useState("");
  const [talukaListData, setTalukaListData] = useState([]);
  const [collegeListdata, setCollegeListdata] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [streamOptions, setStreamOptions] = useState([]);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownConfirmPassword = () => {
    event.preventDefault();
  };
  const handleMouseDownPassword = () => {
    event.preventDefault();
  };

  const initialValues = {
    name: "",
    dob: "",
    // college_id: "",
    contactNumber: "",
    email: "",
    gender: "",
    taluka_id: "",
    district: "",
    password: "",
    // sponsoringOrganisation: "",
    pwdOption: "",
    confirmPassword: "",
    college_name: "",
    accept_policy: true,
    institute_type: "",
    otherCollegeName: "",
    stream: "",
    semester: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    values.dob = Index.dayjs(values.dob).format("YYYY-MM-DD");
    const resp = await userRegisterModalService(values);
    if (resp?.status === 200 || resp?.status === 201) {
      navigate("/user/user-register-verify-otp", { state: values?.email });
    } else {
      setLoading((prev) => ({
        ...prev,
        btnLoading: false,
      }));
    }
    setSubmitting(false);
  };

  const fetchDistrictData = async () => {
    try {
      const res = await getAllDistrictServices();
      setDistrictListData(res?.data?.districts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading((prev) => ({
      //   ...prev,
      //   pageLoading: false,
      // }));
    }
  };
  const fetchTalukaData = async () => {
    try {
      const res = await getAllTalukaServices(districtDataId);
      setTalukaListData(res?.data?.talukas);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading((prev) => ({
      //   ...prev,
      //   pageLoading: false,
      // }));
    }
  };
  const fetchCollegeData = async () => {
    try {
      const res = await getAllCollegeServices();
      setCollegeListdata([...(res?.data?.colleges || []), {id: "Other", name: "Other"}]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setLoading((prev) => ({
      //   ...prev,
      //   pageLoading: false,
      // }));
    }
  };
  const fetchSemesterData = async () => {
    try {
      const res = await getAllSemesterServices();
      setSemesterOptions(res?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchStreamData = async () => {
    try {
      const res = await getAllStreamServices();
      setStreamOptions(res?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDistrictData();
    fetchCollegeData();
    fetchSemesterData();
    fetchStreamData();
  }, []);
  useEffect(() => {
    fetchTalukaData();
  }, [districtDataId]);

  const formik = useFormik({
    initialValues,
    validationSchema: userRegisterSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Index.Box className="user-auth-main-flex">
        <Index.Box className="user-auth-left-main">
          <Index.Box className="user-auth-left-bg">
            <img
              src={PageIndex.Png.userAuthBg}
              className="user-auth-left-bg-img"
              alt="Register"
            />
            <Index.Box className="auth-bg-cont">
              <Index.Typography className="auth-bg-main-title">
                Welcome to the first ever <span>digitally</span> inclusive platform.
              </Index.Typography>
              <Index.Typography className="auth-bg-main-subtitle">
                Presenting Lenovo Leap: NextGen Scholar Program - Empowering
                Every Learner with Future-Ready Emerging Skills.
              </Index.Typography>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="user-auth-right-main acc-top-fix">
          <Index.Box className="user-auth-box register-btn-box">
            <Index.Box className="user-auth-main">
              <Index.Box className="user-auth-inner-main">
                <Index.Box className="register-flex-box">
                  <Index.Typography className="user-auth-title">
                    Sign Up
                  </Index.Typography>
                  <Index.Box className="back-btn-box" sx={{ display:"flex" }}>
                    <Index.IconButton
                      onClick={() => navigate("/")}
                      size="small"
                      className="back-btn"
                    >
                      <img src={PageIndex.Png.BackButton} alt="" />
                    </Index.IconButton>
                    <Index.Box>
                      <DarkLight />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Typography className="user-auth-subtitle">
                  Enter your required details to register your account.
                </Index.Typography>
                <form onSubmit={formik.handleSubmit}>
                  <Index.Box className="grid-row">
                    <Index.Box sx={{ width: 1 }} className="grid-main">
                      <Index.Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap={2}
                      >
                        {/* Name Field */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="user-input-box user-auth-input">
                            <Index.Box className="user-form-group">
                              <Index.TextField
                                fullWidth
                                id="fullWidth"
                                className="user-form-control"
                                autoComplete="off"
                                name="name"
                                placeholder="Enter Name"
                                value={formik.values.name}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  const testRegex = /^(?!\s)[A-Za-z\s]+$/;
                                  if (testRegex.test(value) || value == "") {
                                    formik.setFieldValue(
                                      "name",
                                      value.replace(/\s+/g, " ")
                                    );
                                  }
                                }}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.name && formik.errors.name
                                }
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.name && formik.errors.name}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                        {/* Email */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="user-input-box user-auth-input">
                            <Index.Box className="user-form-group">
                              <Index.TextField
                                fullWidth
                                id="fullWidth"
                                className="user-form-control"
                                autoComplete="off"
                                name="email"
                                placeholder="Enter Email"
                                value={formik.values.email}
                                // onChange={formik.handleChange}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "email",
                                    e.target.value?.trim()
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.email && formik.errors.email
                                }
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.email && formik.errors.email}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                        {/* College Name Dropdown */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                            <Index.Box className="admin-input-box custom-autocomplete-user">
                              <Index.Autocomplete
                                options={collegeListdata}
                                getOptionLabel={(option) => option.name}
                                value={
                                  collegeListdata.find(
                                    (college) =>
                                      college.name === formik.values.college_name
                                  ) || null
                                } // Select default value
                                onChange={(event, newValue) => {
                                  formik.setFieldValue(
                                    "college_name",
                                    newValue ? newValue.name : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <Index.TextField
                                    {...params}
                                    fullWidth
                                    id="course-select"
                                    className="admin-form-control"
                                    placeholder="Select College"
                                    autoComplete="off"
                                    name="college_name"
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.college_name &&
                                      Boolean(formik.errors.college_name)
                                    }
                                  />
                                )}
                                classes={{
                                  option: "custom-hackathon-dropdown",
                                }}
                              />
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {formik.touched.college_name && formik.errors.college_name}
                              </Index.FormHelperText>
                              {/* </Index.Box> */}
                            </Index.Box>
                        </Index.Box>
                        {formik.values.college_name === "Other" && (
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.TextField
                                  fullWidth
                                  id="fullWidth"
                                  className="user-form-control"
                                  autoComplete="off"
                                  name="otherCollegeName"
                                  placeholder="Enter College Name"
                                  value={formik.values.otherCollegeName}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    const testRegex = /^(?!\s)[A-Za-z\s]+$/;
                                    if (testRegex.test(value) || value == "") {
                                      formik.setFieldValue(
                                        "otherCollegeName",
                                        value.replace(/\s+/g, " ")
                                      );
                                    }
                                  }}
                                  onBlur={formik.handleBlur}
                                  error={
                                    formik.touched.otherCollegeName &&
                                    formik.errors.otherCollegeName
                                  }
                                />
                              </Index.Box>
                              <Index.FormHelperText
                                error
                                // className="admin-form-lable"
                              >
                                {formik?.touched?.otherCollegeName &&
                                  formik?.errors?.otherCollegeName}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        )}
                        {/* Institute type */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    fullWidth
                                    name="institute_type"
                                    value={formik.values.institute_type}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.institute_type &&
                                      formik.errors.institute_type
                                    }
                                    MenuProps={{
                                      PaperProps: {
                                        className: "form-select-field",
                                      },
                                    }}
                                    renderValue={(value) => {
                                      if (!value) {
                                        return (
                                          <span className="select-placeholder">
                                            Select Institute Type
                                          </span>
                                        );
                                      }
                                      return <>{value}</>;
                                    }}
                                  >
                                    <Index.MenuItem value="Private">
                                      Private
                                    </Index.MenuItem>
                                    <Index.MenuItem value="Government">
                                      Government
                                    </Index.MenuItem>
                                    <Index.MenuItem value="Other">
                                      Other
                                    </Index.MenuItem>
                                  </Index.Select>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.institute_type && formik.errors.institute_type}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      {/* Stream */}
                      <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                            <Index.Box className="admin-input-box custom-autocomplete-user">
                              <Index.Autocomplete
                                options={streamOptions}
                                getOptionLabel={(option) => option.name}
                                value={
                                  streamOptions.find(
                                    (stream) =>
                                      stream.id == formik.values.stream
                                  ) || null
                                }
                                onChange={(event, newValue) => {
                                  formik.setFieldValue(
                                    "stream",
                                    newValue ? newValue.id : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <Index.TextField
                                    {...params}
                                    fullWidth
                                    id="stream-select"
                                    className="admin-form-control"
                                    placeholder="Select Stream"
                                    autoComplete="off"
                                    name="stream"
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.stream &&
                                      Boolean(formik.errors.stream)
                                    }
                                  />
                                )}
                                classes={{
                                  option: "custom-hackathon-dropdown",
                                }}
                              />
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {formik.touched.stream && formik.errors.stream}
                              </Index.FormHelperText>
                            </Index.Box>
                        </Index.Box>
                      {/* Semester */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                            <Index.Box className="admin-input-box custom-autocomplete-user">
                              <Index.Autocomplete
                                options={semesterOptions}
                                getOptionLabel={(option) => option.name}
                                value={
                                  semesterOptions.find(
                                    (semester) =>
                                      semester.id == formik.values.semester
                                  ) || null
                                }
                                onChange={(event, newValue) => {
                                  formik.setFieldValue(
                                    "semester",
                                    newValue ? newValue.id : ""
                                  );
                                }}
                                renderInput={(params) => (
                                  <Index.TextField
                                    {...params}
                                    fullWidth
                                    id="semester-select"
                                    className="admin-form-control"
                                    placeholder="Select Semester"
                                    autoComplete="off"
                                    name="semester"
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.semester &&
                                      Boolean(formik.errors.semester)
                                    }
                                  />
                                )}
                                classes={{
                                  option: "custom-hackathon-dropdown",
                                }}
                              />
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {formik.touched.semester && formik.errors.semester}
                              </Index.FormHelperText>
                            </Index.Box>
                        </Index.Box>

                        {/* Gender */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    fullWidth
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.gender &&
                                      formik.errors.gender
                                    }
                                    MenuProps={{
                                      PaperProps: {
                                        className: "form-select-field",
                                      },
                                    }}
                                    renderValue={(value) => {
                                      if (!value) {
                                        return (
                                          <span className="select-placeholder">
                                            Select Gender
                                          </span>
                                        );
                                      }
                                      return <>{value}</>;
                                    }}
                                  >
                                    <Index.MenuItem value="Male">
                                      Male
                                    </Index.MenuItem>
                                    <Index.MenuItem value="Female">
                                      Female
                                    </Index.MenuItem>
                                    <Index.MenuItem value="Other">
                                      Other
                                    </Index.MenuItem>
                                  </Index.Select>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.gender && formik.errors.gender}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        {/* District */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    fullWidth
                                    name="district"
                                    value={formik.values.district}
                                    onChange={(e) => {
                                      formik.handleChange(e);
                                      setDistrictDataId(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.district &&
                                      formik.errors.district
                                    }
                                    MenuProps={{
                                      PaperProps: {
                                        className: "form-select-field",
                                      },
                                    }}
                                    renderValue={(value) => {
                                      if (!value) {
                                        return (
                                          <span className="select-placeholder">
                                            Select District
                                          </span>
                                        );
                                      }
                                      const data = districtListData?.find(
                                        (item) => item?.id == value
                                      );
                                      return <>{data?.name || ""}</>;
                                    }}
                                  >
                                    {districtListData?.map((org) => (
                                      <Index.MenuItem
                                        key={org.id}
                                        value={org.id}
                                      >
                                        {org.name}
                                      </Index.MenuItem>
                                    ))}
                                  </Index.Select>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.district &&
                                  formik.errors.district}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* Talukas */}

                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    fullWidth
                                    name="taluka_id"
                                    value={formik.values.taluka_id}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                      formik.touched.taluka_id &&
                                      formik.errors.taluka_id
                                    }
                                    MenuProps={{
                                      PaperProps: {
                                        className: "form-select-field",
                                      },
                                    }}
                                    disabled={!formik.values.district}
                                    renderValue={(value) => {
                                      if (!value) {
                                        return (
                                          <span className="select-placeholder">
                                            Select Taluka
                                          </span>
                                        );
                                      }
                                      const data = talukaListData?.find(
                                        (item) => item?.taluka_id == value
                                      );
                                      return <>{data?.taluka_name || ""}</>;
                                    }}
                                  >
                                    {talukaListData?.map((org) => (
                                      <Index.MenuItem
                                        key={org.taluka_id}
                                        value={org.taluka_id}
                                      >
                                        {org.taluka_name}
                                      </Index.MenuItem>
                                    ))}
                                  </Index.Select>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.taluka_id &&
                                  formik.errors.taluka_id}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 6",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box add-user-input date-input-box">
                            <Index.Box className="admin-form-group outlined-input-form-group">
                              <Index.LocalizationProvider
                                dateAdapter={Index.AdapterDayjs}
                              >
                                <Index.DemoContainer
                                  components={["DatePicker", "DatePicker"]}
                                >
                                  <Index.DatePicker
                                    className="admin-form-control date-cust-placeholder"
                                    name="dob"
                                    disableFuture
                                    format="DD/MM/YYYY"
                                    value={
                                      formik.values?.dob
                                        ? Index.dayjs(formik.values?.dob)
                                        : null
                                    }
                                    onBlur={formik.handleBlur}
                                    onChange={(dateSelected) => {
                                      formik.setFieldValue("dob", dateSelected);
                                    }}
                                    slotProps={{
                                      textField: {
                                        // readOnly: true,
                                        // error: false,
                                        label: "Select DOB", // Placeholder-like effect
                                        InputLabelProps: {
                                          shrink: !!formik.values?.dob, // Shrink label when date is selected
                                        },
                                      },
                                    }}
                                  />
                                </Index.DemoContainer>
                              </Index.LocalizationProvider>
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              // className="admin-form-lable"
                            >
                              {formik.touched?.dob && formik.errors?.dob}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>

                        {/* Contact Number */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="user-input-box user-auth-input">
                            <Index.Box className="user-form-group">
                              <Index.TextField
                                fullWidth
                                id="fullWidth"
                                className="user-form-control"
                                autoComplete="off"
                                name="contactNumber"
                                placeholder="Enter Contact Number"
                                value={formik.values.contactNumber}
                                onChange={(e) => {
                                  let inputValue = e.target.value;
                                  inputValue = inputValue.replace(/^\s+/, "");
                                  formik.setFieldValue(
                                    "contactNumber",
                                    inputValue.slice(0, 100)
                                  );
                                }}
                                onBlur={formik.handleBlur}
                                error={
                                  formik.touched.contactNumber &&
                                  formik.errors.contactNumber
                                }
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.contactNumber &&
                                formik.errors.contactNumber}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>

                        {/* Password */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="user-input-box user-password-input-box user-auth-input">
                            <Index.Box className="user-form-group outlined-input-form-group">
                              <Index.OutlinedInput
                                className="user-form-control-eye user-form-control"
                                autoComplete="off"
                                placeholder="Enter Password"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={formik.values.password}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  if (newValue?.toString().length <= 20)
                                    formik.setFieldValue("password", newValue);
                                }}
                                endAdornment={
                                  <Index.InputAdornment position="end">
                                    <Index.IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <Index.Visibility />
                                      ) : (
                                        <Index.VisibilityOff />
                                      )}
                                    </Index.IconButton>
                                  </Index.InputAdornment>
                                }
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.password &&
                                formik.errors.password}
                            </Index.FormHelperText>
                          </Index.Box>{" "}
                          {isError &&
                            !(formik.touched.email && formik.errors.email) && (
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {isError}
                              </Index.FormHelperText>
                            )}
                        </Index.Box>

                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 6",
                            lg: "span 6",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="user-input-box user-password-input-box user-auth-input">
                            <Index.Box className="user-form-group outlined-input-form-group">
                              <Index.OutlinedInput
                                className="user-form-control-eye user-form-control"
                                autoComplete="off"
                                placeholder="Enter Confirm Password"
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={formik.values.confirmPassword}
                                onBlur={formik.handleBlur}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ""
                                  );
                                  if (newValue?.toString().length <= 20)
                                    formik.setFieldValue(
                                      "confirmPassword",
                                      newValue
                                    );
                                }}
                                endAdornment={
                                  <Index.InputAdornment position="end">
                                    <Index.IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleShowConfirmPassword}
                                      onMouseDown={
                                        handleMouseDownConfirmPassword
                                      }
                                      edge="end"
                                    >
                                      {showConfirmPassword ? (
                                        <Index.Visibility />
                                      ) : (
                                        <Index.VisibilityOff />
                                      )}
                                    </Index.IconButton>
                                  </Index.InputAdornment>
                                }
                              />
                            </Index.Box>
                            <Index.FormHelperText error>
                              {formik.touched.confirmPassword &&
                                formik.errors.confirmPassword}
                            </Index.FormHelperText>
                          </Index.Box>{" "}
                        </Index.Box>

                        {/* PwD Option */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.FormHelperText className="user-form-lable">
                              PWD (Person With Disability)
                              {/* <span className="sign-required-black" >*</span> */}
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.RadioGroup
                                    name="pwdOption"
                                    row
                                    value={formik.values.pwdOption}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  >
                                    <Index.FormControlLabel
                                      value="1"
                                      control={<Index.Radio size="small" />}
                                      label="Yes"
                                    />
                                    <Index.FormControlLabel
                                      value="0"
                                      control={<Index.Radio size="small" />}
                                      label="No"
                                    />
                                  </Index.RadioGroup>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.pwdOption &&
                                  formik.errors.pwdOption}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>

                        {/* Privacy policy accept */}
                        <Index.Box
                          gridColumn={{
                            xs: "span 12",
                            sm: "span 12",
                            md: "span 12",
                            lg: "span 12",
                          }}
                          className="grid-column"
                        >
                          <Index.Box className="admin-input-box filter-input user-input-box ">
                            <Index.Box className="admin-form-group terms-condition-field">
                                  <Index.Radio 
                                    checked={formik.values.accept_policy}  
                                    size="small" 
                                    onChange={(e)=>{
                                      formik.setFieldValue("accept_policy", true)
                                    }}
                                  />
                                  <Index.FormHelperText className="user-form-lable">
                                    I agree to the&nbsp;
                                    <Link to="/terms-and-condition" className="nav-link" target="_blank">Terms & Conditions</Link>&nbsp;
                                    and&nbsp;
                                    <Link to="/privacy-policy" className="nav-link" target="_blank">Privacy Policy</Link>.
                                  </Index.FormHelperText>
                            </Index.Box>
                              <Index.FormHelperText error>
                                {formik.touched.accept_policy &&
                                  formik.errors.accept_policy}
                              </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  {isError && (
                    <Index.FormHelperText error className="admin-form-lable">
                      {isError}
                    </Index.FormHelperText>
                  )}

                  <Index.Box className="user-btn-main user-uth-btn-main">
                    <Index.Button
                      className="user-auth-btn"
                      type="submit"
                      loading={formik.isSubmitting}
                      disabled={formik.isSubmitting}
                    >
                      Sign Up
                    </Index.Button>
                  </Index.Box>

                  <Index.Typography className="user-auth-condition-text">
                    Already have an account?
                    <span>
                      <Index.Link to="/user" className="user-auth-link-text">
                        Sign In
                      </Index.Link>
                    </span>
                  </Index.Typography>
                </form>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}
