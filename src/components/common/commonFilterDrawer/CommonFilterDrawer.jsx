import React from "react";
import dayjs from "dayjs";
import Index from "../../../containers/Index";
import PageIndex from "../../../containers/PageIndex";

const CommonFilterDrawer = ({
  state,
  toggleDrawer,
  anchor,
  filters,
  filterName,
  handleResetFilter
}) => {
  return (
    <Index.SwipeableDrawer
      className="admin-filter-main"
      anchor={anchor}
      open={state[anchor]}
      onClose={toggleDrawer(anchor, false)}
      onOpen={toggleDrawer(anchor, true)}
    >
      <Index.Box className="admin-filter-header">
        <Index.Typography className="admin-filter-title">
          {filterName}
        </Index.Typography>
        <span onClick={toggleDrawer(anchor, false)} className="drawer-close-icon">
          <img
            src={PageIndex.Svg.whiteCloseIcon}
            className="admin-filter-close-icon"
            alt="Close"
          />
        </span>
      </Index.Box>
      <Index.Box className="admin-filter-inner-main scrollbar">
        <Index.Box sx={{ width: 1 }} className="grid-main">
          <Index.Box
            display="grid"
            className="admin-filter-row"
            gridTemplateColumns="repeat(12, 1fr)"
            gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
          >
            {filters?.map((filter, index) => (
              <Index.Box
                key={index}
                gridColumn={{
                  xs: "span 12",
                  sm: "span 12",
                  md: "span 12",
                  lg: "span 12"
                }}
                className="grid-column"
              >
                {filter.type === "date" && (
                  <Index.Box className="admin-input-box filter-input filter-date-input-box">
                    <Index.FormHelperText className="admin-form-lable">
                      {filter.label}
                    </Index.FormHelperText>
                    <Index.Box className="admin-form-group">
                      <PageIndex.LocalizationProvider
                        dateAdapter={PageIndex.AdapterDayjs}
                      >
                        <PageIndex.DatePicker
                          className="filter-date-control"
                          name={filter.name}
                          format="DD/MM/YYYY"
                          value={filter.value ? dayjs(filter.value) : null}
                          onChange={(date) =>
                            filter.handleFilter(
                              date ? date.format("YYYY/MM/DD") : ""
                            )
                          }
                        />
                      </PageIndex.LocalizationProvider>
                    </Index.Box>
                  </Index.Box>
                )}
                {filter.type === "dropdown" && (
                  <Index.Box className="admin-input-box filter-input">
                    <Index.FormHelperText className="admin-form-lable">
                      {filter.label}
                    </Index.FormHelperText>
                    <Index.Box className="admin-form-group">
                      <Index.Box className="admin-dropdown-box">
                        <Index.FormControl className="admin-form-control">
                          <Index.Select
                            className="admin-dropdown-select"
                            value={filter.value}
                            onChange={(e) =>
                              filter.handleFilter(e.target.value)
                            }
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            renderValue={
                              filter.value !== ""
                                ? undefined
                                : () => (
                                    <span style={{ color: "#2a3547ab" }}>
                                      Select {filter.label.toLowerCase()}
                                    </span>
                                  )
                            }
                            disabled={!!filter?.disable}
                            MenuProps={{
                              PaperProps: {
                                className: "form-select-field",
                              },
                            }}
                          >
                            {filter.options?.map((option, idx) => (
                              <Index.MenuItem
                                key={idx}
                                value={
                                  option.id
                                    ? option.id
                                    : option.value
                                    ? option.value
                                    : option
                                }
                                className="admin-menuitem"
                              >
                                {option.name
                                  ? option.name
                                  : option.label
                                  ? option.label
                                  : option}
                              </Index.MenuItem>
                            ))}
                          </Index.Select>
                        </Index.FormControl>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                )}
              </Index.Box>
            ))}
          </Index.Box>
        </Index.Box>
      </Index.Box>
      <Index.Box className="admin-filter-footer">
        
        <Index.Box className="admin-page-btn-end-flex primary-btn-main border-btn-main">
          <PageIndex.PrimaryButton
            className="primary-btn"
            btnLabel="Reset"
            onClick={() => handleResetFilter()}
            fullWidth
          />
          <PageIndex.BorderButton
            className="admin-modal-cancel-btn border-btn"
            btnLabel="Cancel"
            onClick={toggleDrawer(anchor, false)}
            fullWidth
          />
        </Index.Box>
      </Index.Box>
    </Index.SwipeableDrawer>
  );
};

export default CommonFilterDrawer;
