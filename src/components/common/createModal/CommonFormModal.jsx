import React, { useState, useEffect } from "react";
import PageIndex from "../../../containers/PageIndex";
import Index from "../../../containers/Index";
import * as Yup from "yup";

const CommonFormModal = ({
  isOpen,
  onClose,
  fields,
  onSubmit,
  formName,
  initialData,
  loading,
  description = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [multipleFile, setMultipleFile] = useState([]);

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Generate validation schema dynamically
  const validationSchema = Yup.object(
    fields.reduce((schema, field) => {
      schema[field.name] = field.validation || Yup.string();
      return schema;
    }, {})
  );

  // Initialize formik with initialData for editing
  const formik = PageIndex.useFormik({
    initialValues: fields.reduce((values, field) => {
      // Use initialData to pre-populate fields if available, otherwise default to empty string
      values[field.name] = initialData ? initialData[field.name] || "" : "";
      return values;
    }, {}),
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      // onClose();
    },
  });

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      formik.resetForm(); // Reset form when closing the modal
      setImageUrl(null);
      setMultipleFile([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && initialData) {
      const newValues = fields.reduce((values, field) => {
        const fieldValue = initialData[field.name];

        // Check if the field value is provided
        if (fieldValue) {
          // If it's an object containing _id (this will handle the select use case)
          if (typeof fieldValue === "object" && fieldValue._id) {
            values[field.name] = fieldValue._id || ""; // Save the _id or empty string
          }
          // If it's an array (multiple images), store image URLs (or endpoints)
          else if (Array.isArray(fieldValue)) {
            values[field.name] = fieldValue.map((img) => img); // Save array of image URLs
          }
          // If it's a string (single image URL or regular text)
          else if (
            typeof fieldValue === "string" &&
            fieldValue.match(/\.(jpg|jpeg|png|gif)$/i)
          ) {
            values[field.name] = fieldValue; // Save the single image URL
          }
          // For any other type of string (regular text data)
          else {
            values[field.name] = fieldValue || ""; // Save text field
          }
        }

        return values;
      }, {});

      // Handle setting image URLs for single/multiple images and object with _id
      fields.forEach((field) => {
        const fieldValue = initialData[field.name];

        // If the field is an array of image endpoints, set multiple images
        if (Array.isArray(fieldValue) && fieldValue.length > 0) {
          setMultipleFile(
            fieldValue.map((img) => `${PageIndex.imageUrl}${img}`)
          );
        }
        // If it's a single image (string), set the single image URL
        else if (
          typeof fieldValue === "string" &&
          fieldValue.length > 0 &&
          fieldValue.match(/\.(jpg|jpeg|png|gif)$/i)
        ) {
          setImageUrl(`${PageIndex.imageUrl}${fieldValue}`);
        }
      });

      // Only update formik values if the new values are different
      if (JSON.stringify(formik.values) !== JSON.stringify(newValues)) {
        formik.setValues(newValues);
      }
    }
  }, [isOpen, initialData]);

  const uploadMultipleFiles = (event, formik) => {
    const fileArray = Array.from(event.target.files);
    const maxAllowedImages = 10;

    // Check if the total number of selected images exceeds the maximum allowed
    if (fileArray.length + formik?.values.image.length > maxAllowedImages) {
      // Display a toast message or any other UI indication that the limit has been reached
      formik?.setFieldError(
        "image",
        `Maximum ${maxAllowedImages} images allowed.`
      );

      return;
    }

    const newMultipleFile = [...multipleFile];
    const newProductImage = [...formik?.values.image];

    fileArray.forEach((file) => {
      newMultipleFile.push(URL.createObjectURL(file));
      newProductImage.push(file);
    });

    formik.setFieldValue("image", newProductImage);
    setMultipleFile(newMultipleFile);
    formik?.setFieldTouched("image", true);
  };

  const handleRemoveImage = (index, formik) => {
    const newMultipleFile = [...multipleFile];
    newMultipleFile.splice(index, 1);
    setMultipleFile(newMultipleFile);

    const newProductImage = [...formik.values.image];
    newProductImage.splice(index, 1);
    formik.setFieldValue("image", newProductImage);
  };
console.log("imge",imageUrl)
  return (
    <Index.Modal
      aria-labelledby="modal-modal-title"
      open={isOpen}
      onClose={onClose}
      aria-describedby="modal-modal-description"
      className="admin-modal"
    >
      <form onSubmit={formik.handleSubmit}>
        <Index.Box
          sx={PageIndex.style}
          className="admin-modal-inner view-document-modal-inner-main"
        >
          <Index.Box className="admin-modal-header">
            <Index.Typography className="admin-modal-title">
              {initialData ? "Edit" : "Add"} {formName}
            </Index.Typography>
            <Index.Button className="modal-close-btn" onClick={onClose}>
              <img
                src={PageIndex.Svg.closeblack}
                className="admin-modal-close-icon"
                alt="Close"
              />
            </Index.Button>
          </Index.Box>
          <Index.Box className="admin-modal-body">
            <Index.Box className="admin-modal-hgt-scroll cus-scrollbar">
              <Index.Box sx={{ width: 1 }} className="grid-main">
                {description && (
                  <Index.Box className="admin-reject-modal-inner-main">
                    <Index.Typography
                      className="admin-reject-modal-title"
                      component="h2"
                      variant="h2"
                    >
                      Are you sure?
                    </Index.Typography>
                    <Index.Typography
                      className="admin-reject-modal-para"
                      component="p"
                    >
                      {description}
                    </Index.Typography>
                  </Index.Box>
                )}

                <Index.Box
                  display="grid"
                  gridTemplateColumns="repeat(12, 1fr)"
                  gap={{ xs: 2, sm: 2, md: 2, lg: 2 }}
                >
                  {fields?.map((field) => (
                    <Index.Box
                      gridColumn={{
                        xs: "span 12",
                        sm: "span 12",
                        md: "span 12",
                        lg: "span 12",
                      }}
                      className="grid-column"
                      key={field.name}
                    >
                      <Index.Box className="admin-input-box ">
                        <Index.FormHelperText className="admin-form-lable">
                          {field.label}
                          {field.type !== "image" && (
                            <span className="sign-required">* </span>
                          )}
                        </Index.FormHelperText>

                        {field.type === "image" ? (
                          <Index.Box className="admin-input-box add-user-input">
                            <Index.Box className="admin-form-group">
                              <Index.Box className="file-upload-btn-main">
                                <Index.Button
                                  variant="contained"
                                  component="label"
                                  className="file-upload-btn"
                                >
                                  <img
                                    className={`${
                                      imageUrl
                                        ? "file-upload-profile-img"
                                        : "file-upload-icon-img"
                                    }`}
                                    src={
                                      imageUrl
                                        ? imageUrl
                                        : PageIndex.Svg.addIcon
                                    }
                                    crossorigin="anonymous"
                                    key={imageUrl}
                                  />
                                  <input
                                    hidden
                                    accept="image/*"
                                    name="logo"
                                    type="file"
                                    onChange={(e) => {
                                      try {
                                        if (
                                          e.target.files &&
                                          e.target.files[0]
                                        ) {
                                          formik.setFieldValue(
                                            field.name,
                                            e.target.files[0]
                                          );
                                          setImageUrl(
                                            URL.createObjectURL(
                                              e.target.files[0]
                                            )
                                          );
                                        }
                                      } catch (error) {
                                        e.target.value = null;
                                      }
                                    }}
                                  />
                                </Index.Button>
                                {imageUrl && (
                                  <Index.Button
                                    variant="contained"
                                    color="error"
                                    className="file-remove-btn"
                                    onClick={() => {
                                      formik.setFieldValue("image", null);
                                      setImageUrl(null);
                                    }}
                                  >
                                    <img
                                      src={PageIndex.Svg.whiteCloseIcon}
                                      className="file-remove-close-icon"
                                    />
                                  </Index.Button>
                                )}
                              </Index.Box>
                            </Index.Box>
                            {formik.touched[field.name] &&
                              formik.errors[field.name] && (
                                <Index.FormHelperText
                                  error
                                  className="admin-error-text"
                                >
                                  {formik.errors[field.name]}
                                </Index.FormHelperText>
                              )}
                          </Index.Box>
                        ) : field.type === "multiple-image" ? (
                          <>
                            <Index.Box className="multi-file-upload-main">
                              <Index.Box className="multi-file-upload-btn-main">
                                <Index.Button
                                  variant="contained"
                                  component="label"
                                  className="multi-file-upload-btn"
                                >
                                  <img
                                    className={`${"multi-file-upload-icon-img"}`}
                                    src={PageIndex.Svg.addIcon}
                                    crossOrigin="anonymous"
                                  />
                                  <input
                                    hidden
                                    accept="image/*"
                                    name="images" // Name of the field for multiple images
                                    type="file"
                                    multiple // Enable selecting multiple files
                                    onChange={(e) =>
                                      uploadMultipleFiles(e, formik)
                                    }
                                  />
                                </Index.Button>
                              </Index.Box>

                              {multipleFile?.length != 0 &&
                                multipleFile?.map((url, index) => (
                                  <Index.Box
                                    key={index}
                                    className="multi-file-upload-box"
                                  >
                                    <img
                                      className="multi-file-upload-img"
                                      src={url}
                                      alt="..."
                                    />
                                    <Index.Button
                                      className="multi-file-upload-close-btn"
                                      onClick={() =>
                                        handleRemoveImage(index, formik)
                                      }
                                    >
                                      <img
                                        src={PageIndex.Svg.closeblack}
                                        className="multi-file-upload-close-icon"
                                      ></img>
                                    </Index.Button>
                                  </Index.Box>
                                ))}

                              {formik.touched[field.name] &&
                                formik.errors[field.name] && (
                                  <Index.FormHelperText
                                    error
                                    className="admin-error-text"
                                  >
                                    {formik.errors[field.name]}
                                  </Index.FormHelperText>
                                )}
                            </Index.Box>
                          </>
                        ) : field.type === "select" ? (
                          <Index.Box className="admin-form-group">
                            <Index.Box className="admin-dropdown-box">
                              <Index.FormControl className="admin-form-control">
                                <Index.Select
                                  className="admin-dropdown-select"
                                  type={field.type || "text"}
                                  name={field.name}
                                  value={formik.values[field.name]}
                                  onChange={(e) =>
                                    field.handleChange
                                      ? field.handleChange(e, formik)
                                      : formik.handleChange(e)
                                  }
                                  onBlur={formik.handleBlur}
                                  displayEmpty
                                  inputProps={{
                                    "aria-label": "Without label",
                                  }}
                                  placeholder="Select"
                                  renderValue={
                                    formik.values[field.name] !== ""
                                      ? undefined
                                      : () => (
                                          <span style={{ color: "#2a3547ab" }}>
                                            {`Select ${field.label}`}
                                          </span>
                                        )
                                  }
                                >
                                  {field.options?.map((row) => (
                                    <Index.MenuItem
                                      key={row?._id}
                                      value={row?._id}
                                      className="admin-menuitem"
                                    >
                                      {row?.categoryName || row[field?.key]}
                                    </Index.MenuItem>
                                  ))}
                                </Index.Select>
                                {formik.touched[field.name] &&
                                  formik.errors[field.name] && (
                                    <Index.FormHelperText
                                      error
                                      className="admin-form-lable"
                                    >
                                      {formik.errors[field.name]}
                                    </Index.FormHelperText>
                                  )}
                              </Index.FormControl>
                            </Index.Box>
                          </Index.Box>
                        ) : field.type === "password" ? (
                          <Index.Box className="admin-input-box password-input-box auth-input">
                            <Index.Box className="admin-form-group">
                              <Index.OutlinedInput
                                className="admin-form-control-eye admin-form-control"
                                placeholder="Password"
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                                name={field.name}
                                value={formik.values[field.name]}
                                onChange={(e) =>
                                  field.handleChange
                                    ? field.handleChange(e, formik)
                                    : formik.handleChange(e)
                                }
                                onBlur={formik.handleBlur}
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
                              {formik.touched[field.name] &&
                                formik.errors[field.name] && (
                                  <Index.FormHelperText
                                    error
                                    className="admin-form-lable"
                                  >
                                    {formik.errors[field.name]}
                                  </Index.FormHelperText>
                                )}
                            </Index.Box>
                          </Index.Box>
                        ) : field.name === "phoneNumber" && field?.isCountry ? (
                          <Index.Box className="country-dropdown-input-box">
                          </Index.Box>
                        ) : (
                          <Index.Box className="admin-form-group">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="admin-form-control"
                              placeholder={field.placeholder}
                              type={field.type || "text"}
                              name={field.name}
                              value={formik.values[field.name]}
                              onChange={(e) =>
                                field.handleChange
                                  ? field.handleChange(e, formik)
                                  : formik.handleChange(e)
                              }
                              onBlur={formik.handleBlur}
                              autoComplete="off"
                            />
                            <Index.FormHelperText
                              error
                              className="admin-form-lable"
                            >
                              {formik.touched[field.name] &&
                                formik.errors[field.name]}
                            </Index.FormHelperText>
                          </Index.Box>
                        )}
                      </Index.Box>
                    </Index.Box>
                  ))}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="admin-modal-footer">
            <Index.Box className="modal-footer-btn-flex primary-btn-main border-btn-main">
              <Index.Button className="border-btn" onClick={onClose}>
                Discard
              </Index.Button>
              <Index.Button
                className="primary-btn"
                type="submit"
                loading={loading}
              >
                Submit
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </form>
    </Index.Modal>
  );
};

export default CommonFormModal;
