import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  applyForInternshipService,
  checkInternshipApplicationService,
  getAllInternshipCourses,
} from "../../../../redux/services/UserService";
import * as Yup from "yup";

const InternshipBanner = ({ fetchMyInternships }) => {
  const [applyInternshipOpen, setApplyInternshipOpen] = useState(false);
  const [isInternshipApplied, setIsInternshipApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reloadInternshipApplied, setReloadInternshipApplied] = useState(false);
  const handleApplyInternshipOpen = () => {
    setApplyInternshipOpen(true);
  };

  const handleApplyInternshipClose = () => {
    setApplyInternshipOpen(false);
  };

  const checkInternshipAppliedOrNot = async () => {
    setLoading(true);
    try {
      const response = await checkInternshipApplicationService();
      if (response?.status === 200) {
        setIsInternshipApplied(response.data.internshipApplied);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkInternshipAppliedOrNot();
    fetchMyInternships();
  }, [reloadInternshipApplied]);
  return (
    <Index.Box className="adver-banner-box">
      <Index.Box className="container" style={{ paddingTop: "40px" }}>
        <Index.Box className="banner-img-box">
          <a href="/" className="high-link-logo">
            <img
              src={PageIndex.Png.BannerLogo}
              className="banner-logo-img"
              alt="BannerLogo"
            />
          </a>
        </Index.Box>
        <Index.Box className="banner-title-box">
          <h2 className="banner-title-cont">
            {" "}
            Lenovo Leap NextGen Scholar Program{" "}
          </h2>
        </Index.Box>
        <Index.Box className="banner-cont-detail">
          <Index.Grid container sx={{ justifyContent: "space-between" }}>
            <Index.Grid item xs={12} md={5}>
              <Index.Box className="banner-cont-detail-box">
                <h4 className="banner-detail-title">About the Program</h4>
                <p className="banner-detail-descript">
                  Lenovo Leap: NextGen Scholar Program is an industry-driven
                  initiative designed to equip students with essential skills in
                  Artificial Intelligence (AI), Data Analytics, and Web
                  Development. Individuals will be working on real-life projects by
                  attending live masterclasses and mentoring sessions, ensuring
                  participants gain practical exposure to emerging technologies.
                </p>
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} md={1} className="grid-col-1-fix">
              <Index.Box className="top-border-box"></Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} md={6}>
              <Index.Box className="banner-cont-detail-box">
                <h4 className="banner-detail-title">Who Can Participate?</h4>
                <p className="banner-detail-descript">
                  The Lenovo Leap NextGen Scholar Program is open to students from
                  colleges, universities, ITIs, and polytechnics, of every
                  stream. It is designed for individuals keen on developing
                  expertise in emerging tech like AI, Data Analytics, and Web
                  Development. No prior experience is required, making it an
                  excellent opportunity for beginners as well as those looking
                  to enhance their technical skills.
                </p>
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} md={5}>
              <Index.Box className="banner-cont-detail-box leap-program">
                {/* <h4 className="banner-detail-title">Registration & Process</h4>
                <p className="banner-detail-descript">
                  An individual will choose any one learning track amongst AI,
                  WD and DA to complete the Internship registration process on
                  the platform.
                </p> */}
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} md={6}>
              <Index.Box className="banner-img-cont-detail">
                <img src={PageIndex.Png.BannerBGCert} alt="Banner" />
              </Index.Box>
            </Index.Grid>
            <Index.Grid item xs={12} md={8}>
              <Index.Box
                className="banner-cont-detail-box"
                style={{ marginBottom: "0" }}
              >
                <h4 className="banner-detail-title">
                  Why join the Lenovo Leap Program?
                </h4>
              </Index.Box>
              <Index.Grid container spacing={2}>
                <Index.Grid item xs={12} md={4}>
                  <Index.Box className="certi-list-icon-detail">
                    <Index.Box className="certi-list-icon">
                      <Index.Box className="certi-list-icon-box">
                        <img
                          src={PageIndex.Png.CertinewIcon1}
                          className="certi-list-icon-img"
                          alt="Banner"
                        />
                      </Index.Box>
                      <p className="certi-descript">
                        Felicitation by the Hon’ble Chief Minister of Goa
                      </p>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={4}>
                  <Index.Box className="certi-list-icon-detail">
                    <Index.Box className="certi-list-icon">
                      <Index.Box className="certi-list-icon-box">
                        <img
                          src={PageIndex.Png.CertinewIcon3}
                          className="certi-list-icon-img"
                          alt="Banner"
                        />
                      </Index.Box>
                      <p className="certi-descript">
                        Certificate recognition by MDs of Lenovo and Motorola
                      </p>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={4}>
                  <Index.Box className="certi-list-icon-detail">
                    <Index.Box className="certi-list-icon">
                      <Index.Box className="certi-list-icon-box">
                        <img
                          src={PageIndex.Png.CertinewIcon5}
                          className="certi-list-icon-img"
                          alt="Banner"
                        />
                      </Index.Box>
                      <p className="certi-descript">
                        Expert-led masterclasses and mentorship
                      </p>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={4}>
                  <Index.Box className="certi-list-icon-detail">
                    <Index.Box className="certi-list-icon">
                      <Index.Box className="certi-list-icon-box">
                        <img
                          src={PageIndex.Png.CertinewIcon2}
                          className="certi-list-icon-img"
                          alt="Banner"
                        />
                      </Index.Box>
                      <p className="certi-descript">
                        Work on real-time project by building solutions for Goa
                        state
                      </p>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={4}>
                  <Index.Box className="certi-list-icon-detail">
                    <Index.Box className="certi-list-icon">
                      <Index.Box className="certi-list-icon-box">
                        <img
                          src={PageIndex.Png.CertinewIcon4}
                          className="certi-list-icon-img"
                          alt="Banner"
                        />
                      </Index.Box>
                      <p className="certi-descript">
                        Rewards for top selected individuals
                      </p>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
                <Index.Grid item xs={12} md={4}>
                  <Index.Box className="certi-list-icon-detail">
                    <Index.Box className="certi-list-icon">
                      <Index.Box className="certi-list-icon-box">
                        <img
                          src={PageIndex.Png.CertinewIcon6}
                          className="certi-list-icon-img"
                          alt="Banner"
                        />
                      </Index.Box>
                      <p className="certi-descript">Institute recognition</p>
                    </Index.Box>
                  </Index.Box>
                </Index.Grid>
              </Index.Grid>
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
        <Index.Box className="banner-event-box">
          <Index.Grid container>
            <Index.Grid item xs={12} md={10}>
              <div className="banner-event-date" style={{ justifyItems: "center" }}>
                <img
                  src={PageIndex.Png.calendar}
                  className="calender-icon"
                  alt=""
                />
                <h4 className="banner-event-descirpt">
                  {" "}
                  {/* Internship starts from: June Month{" "} */}
                  {/* <span className="line-cont">|</span>  */}
                  Join the Program Now !
                </h4>
              </div>
            </Index.Grid>
            <Index.Grid item xs={12} md={2}>
              {isInternshipApplied ? (
                <PageIndex.BorderButton
                  className="admin-modal-cancel-btn border-btn"
                  btnLabel="Applied"
                  disableRipple
                  endIcon={<img src={PageIndex.Svg.approveIcon} />}
                />
              ) : (
                <PageIndex.PrimaryButton
                  className="admin-modal-cancel-btn primary-btn"
                  btnLabel="Apply Now"
                  onClick={handleApplyInternshipOpen}
                  loading={loading}
                />
              )}
            </Index.Grid>
          </Index.Grid>
        </Index.Box>
        {applyInternshipOpen && (
          <ApplyInternshipForm
            open={applyInternshipOpen}
            handleClose={handleApplyInternshipClose}
            handleReloadInternshipApplied={() => {
              setReloadInternshipApplied(!reloadInternshipApplied);
            }}
          />
        )}
      </Index.Box>
    </Index.Box>
  );
};

const ApplyInternshipForm = ({
  open,
  handleClose,
  handleReloadInternshipApplied,
}) => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSubmitInternshipRequest = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const payload = {
        internshipId: values?.courseId,
      };
      const response = await applyForInternshipService(payload);
      if (response?.status === 201) {
        handleReloadInternshipApplied();
        handleClose();
        resetForm();
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      setSubmitting(false);
    }
  };

  const internshipSchema = Yup.object().shape({
    courseId: Yup.string().required("Please select course."),
  });

  const formik = Index.useFormik({
    initialValues: { courseId: "" },
    onSubmit: handleSubmitInternshipRequest,
    validationSchema: internshipSchema,
  });

  const getCourses = async () => {
    try {
      const response = await getAllInternshipCourses();
      if (response?.status == 200) {
        setCourseList(response?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("307: ");
    getCourses();
  }, []);
  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={open}
      onClose={handleClose}
      aria-describedby="modal-modal-description"
      className="admin-modal internship-modal"
    >
      <Index.Box
        sx={PageIndex.style}
        className="admin-modal-inner admin-delete-modal-inner-main internship-modal-inner-main"
      >
        <form onSubmit={formik?.handleSubmit}>
          <Index.Box className="admin-modal-body">
            <Index.Typography
              className="admin-delete-modal-title"
              variant="body1"
            >
              Apply For Internship
            </Index.Typography>

            <Index.Box className="admin-input-box">
              <Index.FormHelperText className="admin-form-lable">
                Select Course
                <span className="sign-required">* </span>
              </Index.FormHelperText>
              <Index.Autocomplete
                options={courseList || []}
                getOptionLabel={(option) => option?.Title}
                value={
                  courseList?.find(
                    (course) => course?.id === formik?.values?.courseId
                  ) || null
                }
                onChange={(event, newValue) => {
                  formik.setFieldValue(
                    "courseId",
                    newValue ? newValue?.id : ""
                  );
                }}
                renderInput={(params) => (
                  <Index.TextField
                    {...params}
                    fullWidth
                    id="course-select"
                    className="admin-form-control"
                    placeholder="Select Course"
                    autoComplete="off"
                    name="courseId"
                    onBlur={formik.handleBlur}
                    error={
                      formik?.touched?.courseId &&
                      Boolean(formik?.errors?.courseId)
                    }
                  />
                )}
                classes={{
                  option: "custom-hackathon-dropdown",
                  listbox: "custom-autocomplete-dropdown-list",
                }}
              />
              <Index.FormHelperText error className="admin-form-lable">
                {formik?.touched?.courseId && formik?.errors?.courseId}
              </Index.FormHelperText>
            </Index.Box>

            <Index.Box className="admin-delete-modal-btn-flex border-btn-main btn-main">
              <PageIndex.BorderButton
                className="admin-modal-cancel-btn border-btn"
                btnLabel="Cancel"
                onClick={handleClose}
                disabled={formik?.isSubmitting}
              />
              <PageIndex.PrimaryButton
                className="primary-btn"
                btnLabel="Submit"
                type="submit"
                loading={formik?.isSubmitting}
              />
            </Index.Box>
          </Index.Box>
        </form>
      </Index.Box>
    </Index.Modal>
  );
};

export default InternshipBanner;
