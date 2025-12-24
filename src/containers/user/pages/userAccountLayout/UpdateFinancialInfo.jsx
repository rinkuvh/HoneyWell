import React, { useEffect, useState } from "react";
import Index from "../../../Index";
import PageIndex from "../../../PageIndex";
import {
  getAllIncomeService,
  getAllOccupation,
  getAllTypeOfOrganization,
} from "../../../../redux/services/AdminService";
import { updateProfile } from "../../../../redux/services/UserService";

export default function UpdateFinancialInfo(props) {
  const {
    openUpdate,
    handleOpenUpdate,
    handleCloseUpdate,
    viewData: userProfile,
  } = props;

  const dispatch = PageIndex.useDispatch();
  const [typeOfOrganization, setTypeOfOrganization] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [familyIncomes, setFamilyIncomes] = useState([]);
  const [loader, setLoader] = useState(false);

  const initialValues = {
    income: userProfile?.financialInfo?.income || "",
    familyIncomeId: userProfile?.financialInfo?.familyIncomeId?._id || "",
    occupationId: userProfile?.financialInfo?.occupationId?._id || "",
    organizationId: userProfile?.financialInfo?.organizationId?._id || "",
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("financialInfo.income", values.income);
    formData.append("financialInfo.familyIncomeId", values.familyIncomeId);
    formData.append("financialInfo.occupationId", values.occupationId);
    formData.append("financialInfo.organizationId", values.organizationId);
    setLoader(true);
    dispatch(updateProfile(formData)).then((data) => {
      if (data?.payload?.status == 200) {
        setLoader(false);
        handleCloseUpdate();
      }
    });
  };

  const getAllFamilyIncome = () => {
    getAllIncomeService({ limit: -1 }).then((res) => {
      if (res?.status == 200) {
        // console.log("first",res?.data)
        setFamilyIncomes(res?.data?.Incomes);
      }
    });
  };
  const getTypeOfOrganizationList = () => {
    getAllTypeOfOrganization({ limit: -1 }).then((res) => {
      if (res?.status == 200) {
        setTypeOfOrganization(res?.data?.organizatons);
      }
    });
  };

  const getAllOccupationList = () => {
    getAllOccupation({ limit: -1 }).then((res) => {
      if (res?.status == 200) {
        setOccupations(res?.data?.Occupations);
      }
    });
  };

  useEffect(() => {
    getTypeOfOrganizationList();
    getAllOccupationList();
    getAllFamilyIncome();
  }, []);

  return (
    <>
      <Index.Modal
        open={openUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="admin-modal"
      >
        <Index.Formik
          enableReinitialize={true}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={PageIndex.editFinancialInformationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
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
                    Update Financial Information
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
                          Financial Information
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                      >
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
                              Income
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.TextField
                                fullWidth
                                id="fullWidth"
                                className="admin-form-control"
                                placeholder="Enter Income"
                                onBlur={formik.handleBlur}
                                value={formik?.values?.income}
                                onChange={(e) => {
                                  let inputValue = e.target.value;
                                  inputValue =
                                    PageIndex.allowOnlyNumbers(inputValue);
                                  formik.setFieldValue(
                                    "income",
                                    inputValue.slice(0, 10)
                                  );
                                }}
                                autoComplete="off"
                                name="income"
                              />
                            </Index.Box>
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik?.touched?.income &&
                                formik?.errors?.income}
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
                              Family Income
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    name="familyIncomeId"
                                    value={formik.values.familyIncomeId}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        "familyIncomeId",
                                        e.target.value
                                      )
                                    }
                                    onBlur={formik.handleBlur}
                                    renderValue={
                                      formik.values.familyIncomeId !== ""
                                        ? undefined
                                        : () => (
                                            <span
                                              style={{ color: "#2a3547ab" }}
                                            >
                                              Select family income
                                            </span>
                                          )
                                    }
                                  >
                                    {familyIncomes?.map((row) => (
                                      <Index.MenuItem
                                        key={row?._id}
                                        value={row?._id}
                                        className="admin-menuitem"
                                      >
                                        {row?.income}
                                      </Index.MenuItem>
                                    ))}
                                  </Index.Select>
                                </Index.FormControl>
                              </Index.Box>
                              <Index.FormHelperText
                                error
                                className="admin-form-lable"
                              >
                                {formik?.touched?.familyIncomeId &&
                                  formik?.errors?.familyIncomeId}
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
                              Occupation
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    name="occupationId"
                                    value={formik.values.occupationId}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        "occupationId",
                                        e.target.value
                                      )
                                    }
                                    onBlur={formik.handleBlur}
                                    renderValue={
                                      formik.values.occupationId !== ""
                                        ? undefined
                                        : () => (
                                            <span
                                              style={{ color: "#2a3547ab" }}
                                            >
                                              Select occupations
                                            </span>
                                          )
                                    }
                                  >
                                    {occupations?.map((row) => (
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
                                {formik?.touched?.occupationId &&
                                  formik?.errors?.occupationId}
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
                              Organization
                            </Index.FormHelperText>
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="admin-dropdown-select"
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    name="organizationId"
                                    value={formik.values.organizationId}
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        "organizationId",
                                        e.target.value
                                      )
                                    }
                                    onBlur={formik.handleBlur}
                                    renderValue={
                                      formik.values.organizationId !== ""
                                        ? undefined
                                        : () => (
                                            <span
                                              style={{ color: "#2a3547ab" }}
                                            >
                                              Select family income
                                            </span>
                                          )
                                    }
                                  >
                                    {typeOfOrganization?.map((row) => (
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
                                {formik?.touched?.organizationId &&
                                  formik?.errors?.organizationId}
                              </Index.FormHelperText>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
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
            </form>
          )}
        </Index.Formik>
      </Index.Modal>
    </>
  );
}
