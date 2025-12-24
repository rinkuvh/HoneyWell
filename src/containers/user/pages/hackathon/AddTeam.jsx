import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import { createTeamAction, findUserByIdAndEmail, getMyTeamDetail } from "../../../../redux/services/UserService";
import { useParams } from "react-router-dom";

export default function AddTeam() {
  const [loading, setLoading] = useState(false);
  const navigate = PageIndex?.useNavigate();
  const location = PageIndex.useLocation();
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [findBtnLoader,setFindBtnLoader]=useState(false)
  const [teamDetail,setTeamDetail]=useState(null)
    const params = useParams();
  

  const initialValues = {
    // teamName: location?.state?.course_details?.Title || "",
    teamName:  teamDetail?.team_name|| "",
    // teamMember: "",
  };

  const validationSchema = Yup.object({
    teamName: Yup.string().required("Please enter team name"),
    // teamMember: Yup.string().required("Team Member is required"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const selectedUserIds = selectedUsers.map(user => user.id); 
    const data ={
      hackathonId:params.id,
      members: selectedUserIds,
      teamName: values.teamName
    }

    if(params?.id && params?.teamId){
      data.teamId = params.teamId;
    }

    try {
      const res = await createTeamAction(data);
      if (res?.status === 201 || res?.status === 200) {
        navigate(-1);
      } 
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchTeamDetail = async () => {
      try {
        const response = await getMyTeamDetail(params?.teamId);
        // console.log("response",response)
        if (response?.status === 200) {
          setTeamDetail(response?.data?.teamData);
  
          // setTimeout(() => {
          //   setLoading(false);
          // }, 500);
        } else {
          // setTimeout(() => {
          //   setLoading(false);
          // }, 500);
        }
      } catch (error) {}
    };

    useEffect(()=>{
      fetchTeamDetail();
    },[params?.id,params?.teamId])

  return (
    <Index.Box className="container">
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <Index.Box className="admin-dashboard-content">
          <Index.Box className="admin-page-title-flex admin-page-title-main">
            <Index.Typography
              className="admin-page-title"
              component="h2"
              variant="h2"
            >
              {/* Create Team */}
              {teamDetail ? "Edit" : "Create"} Team
            </Index.Typography>
          </Index.Box>
          <Index.Box className="common-card">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleChange, handleBlur, values }) => (
                <Form>
                  <Index.Box sx={{ width: 1 }} className="grid-main">
                    <Index.Box
                      display="grid"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gap={2}
                    >
                      {/* Team Name Input */}
                      <Index.Box
                        gridColumn={{ xs: "span 12", sm: "span 10" }}
                        className="grid-column"
                      >
                        <Index.Box className="add-page-form-main ">
                          <Index.Box className="admin-input-box">
                            <Index.FormHelperText className="admin-form-lable">
                              Team Name
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Field
                                as={Index.TextField}
                                fullWidth
                                className="admin-form-control"
                                placeholder="Enter Team Name"
                                autoComplete="off"
                                name="teamName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.teamName}
                              />
                              <ErrorMessage
                                name="teamName"
                                component="div"
                                className="error-message"
                              />
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                    <br/>
                    <br/>

                    {/* Submit and Back Buttons */}
                    <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
                      <PageIndex.BorderButton
                        className="admin-modal-cancel-btn border-btn"
                        onClick={() => navigate(-1)}
                        btnLabel="Back"
                      />
                      <PageIndex.PrimaryButton
                        className="primary-btn"
                        btnLabel="Submit"
                        type="submit"
                        loading={loading}
                      />
                    </Index.Box>
                  </Index.Box>
                </Form>
              )}
            </Formik>
          </Index.Box>
        </Index.Box>
      )}
    </Index.Box>
  );
}