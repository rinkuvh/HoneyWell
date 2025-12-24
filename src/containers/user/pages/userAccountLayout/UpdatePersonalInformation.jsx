import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getAllSemesterServices,
  getAllStreamServices,
  updateProfile,
} from "../../../../redux/services/UserService";
import {
  getAllCollegeServices,
  getAllDistrictServices,
  getAllTalukaServices,
} from "../../../../redux/services/AdminService";
import { imageUrl } from "../../../../config/DataService";

export default function UpdatePersonalInformation(props) {
  const {
    openUpdatePersonalInformation,
    handleOpenUpdatePersonalInformation,
    handleCloseUpdatePersonalInformation,
    editData: userProfile,
    setEditData,
    fetchData,
    setIsEdit,
  } = props;

  const [profileImage, setProfileImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = PageIndex.useDispatch();

  const [districtListData, setDistrictListData] = useState([]);
  const [districtDataId, setDistrictDataId] = useState(
    userProfile?.district_id || ""
  );
  const [talukaListData, setTalukaListData] = useState([]);
  const [collegeListdata, setCollegeListdata] = useState([]);
  // const userProfile = PageIndex.useSelector((state)=> state)
  const [locationInfo, setLocationInfo] = useState({
    country: [],
    state: [],
    region: [],
    city: [],
    pincode: [],
  });
  const [imgURL, setImageUrl] = useState(null);
  const [imgError, setImgError] = useState("");
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [streamOptions, setStreamOptions] = useState([]);

  const initialValues = {
    name: userProfile?.name || "",
    dob: userProfile?.dob || "",
    // college_id: userProfile?.college_id || "",
    college_name: userProfile?.college_name
      ? userProfile?.college_name?.toLowerCase().includes("other")
        ? "Other"
        : userProfile?.college_name
      : "",
    contactNumber: userProfile?.contactNumber || "",
    email: userProfile?.email || "",
    gender: userProfile?.gender || "",
    taluka_id: userProfile?.taluka_id || "",
    district: userProfile?.district_id || "",
    password: userProfile?.password || "",
    // sponsoringOrganisation: userProfile?.sponsoringOrganisation || "",
    pwdOption: userProfile?.pwdOption ?? "",
    institute_type: userProfile?.institute_type ?? "",
    image: userProfile?.image || null,
    stream: userProfile?.stream_id || "",
    semester: userProfile?.semester_id || "",
    otherCollegeName: userProfile?.college_name
      ? userProfile?.college_name?.toLowerCase().includes("other")
        ? userProfile?.college_name.replace("Other -", "").trim()
        : ""
      : "",
  };

  const handleSubmit = async (values) => {
    values.dob = Index.dayjs(values.dob).format("YYYY-MM-DD");
    setLoader(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    dispatch(updateProfile(formData)).then((data) => {
      if (data?.payload?.status == 200) {
        setLoader(false);
        setProfileImage("");
        // handleCloseUpdatePersonalInformation();
        // fetchData();
        setIsEdit(false);
      } else {
        setTimeout(() => {
          setLoader(false);
          setProfileImage("");
        }, 2000);
      }
    });
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
      setCollegeListdata([
        ...(res?.data?.colleges || []),
        { id: "Other", name: "Other" },
      ]);
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
  useEffect(() => {
    fetchDistrictData();
    fetchCollegeData();
    fetchSemesterData();
    fetchStreamData();
  }, []);
  useEffect(() => {
    fetchTalukaData();
  }, [districtDataId, userProfile?.taluka_id]);

  const formik = PageIndex.useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: PageIndex.editUserProfileInformationSchema,
    onSubmit: handleSubmit,
  });

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setImageUrl(null);
  };
  useEffect(() => {
    if (
      userProfile?.college_name &&
      !userProfile?.college_name?.toLowerCase().includes("other") &&
      collegeListdata?.length
    ) {
      let collegeExists = collegeListdata.find(
        (college) =>
          college.name?.toLowerCase() ===
          userProfile?.college_name?.toLowerCase()
      );
      if (!collegeExists) {
        formik.setFieldValue("college_name", "Other");
        formik.setFieldValue(
          "otherCollegeName",
          userProfile?.college_name.replace("Other -", "").trim()
        );
      }
    }
  }, [userProfile, collegeListdata]);
  return (
    <>

      <form onSubmit={formik.handleSubmit}>
        <Index.Box
          className="personal-info-modal-inner-main admin-modal-inner"
        >
          <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
            <Index.Box className="admin-modal-body">
              <Index.Box
                sx={{ width: 1 }}
                className="grid-main border-card register-row"
              >
                <Index.Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                >
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 12",
                      lg: "span 12",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box upload-profile-image add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Image
                        <span className="sign-required">* </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.Box className="file-upload-btn-main">
                          <Index.Button
                            variant="contained"
                            component="label"
                            className="file-upload-btn"
                          >
                            <img
                              className={`${
                                formik.values?.image
                                  ? typeof formik.values?.image === "string"
                                    ? "user-upload-profile-img"
                                    : [
                                        "image/png",
                                        "image/jpg",
                                        "image/jpeg",
                                        "image/svg+xml",
                                      ].includes(formik.values?.image.type)
                                    ? "user-upload-profile-img"
                                    : "profile-upload-icon-img"
                                  : "profile-upload-icon-img"
                              }`}
                              src={
                                formik.values?.image
                                  ? typeof formik.values?.image === "string"
                                    ? `${imageUrl}${formik.values?.image}`
                                    : [
                                        "image/png",
                                        "image/jpg",
                                        "image/jpeg",
                                        "image/svg+xml",
                                      ].includes(formik.values?.image.type)
                                    ? imgURL
                                    : PageIndex.Png.userAvtarIcon
                                  : PageIndex.Png.userAvtarIcon
                              }
                              key={imgURL}
                            />
                            <input
                              hidden
                              accept="image/*"
                              name="image"
                              type="file"
                              onChange={(e) => {
                                try {
                                  formik.setTouched({ image: true });
                                  const mimeTypes = [
                                    "image/jpeg",
                                    "image/jpg",
                                    "image/png",
                                    "image/svg+xml",
                                  ];
                                  const file = e.target.files;
                                  if (file.length) {
                                    if (!mimeTypes.includes(file[0].type)) {
                                      setImgError(
                                        "Only .jpg, .jpeg, .png, .svg files are allowed"
                                      );
                                      return;
                                    }
                                    formik.setFieldValue("image", file[0]);
                                    setImageUrl(URL.createObjectURL(file[0]));
                                    setImgError("");
                                  }
                                } catch (error) {
                                  e.target.value = null;
                                }
                              }}
                            />
                          </Index.Button>
                          {formik?.values?.image && (
                            <Index.Button
                              className="remove-image-box"
                              disableRipple
                              onClick={handleRemoveImage}
                            >
                              <img
                                src={PageIndex.Svg.closeblack}
                                className="cross-icon"
                              />
                            </Index.Button>
                          )}
                        </Index.Box>
                      </Index.Box>
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.image &&
                          (formik?.errors?.image || imgError)}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Name <span className="sign-required">* </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter First Name"
                          name="name"
                          value={formik.values.name}
                          onChange={(e) => {
                            const newValue = PageIndex.allowOnlyCharacters(
                              e.target.value
                            );
                            formik.setFieldValue("name", newValue);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Index.Box>
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.name && formik?.errors?.name}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Email <span className="sign-required">* </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={formik.values.email}
                          onChange={(e) => {
                            const newValue = e.target.value.replace(/\s/g, "");
                            formik.setFieldValue("email", newValue);
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Index.Box>
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.email && formik?.errors?.email}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                  {/* College Name Dropdown */}
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Select College
                        <span className="sign-required"> *</span>
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
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.touched.college_name &&
                          formik.errors.college_name}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                  {formik.values.college_name === "Other" && (
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 6",
                        md: "span 4",
                        lg: "span 4",
                      }}
                      className="grid-column"
                    >
                      <Index.Box className="admin-input-box add-user-input">
                        <Index.FormHelperText className="admin-form-lable">
                          College Name
                          <span className="sign-required"> *</span>
                        </Index.FormHelperText>
                        <Index.Box className="admin-form-group">
                          <Index.TextField
                            fullWidth
                            id="fullWidth"
                            className="admin-form-control"
                            autoComplete="off"
                            name="otherCollegeName"
                            placeholder="Enter college name"
                            value={formik.values.otherCollegeName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik.touched.otherCollegeName &&
                            formik.errors.otherCollegeName}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  )}
                  {/* Stream */}
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Stream <span className="sign-required"> * </span>
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
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.stream && formik?.errors?.stream}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>

                  {/* Semester */}
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Semester <span className="sign-required"> * </span>
                      </Index.FormHelperText>
                      <Index.Autocomplete
                        options={semesterOptions}
                        getOptionLabel={(option) => option.name}
                        value={
                          semesterOptions.find(
                            (semester) => semester.id == formik.values.semester
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
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.semester && formik?.errors?.semester}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Institute Type{" "}
                        <span className="sign-required"> * </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.Box className="admin-dropdown-box">
                          <Index.FormControl className="admin-form-control">
                            <Index.Select
                              className="admin-dropdown-select"
                              value={formik.values.institute_type}
                              name="institute_type"
                              onChange={formik.handleChange}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              renderValue={(value) => {
                                if (!value) {
                                  return "Select Institute Type";
                                }
                                return <>{value}</>;
                              }}
                            >
                              <Index.MenuItem
                                value="Private"
                                className="admin-menuitem select-def-item"
                              >
                                Private
                              </Index.MenuItem>
                              <Index.MenuItem
                                value="Government"
                                className="admin-menuitem select-def-item"
                              >
                                Government
                              </Index.MenuItem>
                              <Index.MenuItem
                                value="Other"
                                className="admin-menuitem select-def-item"
                              >
                                Other
                              </Index.MenuItem>
                            </Index.Select>
                          </Index.FormControl>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.institute_type && formik?.errors?.institute_type}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input ">
                      {/* <Index.Box className="admin-input-box add-user-input country-dropdown-input-box"> */}
                      <Index.FormHelperText className="admin-form-lable">
                        Contact Number <span className="sign-required">* </span>
                      </Index.FormHelperText>

                      <Index.Box className="admin-form-group">
                        <Index.TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="Enter Phone Number"
                          name="contactNumber"
                          value={formik.values.contactNumber}
                          onChange={(e) => {
                            const newValue = PageIndex.allowOnlyNumbers(
                              e.target.value
                            );
                            if (newValue.length <= 10) {
                              formik.setFieldValue("contactNumber", newValue);
                            }
                          }}
                          onBlur={formik.handleBlur}
                        />
                      </Index.Box>
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik?.touched?.contactNumber &&
                          formik?.errors?.contactNumber}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>
                  {/* Date If Birth */}
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input date-input-box">
                      <Index.FormHelperText className="admin-form-lable">
                        Date Of Birth <span className="sign-required"> * </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.LocalizationProvider
                          dateAdapter={Index.AdapterDayjs}
                        >
                          <Index.DemoContainer
                            components={["DesktopDatePicker ", "DesktopDatePicker "]}
                          >
                            <Index.DesktopDatePicker 
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
                                  label: "Select Date Of Birth",
                                  InputLabelProps: {
                                    shrink: !!formik.values?.dob,
                                  },
                                },
                              }}
                            />
                          </Index.DemoContainer>
                        </Index.LocalizationProvider>
                      </Index.Box>
                      <Index.FormHelperText error className="admin-form-lable">
                        {formik.touched?.dob && formik.errors?.dob}
                      </Index.FormHelperText>
                    </Index.Box>
                  </Index.Box>

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        Gender <span className="sign-required"> * </span>
                      </Index.FormHelperText>
                      <Index.Box className="admin-form-group">
                        <Index.Box className="admin-dropdown-box">
                          <Index.FormControl className="admin-form-control">
                            <Index.Select
                              className="admin-dropdown-select"
                              value={formik.values.gender}
                              name="gender"
                              onChange={formik.handleChange}
                              displayEmpty
                              inputProps={{ "aria-label": "Without label" }}
                              renderValue={(value) => {
                                if (!value) {
                                  return "Select Gender";
                                }
                                return <>{value}</>;
                              }}
                            >
                              <Index.MenuItem
                                value="Male"
                                className="admin-menuitem select-def-item"
                              >
                                Male
                              </Index.MenuItem>
                              <Index.MenuItem
                                value="Female"
                                className="admin-menuitem select-def-item"
                              >
                                Female
                              </Index.MenuItem>
                              <Index.MenuItem
                                value="Other"
                                className="admin-menuitem select-def-item"
                              >
                                Other
                              </Index.MenuItem>
                            </Index.Select>
                          </Index.FormControl>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik?.touched?.gender && formik?.errors?.gender}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  {/* District */}
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box user-input-box ">
                      <Index.FormHelperText className="user-form-lable">
                        District
                        <span className="sign-required"> *</span>
                      </Index.FormHelperText>
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
                                formik.setFieldValue("taluka_id", "");
                                setDistrictDataId(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.district &&
                                formik.errors.district
                              }
                              renderValue={(value) => {
                                if (!value) {
                                  return "Select District";
                                }
                                const data = districtListData?.find(
                                  (item) => item?.id == formik?.values?.district
                                );
                                return <>{data?.name || ""}</>;
                              }}
                            >
                              {districtListData?.map((org) => (
                                <Index.MenuItem key={org.id} value={org.id}>
                                  {org.name}
                                </Index.MenuItem>
                              ))}
                            </Index.Select>
                          </Index.FormControl>
                        </Index.Box>
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik.touched.district && formik.errors.district}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>

                  {/* Talukas */}

                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 12",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box user-input-box ">
                      <Index.FormHelperText className="user-form-lable">
                        Taluka
                        <span className="sign-required"> * </span>
                      </Index.FormHelperText>
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
                              renderValue={(value) => {
                                if (!value) {
                                  return "Select Taluka";
                                }
                                const data = talukaListData?.find(
                                  (item) =>
                                    item?.taluka_id == formik?.values?.taluka_id
                                );
                                return <>{data?.taluka_name || ""}</>;
                              }}
                              disabled={!formik?.values?.district}
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
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik.touched.taluka_id && formik.errors.taluka_id}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                  <Index.Box
                    gridColumn={{
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                    }}
                    className="grid-column"
                  >
                    <Index.Box className="admin-input-box add-user-input">
                      <Index.FormHelperText className="admin-form-lable">
                        PWD <span className="sign-required"> * </span>
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
                        <Index.FormHelperText
                          error
                          className="admin-form-lable"
                        >
                          {formik.touched.pwdOption && formik.errors.pwdOption}
                        </Index.FormHelperText>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          {/* <Index.Box className="admin-modal-footer"> */}
          <Index.Box className="admin-modal-user-btn-flex">
            <Index.Box className="admin-save-btn-main primary-btn-main admin-page-btn-end-flex">
              <PageIndex.BorderButton
                className="admin-modal-cancel-btn border-btn"
                btnLabel="Cancel"
                onClick={() => {
                  props.setIsEdit(false);
                }}
              />
              <Index.Button
                loading={loader}
                className="admin-save-user-btn primary-btn"
                type="submit"
              >
                Save
              </Index.Button>
            </Index.Box>
          </Index.Box>
          {/* </Index.Box> */}
        </Index.Box>
      </form>
      {/* </Index.Modal> */}
    </>
  );
}
