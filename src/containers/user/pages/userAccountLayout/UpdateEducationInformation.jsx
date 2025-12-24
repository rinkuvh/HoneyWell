import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getAllClass,
  getAllCourserService,
} from "../../../../redux/services/AdminService";
import { Form, Formik } from "formik";
import { updateProfile } from "../../../../redux/services/UserService";

export default function UpdateEducationInformation(props) {
  const {
    openUpdate,
    handleOpenUpdate,
    handleCloseUpdate,
    viewData: userProfile,
  } = props;
  const dispatch = PageIndex.useDispatch();
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    educationInfo:
      userProfile?.educationInfo?.length > 0
        ? userProfile?.educationInfo.map((education) => ({
            classId: education?.classId?._id,
            courseId: education?.courseId?._id,
            grade: education?.grade,
          }))
        : [
            {
              classId: "",
              courseId: "",
              grade: "",
            },
          ],
  };
  const handleSubmit = async (values) => {
    // console.log("values",values)
    // return
    const formData = new FormData();
    values?.educationInfo?.length > 0 &&
      values?.educationInfo.forEach((data, i) => {
        formData.append(`educationInfo[${i}].classId`, data?.classId);
        formData.append(`educationInfo[${i}].courseId`, data?.courseId);
        formData.append(`educationInfo[${i}].grade`, data?.grade);
      });
    setLoader(true);
    dispatch(updateProfile(formData)).then((data) => {
      if (data?.payload?.status == 200) {
        setLoader(false);
        handleCloseUpdate();
      }
    });
  };

  const getAllCoursesList = () => {
    getAllCourserService({ limit: -1 }).then((res) => {
      if (res?.status == 200) {
        setCourses(res?.data?.Course);
      }
    });
  };

  const getAllClassList = () => {
    getAllClass({ limit: -1 }).then((res) => {
      if (res?.status == 200) {
        setClasses(res?.data?.Classes);
      }
    });
  };

  useEffect(() => {
    getAllCoursesList();
    getAllClassList();
  }, []);

  return (
    <>
      <Index.Modal
        open={openUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={PageIndex.editEducationInformationSchema}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <Index.Box
                sx={PageIndex.style}
                className="personal-info-modal-inner-main admin-modal-inner"
              >
                <Index.Box className="admin-modal-header">
                  <Index.Typography
                    id="modal-modal-title"
                    className="admin-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Update Address Information
                  </Index.Typography>
                  <Index.Button
                    className="modal-close-btn"
                    onClick={handleCloseUpdate}
                  >
                    <span>
                      <img
                        src={PageIndex.Svg.closeblack}
                        className="admin-modal-close-icon"
                        alt="Close"
                      />
                    </span>
                  </Index.Button>
                </Index.Box>

                <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
                  <Index.Box className="admin-modal-body">
                    <Index.Box
                      sx={{ width: 1 }}
                      className="grid-main border-card register-row"
                    >
                      <Index.Box className="admin-sub-title-main">
                        <Index.Typography className="admin-sub-title">
                          Education Information
                        </Index.Typography>
                      </Index.Box>
                      <PageIndex.FieldArray
                        name="educationInfo"
                        render={(arrayHelpers) => (
                          <>
                            {formik.values.educationInfo?.map((row, index) => {
                              const selectedClassId =
                                formik.values.educationInfo[index]?.classId;

                              // API se selected class ka data find kar rahe hain
                              const selectedClass = classes?.find(
                                (cls) => cls._id === selectedClassId
                              );

                              // Agar selected class "11th" ya "12th" hai to isHigherSecondary true hoga
                              const isHigherSecondary =
                                selectedClass?.name?.includes("11") ||
                                selectedClass?.name?.includes("12");

                              // Agar selected class Bachelor hai to isBachelor true hoga
                              // console.log("first",selectedClass)
                              const isBachelor =
                                selectedClass?.name?.includes("M-Tech") ||
                                selectedClass?.name?.includes("B-Tech");

                              return (
                                <Index.Box
                                  key={index}
                                  display="grid"
                                  gridTemplateColumns="repeat(12, 1fr)"
                                  gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                                >
                                  {/* Degree Selection */}
                                  <Index.Box
                                    gridColumn="span 2"
                                    className="grid-column"
                                  >
                                    <Index.Box className="admin-input-box add-user-input">
                                      <Index.FormHelperText className="admin-form-lable">
                                        Degree{" "}
                                        <span className="sign-required">*</span>
                                      </Index.FormHelperText>
                                      <Index.Box className="admin-form-group">
                                        <Index.Box className="admin-dropdown-box">
                                          <Index.FormControl className="admin-form-control">
                                            <Index.Select
                                              className="admin-dropdown-select"
                                              name={`educationInfo.${index}.classId`}
                                              value={selectedClassId || ""}
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              displayEmpty
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
                                              renderValue={
                                                selectedClassId
                                                  ? undefined
                                                  : () => (
                                                      <span
                                                        style={{
                                                          color: "#2a3547ab",
                                                        }}
                                                      >
                                                        Select degree
                                                      </span>
                                                    )
                                              }
                                            >
                                              {classes?.map((row) => (
                                                <Index.MenuItem
                                                  key={row?._id}
                                                  value={row?._id}
                                                  className="admin-menuitem"
                                                >
                                                  {row?.name}
                                                </Index.MenuItem>
                                              ))}
                                            </Index.Select>
                                          </Index.FormControl>
                                        </Index.Box>
                                        <Index.FormHelperText
                                          error
                                          className="admin-form-lable"
                                        >
                                          {formik?.touched?.educationInfo?.[
                                            index
                                          ]?.classId &&
                                            formik?.errors?.educationInfo?.[
                                              index
                                            ]?.classId}
                                        </Index.FormHelperText>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>

                                  {/* Course Selection */}
                                  <Index.Box
                                    gridColumn="span 3"
                                    className="grid-column"
                                  >
                                    <Index.Box className="admin-input-box add-user-input">
                                      <Index.FormHelperText className="admin-form-lable">
                                        Course Name{" "}
                                        <span className="sign-required">*</span>
                                      </Index.FormHelperText>
                                      <Index.Box className="admin-form-group">
                                        <Index.Box className="admin-dropdown-box">
                                          <Index.FormControl className="admin-form-control">
                                            <Index.Select
                                              className="admin-dropdown-select"
                                              name={`educationInfo.${index}.courseId`}
                                              value={
                                                formik.values.educationInfo[
                                                  index
                                                ]?.courseId || ""
                                              }
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              displayEmpty
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
                                              renderValue={
                                                formik.values.educationInfo[
                                                  index
                                                ]?.courseId !== ""
                                                  ? undefined
                                                  : () => (
                                                      <span
                                                        style={{
                                                          color: "#2a3547ab",
                                                        }}
                                                      >
                                                        Select Course Name
                                                      </span>
                                                    )
                                              }
                                            >
                                              {courses?.map((row) => (
                                                <Index.MenuItem
                                                  key={row?._id}
                                                  value={row?._id}
                                                  className="admin-menuitem"
                                                >
                                                  {row?.name}
                                                </Index.MenuItem>
                                              ))}
                                            </Index.Select>
                                          </Index.FormControl>
                                        </Index.Box>
                                        <Index.FormHelperText
                                          error
                                          className="admin-form-lable"
                                        >
                                          {formik?.touched?.educationInfo?.[
                                            index
                                          ]?.courseId &&
                                            formik?.errors?.educationInfo?.[
                                              index
                                            ]?.courseId}
                                        </Index.FormHelperText>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>

                                  {/* Grade Selection */}
                                  <Index.Box
                                    gridColumn="span 2"
                                    className="grid-column"
                                  >
                                    <Index.Box className="admin-input-box add-user-input">
                                      <Index.FormHelperText className="admin-form-lable">
                                        Grade{" "}
                                        <span className="sign-required">*</span>
                                      </Index.FormHelperText>
                                      <Index.Box className="admin-form-group">
                                        <Index.Box className="admin-dropdown-box">
                                          <Index.FormControl className="admin-form-control">
                                            <Index.Select
                                              className="admin-dropdown-select"
                                              name={`educationInfo.${index}.grade`}
                                              value={
                                                formik.values.educationInfo[
                                                  index
                                                ]?.grade || ""
                                              }
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              displayEmpty
                                              inputProps={{
                                                "aria-label": "Without label",
                                              }}
                                              renderValue={
                                                formik.values.educationInfo[
                                                  index
                                                ]?.grade !== ""
                                                  ? undefined
                                                  : () => (
                                                      <span
                                                        style={{
                                                          color: "#2a3547ab",
                                                        }}
                                                      >
                                                        Select Grade
                                                      </span>
                                                    )
                                              }
                                            >
                                              {PageIndex.grades?.map(
                                                (row, i) => (
                                                  <Index.MenuItem
                                                    key={i}
                                                    value={row}
                                                    className="admin-menuitem"
                                                  >
                                                    {row}
                                                  </Index.MenuItem>
                                                )
                                              )}
                                            </Index.Select>
                                          </Index.FormControl>
                                        </Index.Box>
                                        <Index.FormHelperText
                                          error
                                          className="admin-form-lable"
                                        >
                                          {formik?.touched?.educationInfo?.[
                                            index
                                          ]?.grade &&
                                            formik?.errors?.educationInfo?.[
                                              index
                                            ]?.grade}
                                        </Index.FormHelperText>
                                      </Index.Box>
                                    </Index.Box>
                                  </Index.Box>

                                  {/* 10th Percentage Input (Visible for 11th/12th/Bachelor) */}
                                  {isHigherSecondary || isBachelor ? (
                                    <Index.Box className="admin-input-box add-user-input">
                                      <Index.FormHelperText className="admin-form-lable">
                                        10th %{" "}
                                      </Index.FormHelperText>
                                      <Index.Box className="admin-form-group">
                                        <Index.TextField
                                          fullWidth
                                          id="fullWidth"
                                          className="admin-form-control"
                                          placeholder="10th %"
                                          name={`educationInfo.${index}.tenthPercentage`}
                                          value={
                                            formik.values.educationInfo[index]
                                              ?.tenthPercentage
                                          }
                                          // onChange={formik.handleChange}
                                          onChange={(e) => {
                                            let inputValue = e.target.value;
                                            inputValue =
                                              PageIndex.allowOnlyNumbers(
                                                inputValue
                                              );
                                            if (inputValue <= 100) {
                                              formik.setFieldValue(
                                                `educationInfo.${index}.tenthPercentage`,
                                                inputValue.slice(0, 3)
                                              );
                                            }
                                          }}
                                          onBlur={formik.handleBlur}
                                          autoComplete="off"
                                        />
                                      </Index.Box>
                                    </Index.Box>
                                  ) : null}

                                  {/* 12th Percentage Input (Visible for Bachelor) */}
                                  {isBachelor ? (
                                    <Index.Box className="admin-input-box add-user-input">
                                      <Index.FormHelperText className="admin-form-lable">
                                        12th %{" "}
                                      </Index.FormHelperText>
                                      <Index.Box className="admin-form-group">
                                        <Index.TextField
                                          fullWidth
                                          id="fullWidth"
                                          className="admin-form-control"
                                          placeholder="12th %"
                                          name={`educationInfo.${index}.twelfthPercentage`}
                                          value={
                                            formik.values.educationInfo[index]
                                              ?.twelfthPercentage
                                          }
                                          //  onChange={formik.handleChange}
                                          onChange={(e) => {
                                            let inputValue = e.target.value;
                                            inputValue =
                                              PageIndex.allowOnlyNumbers(
                                                inputValue
                                              );
                                            if (inputValue <= 100) {
                                              formik.setFieldValue(
                                                `educationInfo.${index}.twelfthPercentage`,
                                                inputValue.slice(0, 3)
                                              );
                                            }
                                          }}
                                          onBlur={formik.handleBlur}
                                          autoComplete="off"
                                        />
                                      </Index.Box>
                                    </Index.Box>
                                  ) : null}

                                  {/* Remove & Add Buttons */}
                                  {formik.values.educationInfo.length > 1 && (
                                    <Index.Box
                                      gridColumn="span 1"
                                      className="grid-column"
                                    >
                                      <Index.Button
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        color="error"
                                      >
                                        -
                                      </Index.Button>
                                    </Index.Box>
                                  )}
                                  <Index.Box
                                    gridColumn="span 1"
                                    className="grid-column"
                                  >
                                    <Index.Button
                                      type="button"
                                      onClick={() =>
                                        arrayHelpers.push({
                                          classId: "",
                                          courseId: "",
                                          grade: "",
                                          tenthPercentage: "",
                                          twelfthPercentage: "",
                                        })
                                      }
                                      color="primary"
                                    >
                                      +
                                    </Index.Button>
                                  </Index.Box>
                                </Index.Box>
                              );
                            })}
                          </>
                        )}
                      />
                    </Index.Box>
                  </Index.Box>
                </Index.Box>

                <Index.Box className="admin-modal-footer">
                  <Index.Box className="admin-modal-user-btn-flex">
                    <Index.Box className="admin-save-btn-main primary-btn-main">
                      <Index.Button
                        loading={loader}
                        className="admin-save-user-btn primary-btn"
                        type="submit"
                      >
                        Submit
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Form>
          )}
        </Formik>
      </Index.Modal>
    </>
  );
}
