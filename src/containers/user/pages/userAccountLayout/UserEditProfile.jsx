import React, { useEffect, useState } from "react";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";
import moment from "moment";
import { getSingleUserDetailsServices } from "../../../../redux/services/AdminService";
import { setUserProfile } from "../../../../redux/slices/UserSlice";

export default function UserEditProfile({ setIsEdit, setEditData }) {
  const [viewData, setViewData] = useState({});
  const dispatch = PageIndex.useDispatch();
  const navigate = PageIndex.useNavigate();
  const [loading, setLoading] = useState(false);

  const [openUpdateVerifyModal, setOpenUpdateVerifyModal] = useState(false);
  const handleOpenUpdateVerifyModal = () => setOpenUpdateVerifyModal(true);
  const handleCloseUpdateVerifyModal = () => setOpenUpdateVerifyModal(false);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
  };

  const fetchSingleUserData = async () => {
    setLoading((prev) => ({
      ...prev,
      pageLoading: true,
    }));
    try {
      const res = await getSingleUserDetailsServices();
      setViewData(res?.data);
      setEditData(res?.data);
      dispatch(setUserProfile(res?.data))
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading((prev) => ({
        ...prev,
        pageLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchSingleUserData();
  }, []);


  return (
    <>
      {loading.pageLoading ? (
        <PageIndex.PageLoader />
      ) : (
        <>
          <Index.Box className="admin-edit-profile-main">
            <Index.Box className="common-card view-profile-card">
              <Index.Box className="view-profile-card-title-flex">
                <Index.Typography className="view-profile-card-title">
                  Personal Information
                </Index.Typography>
                <Index.Box className="view-edit-btn-main">
                  <Index.Button
                    className="view-edit-btn"
                    onClick={() => setIsEdit(true)}
                    // onClick={handleOpenUpdatePersonalInformation}
                  >
                    <img
                      src={PageIndex.Svg.pencilIcon}
                      alt="Edit"
                      className="view-edit-icon"
                    />
                  </Index.Button>
                </Index.Box>
              </Index.Box>
              <Index.Box className="profile-img-box">
                  <img
                    className="view-profile-img"
                    alt="User"
                    src={
                      viewData?.image
                        ? `${PageIndex.imageUrl}${viewData?.image}`
                        : PageIndex?.Png?.userAvtarIcon
                    }
                    onError={(e)=>{
                      e.target.src = PageIndex?.Png?.userAvtarIcon;
                    }}
                  />
              </Index.Box>
              <Index.Box className="view-profile-card-flex">
                <Index.Box className="view-profile-img-flex">
                  <Index.Box className="view-profile-content-box">
                    <Index.Box className="view-data-flex">
                      <Index.Typography className="view-data-lable">
                        Name:
                      </Index.Typography>
                      <Index.Typography className="view-data-value">
                        {viewData?.name}
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-data-flex">
                      <Index.Typography className="view-data-lable">
                        Contact Number:
                      </Index.Typography>
                      <Index.Typography className="view-data-value">
                        {viewData?.contactNumber}
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-data-flex">
                      <Index.Typography className="view-data-lable">
                        Email:
                      </Index.Typography>
                      <Index.Typography className="view-data-value">
                        {viewData?.email}
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-data-flex">
                      <Index.Typography className="view-data-lable">
                        DOB:
                      </Index.Typography>
                      <Index.Typography className="view-data-value">
                        {moment(viewData?.dob).format("DD-MM-YYYY")}
                      </Index.Typography>
                    </Index.Box>
                    <Index.Box className="view-data-flex">
                      <Index.Typography className="view-data-lable">
                        Gender:
                      </Index.Typography>
                      <Index.Typography className="view-data-value">
                        {viewData?.gender}
                      </Index.Typography>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
                <Index.Box className="view-data-main view-dashline-main">
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      College Name:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.college_name?.replace("Other -", "").trim()}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      Institute Type:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.institute_type || "-"}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      Stream:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.streamName || "-"}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      Semester:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.semesterName || "-"}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      District:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.districtName}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      Taluka:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.talukaName}
                    </Index.Typography>
                  </Index.Box>
                  <Index.Box className="view-data-flex">
                    <Index.Typography className="view-data-lable">
                      PWD:
                    </Index.Typography>
                    <Index.Typography className="view-data-value">
                      {viewData?.pwdOption === 1 ? "Yes" : "No"}
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          {/* </Index.Box>   */}
          <PageIndex.VerifyOtpModal
            openUpdate={openUpdateVerifyModal}
            handleOpenUpdate={handleOpenUpdateVerifyModal}
            handleCloseUpdate={handleCloseUpdateVerifyModal}
            viewData={viewData}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </>
      )}
    </>
  );
}
