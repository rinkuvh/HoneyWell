import React from "react";
import PropTypes from "prop-types";
import Index from "../../../containers/Index";
import PageIndex from "../../../containers/PageIndex";

const CommonTable = ({
  columns,
  data,
  onRowClick,
  actions,
  className = "",
  pagination = {
    currentPage: 1,
    rowsPerPage: 10,
    totalRows: 0,
    handlePageChange,
    handleRowsPerPageChange,
  },
  moduleName = "Data",
}) => {
  const {
    currentPage,
    rowsPerPage,
    totalRows,
    handlePageChange,
    handleRowsPerPageChange,
  } = pagination;

  // Helper function to handle nested keys using reduce
  const getValue = (row, key) =>
    key.includes(".")
      ? key.split(".").reduce((acc, k) => acc?.[k], row)
      : row[key];

  const isValidDate = (value) => {
    return (
      Index.moment(value, Index.moment.ISO_8601, true).isValid() && isNaN(value)
    );
  };

  return (
    <Index.Box className={`page-table-main common-table-main ${className}`}>
      <Index.TableContainer
        component={Index.Paper}
        className="table-container"
        sx={{ maxHeight: 550 }}
      >
        <Index.Table stickyHeader aria-label="sticky table" className="table">
          <Index.TableHead className="table-head">
            <Index.TableRow className="table-row">
              {columns.map((col) => (
                <Index.TableCell
                  key={col.key}
                  component="th"
                  variant="th"
                  className="table-th"
                  width={col.width}
                >
                  {col.label}
                </Index.TableCell>
              ))}
              {actions?.length > 0 && (
                <Index.TableCell
                  component="th"
                  variant="th"
                  className="table-th"
                  width={actions?.[0]?.width}
                  align="center"
                >
                  Action
                </Index.TableCell>
              )}
            </Index.TableRow>
          </Index.TableHead>

          <Index.TableBody className="table-body">
            {data?.length > 0 ? (
              data?.map((row, rowIndex) => (
                <Index.TableRow
                  key={rowIndex}
                  className={
                    onRowClick
                      ? `clickable-row ${
                          !row.isRead ? "table-inbox-row-color" : ""
                        }`
                      : ""
                  }
                  onClick={onRowClick ? () => onRowClick(row) : undefined}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((col) => {
                    const value = col.render
                      ? col.render(row)
                      : getValue(row, col.key);

                    return (
                      <Index.TableCell
                        key={col.key}
                        component="td"
                        variant="td"
                        className="table-td"
                      >

                        {console.log("col.type",col.type)}
                        <Index.Box className="admin-table-data-flex">
                          {col.type === "ckeditor" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: value
                                  ? value.length > 50
                                    ? value.slice(0, 50) + "..."
                                    : value
                                  : "-",
                              }}
                              className="ckeditor-content admin-table-data-text"
                            />
                          ) : col.type === "switch" ? (
                            <Index.Box className="admin-switch-container">
                              <Index.Switch
                                checked={value == "1"}
                                onChange={() => {
                                  if (col.handleChange) {
                                    col.handleChange(
                                      value == "0" ? "Deactive" : "Active",
                                      row
                                    );
                                  }
                                }}
                                name={col.key}
                              />
                            </Index.Box>
                          ) : col.type === "select" ? (
                            <Index.Box className="admin-input-box filter-input">
                              <Index.Box className="admin-form-group">
                                <Index.Box className="admin-dropdown-box">
                                  <Index.FormControl className="admin-form-control">
                                    <Index.Select
                                      className="status-dropdown-select"
                                      value={value}
                                      onChange={(e) => {
                                        if (col.handleChange) {
                                          col.handleChange(e.target.value, row);
                                        }
                                      }}
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                    >
                                      {col.options?.map((row) => (
                                        <Index.MenuItem
                                          value={row[col?.key]}
                                          className="admin-menuitem"
                                        >
                                          {row[col?.key]}
                                        </Index.MenuItem>
                                      ))}
                                    </Index.Select>
                                  </Index.FormControl>
                                </Index.Box>
                              </Index.Box>
                            </Index.Box>
                          ) : col.limit && value?.length > col.limit ? (
                            <Index.Tooltip
                              title={value || "-"}
                              arrow
                              placement="bottom"
                              className="admin-tooltip"
                            >
                              <Index.Typography
                                className={`admin-table-data-text ${
                                  col.key === "status" && value === "Active"
                                    ? "status-active"
                                    : col.key === "status" &&
                                      value === "Deactive"
                                    ? "status-deactive"
                                    : ""
                                }`}
                              >
                                {col.key === "#"
                                  ? (currentPage - 1) * rowsPerPage +
                                    rowIndex +
                                    1
                                  : isValidDate(value)
                                  ? col.key === "dueDate"
                                    ? Index.moment(value)
                                        .subtract(1, "days")
                                        .format("MMM D, YYYY")
                                    : Index.moment(value).format("MMM D, YYYY")
                                  : value.slice(0, col.limit) + "..." || "-"}
                                {/* Show dash if no value */}
                              </Index.Typography>
                            </Index.Tooltip>
                          ) : col?.key == "status" && col?.type == "select" ? (
                            <Index.Box className="admin-form-group">
                              <Index.Box className="admin-dropdown-box">
                                <Index.FormControl className="admin-form-control">
                                  <Index.Select
                                    className="status-dropdown-select"
                                    value={col.value}
                                    onChange={(e) => {
                                      col?.handleChange(e, row);
                                    }}
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    renderValue={
                                      col?.renderValue !== ""
                                        ? undefined
                                        : () => (
                                            <span
                                              style={{ color: "#2a3547ab" }}
                                            >
                                              Select {col?.label}
                                            </span>
                                          )
                                    }
                                  >
                                    {col?.options?.map((row) => (
                                      <Index.MenuItem
                                        value={row.key}
                                        className="admin-menuitem"
                                      >
                                        {row.value}
                                      </Index.MenuItem>
                                    ))}
                                  </Index.Select>
                                </Index.FormControl>
                              </Index.Box>
                            </Index.Box>
                          ) : col?.type == "image" ? (
                            <Index.Box className="common-table-image">
                              <Index.Avatar
                                alt={row?.firstName}
                                src={`${PageIndex.imageUrl}${value}`}
                              />
                            </Index.Box>
                          ) : col?.type == "iconImage" ? (
                            <Index.Box className="common-table-image">
                              <img
                                alt={row?.firstName}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  ...(col?.style || {}),
                                }}
                                src={value}
                              />
                            </Index.Box>
                          ) : col?.type == "count" ? (
                            <Index.Typography
                              className={`admin-table-data-text`}
                            >
                              {value || value === 0 ? value : ""}
                            </Index.Typography>
                          ) : col?.type == "time" ? (
                            <Index.Typography
                              className={`admin-table-data-text`}
                            >
                              {Index.moment(value).format("h:mm:ss A")}
                            </Index.Typography>
                          ) : col?.type == "datetime" ? (
                            <Index.Typography
                              className={`admin-table-data-text`}
                            >
                              {Index.moment(value).format("MMM D, YYYY h:mm A")}
                              {/* {Index.moment(value).add(8, "hour").format("MMM D, YYYY h:mm A")} */}
                            </Index.Typography>
                          ) : col?.type == "quizdatetime" ? (
                            <Index.Typography
                              className={`admin-table-data-text`}
                            >
                              {Index.moment(value)
                                .add(8, "hour")
                                .format("MMM D, YYYY h:mm A")}
                            </Index.Typography>
                          ) : col?.type == "yesorno" ? (
                            <Index.Typography
                              className={`admin-table-data-text`}
                            >
                              {value == 1 ? "Yes" : "No"}
                            </Index.Typography>
                          ) : col?.type == "documentStatus" ? (
                            <Index.Typography
                              className={`admin-table-data-text`}
                            >
                              {value == 1 ? "Submitted" : "Pending"}
                            </Index.Typography>
                          ) : (
                            <Index.Typography
                              className={`admin-table-data-text ${
                                col.key === "status" && value === "Active"
                                  ? "status-active"
                                  : col.key === "status" && value === "Deactive"
                                  ? "status-deactive"
                                  : ""
                              }`}
                            >
                              {col.key === "#"
                                ? (currentPage - 1) * rowsPerPage + rowIndex + 1
                                : isValidDate(value)
                                ? col.key === "dueDate"
                                  ? Index.moment(value)
                                      .subtract(1, "days")
                                      .format("MMM D, YYYY")
                                  : Index.moment(value).format("MMM D, YYYY")
                                : value || "-"}
                            </Index.Typography>
                          )}
                        </Index.Box>
                      </Index.TableCell>
                    );
                  })}

                  {actions?.length > 0 && (
                    <Index.TableCell
                      component="td"
                      variant="td"
                      className="table-td"
                      align="right"
                    >
                      <Index.Box className="admin-table-data-btn-flex">
                        {actions
                          ?.filter(
                            (item) => !(item?.isHidden && item?.isHidden(row))
                          )
                          ?.map((action, actionIndex) => {
                            // Get the label correctly
                            const actionLable =
                              typeof action.label === "function"
                                ? action.label(row)
                                : action.label;

                            if (
                              row?.is_doc !== 0 &&
                              actionLable === "Upload Document"
                            ) {
                              console.log("Condition met, skipping render");
                              return null;
                            }

                            const actionImage =
                              typeof action.image === "function"
                                ? action.image(row)
                                : action.image;

                            return (
                              <Index.Tooltip
                                key={actionIndex}
                                title={actionLable}
                                arrow
                                placement="bottom"
                              >
                                <Index.Button
                                  className="admin-table-data-btn admin-table-edit-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(row);
                                  }}
                                >
                                  {actionImage && (
                                    <img
                                      src={actionImage}
                                      className="admin-icon"
                                      alt={actionLable}
                                    />
                                  )}
                                </Index.Button>
                              </Index.Tooltip>
                            );
                          })}
                      </Index.Box>
                    </Index.TableCell>
                  )}
                </Index.TableRow>
              ))
            ) : (
              <PageIndex.DataNotFound
                moduleName={moduleName}
                colSpan={columns?.length + 1}
              />
            )}
          </Index.TableBody>
        </Index.Table>
      </Index.TableContainer>

      <>
        {" "}
        {totalRows >= 10 && (
          <Index.Box className="admin-pagination-main">
            <Index.TablePagination
              className="pagination"
              component="div"
              count={totalRows}
              page={currentPage - 1}
              onPageChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Index.Box>
        )}{" "}
      </>
    </Index.Box>
  );
};

export default CommonTable;
