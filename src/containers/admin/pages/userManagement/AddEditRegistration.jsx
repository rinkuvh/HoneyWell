import PageIndex from "../../../PageIndex";
import { useEffect, useState } from "react";
import Index from "../../../Index";

import {
  addStudentService,
  getSingleUserService,
  updateStudentService,
  getAllDistrictServices,
  getAllTalukaServices,
  getAllCollegeServices,
} from "../../../../redux/services/AdminService";
import { useParams } from "react-router-dom";
import { getAllSemesterServices, getAllStreamServices } from "../../../../redux/services/UserService";

export default function AddEditRegistration() {
  const navigate = PageIndex.useNavigate();
  const params = useParams();
  const [editData, setEditData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [districtListData, setDistrictListData] = useState([]);
  const [talukaListData, setTalukaListData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [collegeListdata, setCollegeListdata] = useState([]);
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

  //#region handle form

  let initialValues = {
    name: editData?.name ? editData?.name : "",
    email: editData?.email ? editData?.email : "",
    // college_name: editData?.college_name ? editData?.college_name : "",
    gender: editData?.gender ? editData?.gender : "",
    dob: editData?.dob ? editData?.dob : "",
    contactNumber: editData?.contactNumber ? editData?.contactNumber : "",
    taluka_id: editData?.taluka_id ? editData?.taluka_id : "",
    district: editData?.district ? editData?.district : "",
    pwdOption: editData?.pwdOption >= 0 ? editData?.pwdOption : "",
    password: "",
    confirmPassword: "",
    isEdit: !!editData,
    institute_type: editData?.institute_type ? editData?.institute_type : "",
    stream: editData?.stream_id ? editData?.stream_id : "",
    semester: editData?.semester_id ? editData?.semester_id : "",
    college_name: editData?.college_name
      ? editData?.college_name?.toLowerCase().includes("other")
        ? "Other"
        : editData?.college_name
      : "",
    otherCollegeName: editData?.college_name
      ? editData?.college_name?.toLowerCase().includes("other")
        ? editData?.college_name.replace("Other -", "").trim()
        : ""
      : "",
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      values.dob = Index.dayjs(values?.dob).format("YYYY-MM-DD");
      const urlencoded = new URLSearchParams();

      if (params?.id) {
        urlencoded.append("userId", params?.id);
      }
      urlencoded.append("name", values?.name);
      urlencoded.append("email", values?.email);
      urlencoded.append("college_name", values?.college_name);
      urlencoded.append("gender", values?.gender);
      urlencoded.append("district", values?.district);
      if (!params?.id) {
        urlencoded.append("password", values?.password);
      }
      urlencoded.append("contactNumber", values?.contactNumber);
      urlencoded.append("pwdOption", values?.pwdOption);
      urlencoded.append("taluka_id", values?.taluka_id);
      urlencoded.append("dob", values?.dob);
      urlencoded.append("institute_type", values?.institute_type);
      urlencoded.append("stream", values?.stream);
      urlencoded.append("semester", values?.semester);
      urlencoded.append("otherCollegeName", values?.otherCollegeName);

      const response = params?.id
        ? await updateStudentService(urlencoded)
        : await addStudentService(urlencoded);

      if (response?.status === 201 || response?.status === 200) {
        setTimeout(() => {
          navigate("/admin/student-management");
          setSubmitting(false);
        }, 500);
      } else {
        setTimeout(() => {
          setSubmitting(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    }
  };

  const formik = Index.useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: PageIndex.addEditStudentSchema,
  });

  const fetchDistrictData = async () => {
    try {
      const res = await getAllDistrictServices();
      setDistrictListData(res?.data?.districts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTalukaData = async (districtId) => {
    try {
      const res = await getAllTalukaServices(districtId);
      setTalukaListData(res?.data?.talukas);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCollegeData = async () => {
    try {
      const res = await getAllCollegeServices();
      setCollegeListdata([...(res?.data?.colleges || []), {id: "Other", name: "Other"}]);
    } catch (error) {
      console.error("Error fetching data:", error);
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
  const getSingleData = async () => {
    setLoading(true);
    try {
      const response = await getSingleUserService(params?.id);
      if (response?.success == true) {
        const editData = response?.data;
        fetchTalukaData(response?.data?.district);
        setEditData(editData);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getSingleData();
    }
    fetchDistrictData();
    fetchCollegeData();
    fetchSemesterData();
    fetchStreamData();
  }, []);

  useEffect(() => {
    if (editData?.college_name && !editData?.college_name?.toLowerCase().includes("other") && collegeListdata?.length) {
      let collegeExists = collegeListdata.find(
        (college) =>
          college.name?.toLowerCase() === editData?.college_name?.toLowerCase()
      );
      if(!collegeExists){
        formik.setFieldValue("college_name", "Other");
        formik.setFieldValue(
          "otherCollegeName",
          editData?.college_name.replace("Other -", "").trim()
        );
      }
    }
  }, [editData, collegeListdata]);
  return (
    <>
      {loading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-dashboard-content">
            <Index.Box className="admin-page-title-flex admin-page-title-main">
              <Index.Typography
                className="admin-page-title"
                component="h2"
                variant="h2"
              >
                {params?.id ? "Edit " : "Add "}Student
              </Index.Typography>
            </Index.Box>
            <Index.Box className="common-card">
              <form onSubmit={formik.handleSubmit}>
                <Index.Box sx={{ width: 1 }} className="grid-main">
                  <Index.Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                  >
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Name
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter Name"
                              onBlur={formik?.handleBlur}
                              value={formik?.values?.name}
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
                              autoComplete="off"
                              name="name"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.name && formik?.errors?.name}
                            </Index.FormHelperText>
                          </Index.Box>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Email
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter Email"
                              onBlur={formik?.handleBlur}
                              value={formik?.values?.email}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  "email",
                                  e.target.value?.trim()
                                );
                              }}
                              autoComplete="off"
                              name="email"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.email && formik?.errors?.email}
                            </Index.FormHelperText>
                          </Index.Box>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Select College
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
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
                    </Index.Box>
                    {formik?.values?.college_name == "Other" && (
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Collage Name
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter Collage Name"
                              onBlur={formik?.handleBlur}
                              value={formik?.values?.otherCollegeName}
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
                              autoComplete="off"
                              name="otherCollegeName"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.otherCollegeName &&
                                formik?.errors?.otherCollegeName}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    )}

                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box filter-input user-input-box ">
                          <Index.FormHelperText className="admin-form-lable">
                            Institute Type
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-dropdown-box">
                              <Index.FormControl className="admin-form-control">
                                <Index.Select
                                  className="admin-dropdown-select"
                                  displayEmpty
                                  fullWidth
                                  name="institute_type"
                                  value={formik?.values?.institute_type}
                                  onChange={formik?.handleChange}
                                  onBlur={formik?.handleBlur}
                                  error={
                                    formik?.touched?.institute_type &&
                                    formik?.errors?.institute_type
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      className: "form-select-field",
                                    },
                                  }}
                                  renderValue={(value) => {
                                    if (!value) {
                                      return "Select Institute Type";
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
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.institute_type &&
                                formik?.errors?.institute_type}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    {/* Stream */}
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Select Stream
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                            <Index.Autocomplete
                              options={streamOptions}
                              getOptionLabel={(option) => option.name}
                              value={
                                streamOptions.find(
                                  (stream) => stream.id == formik.values.stream
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
                          {/* </Index.Box> */}
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>

                    {/* Semester */}
                                        <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Select Semester
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
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
                          {/* </Index.Box> */}
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box filter-input user-input-box ">
                          <Index.FormHelperText className="admin-form-lable">
                            Gender
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-dropdown-box">
                              <Index.FormControl className="admin-form-control">
                                <Index.Select
                                  className="admin-dropdown-select"
                                  displayEmpty
                                  fullWidth
                                  name="gender"
                                  value={formik?.values?.gender}
                                  onChange={formik?.handleChange}
                                  onBlur={formik?.handleBlur}
                                  error={
                                    formik?.touched?.gender &&
                                    formik?.errors?.gender
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      className: "form-select-field",
                                    },
                                  }}
                                  renderValue={(value) => {
                                    if (!value) {
                                      return "Select Gender";
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
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.gender &&
                                formik?.errors?.gender}
                            </Index.FormHelperText>
                          </Index.Box>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box filter-input user-input-box ">
                          <Index.FormHelperText className="admin-form-lable">
                            District
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-dropdown-box">
                              <Index.FormControl className="admin-form-control">
                                <Index.Select
                                  className="admin-dropdown-select"
                                  displayEmpty
                                  fullWidth
                                  name="district"
                                  value={formik?.values?.district}
                                  onChange={(e) => {
                                    formik.handleChange(e);
                                    formik.setFieldValue("taluka_id", "");
                                    fetchTalukaData(e.target.value);
                                  }}
                                  onBlur={formik?.handleBlur}
                                  error={
                                    formik?.touched?.district &&
                                    formik?.errors?.district
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      className: "form-select-field",
                                    },
                                  }}
                                  renderValue={(value) => {
                                    if (!value) {
                                      return "Select District";
                                    }
                                    const data = districtListData?.find(
                                      (item) => item?.id == value
                                    );
                                    return <>{data?.name || ""}</>;
                                  }}
                                >
                                  {districtListData?.map((district) => (
                                    <Index.MenuItem
                                      key={district?.id}
                                      value={district?.id}
                                    >
                                      {district?.name}
                                    </Index.MenuItem>
                                  ))}
                                </Index.Select>
                              </Index.FormControl>
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.district &&
                                formik?.errors?.district}
                            </Index.FormHelperText>
                          </Index.Box>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box filter-input user-input-box ">
                          <Index.FormHelperText className="admin-form-lable">
                            Taluka
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-dropdown-box">
                              <Index.FormControl className="admin-form-control">
                                <Index.Select
                                  className="admin-dropdown-select"
                                  displayEmpty
                                  fullWidth
                                  name="taluka_id"
                                  value={formik?.values?.taluka_id}
                                  onChange={formik?.handleChange}
                                  onBlur={formik?.handleBlur}
                                  error={
                                    formik?.touched?.taluka_id &&
                                    formik?.errors?.taluka_id
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      className: "form-select-field",
                                    },
                                  }}
                                  disabled={!formik?.values?.district}
                                  renderValue={(value) => {
                                    if (!value) {
                                      return "Select Taluka";
                                    }
                                    const data = talukaListData?.find(
                                      (item) => item?.taluka_id == value
                                    );
                                    return <>{data?.taluka_name || ""}</>;
                                  }}
                                >
                                  {talukaListData?.map((taluka) => (
                                    <Index.MenuItem
                                      key={taluka?.taluka_id}
                                      value={taluka?.taluka_id}
                                    >
                                      {taluka?.taluka_name}
                                    </Index.MenuItem>
                                  ))}
                                </Index.Select>
                              </Index.FormControl>
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.taluka_id &&
                                formik?.errors?.taluka_id}
                            </Index.FormHelperText>
                          </Index.Box>
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
                        <Index.FormHelperText className="admin-form-lable">
                          Date of Birth
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group outline-input-date-picker">
                          <Index.LocalizationProvider
                            dateAdapter={Index.AdapterDayjs}
                          >
                            <Index.DemoContainer
                              components={["DatePicker", "DatePicker"]}
                            >
                              <Index.DatePicker
                                className="admin-form-control"
                                name="dob"
                                disableFuture
                                format="DD/MM/YYYY"
                                value={Index.dayjs(formik?.values?.dob)}
                                onBlur={formik.handleBlur}
                                onChange={(dateSelected) => {
                                  formik.setFieldValue("dob", dateSelected);
                                }}
                              />
                            </Index.DemoContainer>
                          </Index.LocalizationProvider>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.dob && formik?.errors?.dob}
                        </Index.FormHelperText>
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
                      <Index.Box className="add-page-form-main">
                        <Index.Box className="admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Contact Number
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder="Enter Contact Number"
                              onBlur={formik?.handleBlur}
                              value={formik?.values?.contactNumber}
                              onChange={(e) => {
                                let inputValue = e.target.value;
                                inputValue = inputValue.replace(/^\s+/, "");
                                formik.setFieldValue(
                                  "contactNumber",
                                  inputValue.slice(0, 10)
                                );
                              }}
                              autoComplete="off"
                              name="contactNumber"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.contactNumber &&
                                formik?.errors?.contactNumber}
                            </Index.FormHelperText>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>

                    {!params?.id && (
                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 12",
                          md: "span 6",
                          lg: "span 6",
                        }}
                        className="grid-column"
                      >
                        <Index.Box className="user-input-box user-password-input-box user-auth-input admin-input-box">
                          <Index.FormHelperText className="admin-form-lable">
                            Password
                            <span className="sign-required">* </span>
                          </Index.FormHelperText>
                          <Index.Box className="user-form-group outlined-input-form-group">
                            <Index.OutlinedInput
                              className="user-form-control-eye user-form-control"
                              autoComplete="off"
                              placeholder="Enter Password"
                              id="outlined-adornment-password"
                              type={showPassword ? "text" : "password"}
                              value={formik?.values?.password}
                              onBlur={formik?.handleBlur}
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
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {formik?.touched?.password &&
                              formik?.errors?.password}
                          </Index.FormHelperText>
                        </Index.Box>{" "}
                      </Index.Box>
                    )}

                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 6",
                        lg: "span 6",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="admin-input-box filter-input user-input-box ">
                        <Index.FormHelperText className="admin-form-lable">
                          PWD (Person With Disability)
                          <span className="sign-required">* </span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          <Index.Box
                            className="admin-dropdown-box"
                            sx={{ marginTop: "10px" }}
                          >
                            <Index.FormControl className="admin-form-control">
                              <Index.RadioGroup
                                name="pwdOption"
                                row
                                value={formik?.values?.pwdOption}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              >
                                <Index.FormControlLabel
                                  value={1}
                                  control={<Index.Radio size="small" />}
                                  label="Yes"
                                />
                                <Index.FormControlLabel
                                  value={0}
                                  control={<Index.Radio size="small" />}
                                  label="No"
                                />
                              </Index.RadioGroup>
                            </Index.FormControl>
                          </Index.Box>
                          <Index.FormHelperText
                            error
                            className="admin-form-lable"
                          >
                            {formik?.touched?.pwdOption &&
                              formik?.errors?.pwdOption}
                          </Index.FormHelperText>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                  <PageIndex.BorderButton
                    className="admin-modal-cancel-btn border-btn"
                    onClick={() => navigate(-1)}
                    btnLabel="Back"
                    disabled={formik?.isSubmitting}
                  />

                  <PageIndex.PrimaryButton
                    className="primary-btn"
                    btnLabel="Submit"
                    type="submit"
                    loading={formik?.isSubmitting}
                  />
                </Index.Box>
              </form>
            </Index.Box>
          </Index.Box>
        </>
      )}
    </>
  );
}
