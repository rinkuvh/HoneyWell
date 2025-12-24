import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { min } from "lodash";
import moment from "moment";

//#region regex start
export const REGEX = {
  // EMAIL:
  //   /^(?:(?!\.)(?![0-9])(?:\w+\.)*(?:\w+\+)*(?:\w+\!)*(?:\w+\$)*(?:\w+\&)*(?:\w+\%)*(?:\w+\-)*\w+@[\w-]+\.\w{2,3}(?:\.[a-z]{2,3})?)$/,
  EMAIL: /^(?:(?!\.)(?:\w+\.)*(?:\w+\+)*(?:\w+\!)*(?:\w+\$)*(?:\w+\&)*(?:\w+\%)*(?:\w+\-)*\w+@[\w-]+\.\w{2,3}(?:\.[a-z]{2,3})?)$/,
  PHONE: /^\+?\d{10,15}$/,
  PHONE_WITH_COUNTRY: /^\+?[1-9]\d{0,3}[\s-]?\d{1,5}[\s-]?\d{4,9}$/,
  MAX_FILE_SIZE: 2 * 1024 * 1024,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  AADHAR: /^[2-9]\d{11}$/,
  PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // PAN format (ABCDE1234F)
  CIN: /^[LU]{1}\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/, // CIN format (L12345AB6C)
  REG_NUM: /^[A-Z0-9]{10}$/, // Example Registration Number (can be alphanumeric)
  WEBSITE:
    /^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9-./?&%#=]*)?$/,
  EMAIL_PHONE:
    /^(?:[6-9]\d{9}|(?:(?!\.)(?![0-9])(?:\w+\.)*(?:\w+\+)*(?:\w+\!)*(?:\w+\$)*(?:\w+\&)*(?:\w+\%)*(?:\w+\-)*\w+@\w+\.\w{2,3}(?:\.[a-z]{2,3})?))$/i,
  PINCODE: /^\d{6}$/,
  MOBILE_NUMBER: /^(?!.*(\d)\1{6,})[6-9][0-9]{9}$/,
  NAME: /^[A-Za-z]+( [A-Za-z]+)*$/, //Only letters (A-Z, a-z) and spaces are allowed.
};
const stripHtml = (html) => {
  if (typeof document !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  } else {
    return html.replace(/<[^>]*>?/gm, "");
  }
};
//#region Login
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter email")
    .max(100, "Email cannot exceed 100 characters")
    .matches(REGEX.EMAIL, "Please enter valid email"),

  password: yup.string().required("Please enter password"),
});
const NEW_EMAIL_REGEX = /^(?:(?!\.)(?:\w+\.)*(?:\w+\+)*(?:\w+\!)*(?:\w+\$)*(?:\w+\&)*(?:\w+\%)*(?:\w+\-)*\w+@[\w-]+\.\w{2,3}(?:\.[a-z]{2,3})?)$/;
export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter email address")
    // .matches(REGEX.EMAIL, "Please enter valid email address")
    .matches(NEW_EMAIL_REGEX, "Please enter valid email address")
    .max(254, "Email address cannot exceed 254 characters"),
    // .test(
    //   "Please enter valid email address",
    //   (value) => !/^(?:[^0-]*0[^0-]*){10}|(?:[^-]*-[^-]*){2}$/.test(value)
    // ),

  password: yup.string().required("Please enter password"),
});

//#region Forgot Password
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter email")
    .max(100, "Email cannot exceed 100 characters")
    .matches(NEW_EMAIL_REGEX, "Please enter valid email"),
});

//#region OTP
export const otpSchema = yup.object({
  otp: yup
    .string()
    .required("Please enter OTP")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

//#region edit profile
export const editProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter first name")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: yup
    .string()
    .required("Please enter last name")
    .max(50, "Last name cannot exceed 50 characters"),
  email: yup
    .string()
    // .email("Please enter valid email")
    .matches(REGEX.EMAIL, "Please enter valid email")
    .required("Please enter email")
    .max(254, "Email cannot exceed 254 characters"),
  // address: yup.string().max(100, "Address cannot exceed 200 characters"), // Optional field
  // phoneNumber: yup
  //   .string()
  //   .test(
  //     "is-valid-phone",
  //     "Please enter a valid phone number",
  //     function (value) {
  //       const { countryCode } = this.options.context || {}; // Get country code from Formik context

  //       if (!value)
  //         return this.createError({
  //           message: "Please enter phone number",
  //         });
  //       if (!countryCode) {
  //         console.error("Country code is missing for phone validation.");
  //         return this.createError({ message: "Country code is required." });
  //       }

  //       try {
  //         // Combine country code and phone number
  //         const fullPhoneNumber = `${countryCode}${value}`;

  //         const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

  //         if (
  //           !parsedPhoneNumber ||
  //           !parsedPhoneNumber.isValid() ||
  //           parsedPhoneNumber.isNonGeographic()
  //         ) {
  //           return this.createError({
  //             message: "Please enter a valid Mobile Number.",
  //           });
  //         }

  //         if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
  //           return this.createError({
  //             message: "Mobile Number cannot have continuous single numbers.",
  //           });
  //         }

  //         return true;
  //       } catch (error) {
  //         console.error("Phone number validation error:", error);
  //         return this.createError({
  //           message: "Invalid phone number format.",
  //         });
  //       }
  //     }
  //   )
  //   // .matches(REGEX.PHONE, "Please enter valid phone number") // Optional field
  //   .nullable(), // Allows null or undefined
});

//#region change password

export const passwordValidationSchema = yup.object({
  oldPassword: yup.string().required("Please enter old password"),

  newPassword: yup
    .string()
    .matches(
      REGEX.PASSWORD,
      "New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .max(20, "New password cannot exceed 20 characters")
    .required("Please enter new password"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("newPassword"), null],
      "Password and Confirm password should match"
    )
    .required("Please enter confirm password"),
});

//#region reset password

export const resetPasswordUserSchema = yup.object({
  password: yup
    .string()
    .matches(
      REGEX.PASSWORD,
      "New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .max(20, "New password cannot exceed 20 characters")
    .required("Please enter new password"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password and Confirm password should match"
    )
    .required("Please enter confirm password"),
});

export const resetPasswordSchema = passwordValidationSchema.omit("oldPassword");

//#region role permission

export const rolePermissionSchema = yup.object().shape({
  roleName: yup.string().required("Please enter role name"),
  rolePermission: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one permission")
    .required("Please select permission"),
});

//#region comapny schema

export const companyPersonalInfoSchema = yup.object({
  logo: yup.mixed().nullable(),
  companyName: yup.string().required("Please enter company name"),
  organizationId: yup.string().required("Please select type of organization"),
  companyWebsiteLink: yup
    .string()
    .matches(REGEX.WEBSITE, "Please enter a valid URL")
    .nullable(),
  companyOnboardingNumber: yup
    .string()
    .required("Please enter onboarding number"),
  companyOnboardingDate: yup.date().required("Please select onboarding date"),
  companyIdentificationNumber: yup
    .string()
    .test(
      "valid-company-id",
      "Invalid Company Identification Number (CIN, PAN, or Registration Number)",
      (value) => {
        return (
          REGEX.PAN.test(value) ||
          REGEX.CIN.test(value) ||
          REGEX.REG_NUM.test(value)
        );
      }
    )
    .required("Please enter company identification number"),
});

export const companyPrivateInfoSchema = yup.object({
  contactPersonEmail: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter email")
    .max(254, "Email cannot exceed 254 characters"),
  contactPersonPhone: yup
    .string()
    .required("Please enter phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      function (value) {
        const { countryCode } = this.options.context || {}; // Get country code from Formik context

        if (!value)
          return this.createError({
            message: "Please enter phone number",
          });
        if (!countryCode) {
          console.error("Country code is missing for phone validation.");
          return this.createError({ message: "Country code is required." });
        }

        try {
          // Combine country code and phone number
          const fullPhoneNumber = `${countryCode}${value}`;

          const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

          if (
            !parsedPhoneNumber ||
            !parsedPhoneNumber.isValid() ||
            parsedPhoneNumber.isNonGeographic()
          ) {
            return this.createError({
              message: "Please enter a valid phone number",
            });
          }

          if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
            return this.createError({
              message: "Mobile Number cannot have continuous single numbers.",
            });
          }

          return true;
        } catch (error) {
          console.error("Phone number validation error:", error);
          return this.createError({
            message: "Please enter a valid phone number",
          });
        }
      }
    )
    // .matches(REGEX.PHONE, "Please enter valid phone number")
    .nullable(), // Allows null or undefined
});

export const contactPersonInfoSchema = yup.object({
  name: yup.string().required("Please enter name").nullable(),
  designation: yup.string().nullable(),
});

export const companyAddressInfoSchema = yup.object({
  companyAddress1: yup.string().required("Please enter company address 1"),
  companyAddress2: yup.string().nullable(),
  countryId: yup.string().required("Please select country"),
  stateId: yup.string().required("Please select state"),
  regionId: yup.string().required("Please select regin"),
  cityId: yup.string().required("Please select city"),
  pinCodeId: yup.string().required("Please select zip/pincode"),
});

export const CompanySchema = yup.object({
  logo: yup.mixed().nullable(),
  companyName: yup.string().required("Please enter name"),
  organizationId: yup.string().required("Please select type of organization"),
  companyWebsiteLink: yup
    .string()
    .matches(REGEX.WEBSITE, "Please enter a valid URL")
    .nullable(),
  companyOnboardingNumber: yup
    .string()
    .required("Please enter onboarding number"),
  companyOnboardingDate: yup.date().required("Please select onboarding date"),
  companyIdentificationNumber: yup
    .string()
    .test(
      "valid-company-id",
      "Invalid Identification Number (CIN, PAN, or Registration Number)",
      (value) => {
        return (
          REGEX.PAN.test(value) ||
          REGEX.CIN.test(value) ||
          REGEX.REG_NUM.test(value)
        );
      }
    )
    .required("Please enter identification number"),
  countryId: yup.string().required("Please select country"),
  stateId: yup.string().required("Please select state"),
  cityId: yup.string().required("Please select city"),
  regionId: yup.string().required("Please select region"),
  pinCodeId: yup.string().required("Please select zip/pincode"),
  companyAddress1: yup.string().required("Please enter address 1"),
  companyAddress2: yup.string().nullable(),
  contactPerson: yup.object().shape({
    name: yup.string().nullable(),
    designation: yup.string().nullable(),
    contactPersonPhone: yup
      .string()
      .test(
        "is-valid-phone",
        "Please enter a valid contact person phone number",
        function (value) {
          const { countryCode } = this.options.context || {}; // Get country code from Formik context

          if (!value)
            return this.createError({
              message: "Please enter phone number",
            });
          if (!countryCode) {
            console.error("Country code is missing for phone validation.");
            return this.createError({ message: "Country code is required." });
          }

          try {
            // Combine country code and phone number
            const fullPhoneNumber = `${countryCode}${value}`;

            const parsedPhoneNumber =
              parsePhoneNumberFromString(fullPhoneNumber);

            if (
              !parsedPhoneNumber ||
              !parsedPhoneNumber.isValid() ||
              parsedPhoneNumber.isNonGeographic()
            ) {
              return this.createError({
                message: "Please enter a valid contact person phone number",
              });
            }

            if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
              return this.createError({
                message: "Mobile Number cannot have continuous single numbers.",
              });
            }

            return true;
          } catch (error) {
            console.error("Phone number validation error:", error);
            return this.createError({
              message: "Please enter a valid contact person phone number",
            });
          }
        }
      )
      .required("Please enter contact person phone number"),
    contactPersonEmail: yup
      .string()
      .email("Please enter a valid contact person email Id")
      .matches(REGEX.EMAIL, "Please enter a valid contact person email Id")
      .max(254, "Email cannot exceed 254 characters")
      .required("Please enter contact person email Id"),
  }),
});

export const editCompanyProfileSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Please enter company name")
    .max(50, "First name cannot exceed 50 characters"),
  companyId: yup.string().required("Please enter company id"),
  companyAddress1: yup
    .string()
    .max(100, "Address cannot exceed 200 characters"),
  companyAddress2: yup
    .string()
    .max(100, "Address cannot exceed 200 characters"),
});

//#region Company Enquiry
export const companyEnquirySchema = yup.object().shape({
  fullName: yup.string().required("Please enter full name"),
  companyName: yup.string().required("Please enter company name"),
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter valid email")
    .max(254, "Email cannot exceed 254 characters")
    .test("Invalid_email", "Please enter valid email", function (value) {
      const parts = value.split("@");
      if (parts.length !== 2) return false;
      const domainParts = parts[1].split(".");
      return (
        REGEX.EMAIL.test(value) &&
        (domainParts.length === 2 || domainParts.length === 3)
      );
    }),
  contactNumber: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid contact number",
      function (value) {
        const { countryCode } = this.options.context || {}; // Get country code from Formik context

        if (!value)
          return this.createError({
            message: "Please enter contact number",
          });
        if (!countryCode) {
          console.error("Country code is missing for phone validation.");
          return this.createError({ message: "Country code is required." });
        }

        try {
          // Combine country code and phone number
          const fullPhoneNumber = `${countryCode}${value}`;

          const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

          if (
            !parsedPhoneNumber ||
            !parsedPhoneNumber.isValid() ||
            parsedPhoneNumber.isNonGeographic()
          ) {
            return this.createError({
              message: "Please enter a valid contact number",
            });
          }

          if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
            return this.createError({
              message: "Mobile Number cannot have continuous single numbers.",
            });
          }

          return true;
        } catch (error) {
          console.error("Phone number validation error:", error);
          return this.createError({
            message: "Please enter a valid contact number",
          });
        }
      }
    )
    // .matches(/^[0-9]{10}$/, "contact number must be 10 digits")
    .required("Please enter contact number"),
  alternateContactNumber: yup
    .string()
    .test(
      "is-valid-phone",
      "Please enter a valid alternate contact number",
      function (value) {
        const { altCountryCode } = this.options.context || {}; // Get country code from Formik context

        if (!value)
          return this.createError({
            message: "Please enter alternate contact number",
          });
        if (!altCountryCode) {
          console.error("Country code is missing for phone validation.");
          return this.createError({ message: "Country code is required." });
        }

        try {
          // Combine country code and phone number
          const fullPhoneNumber = `${altCountryCode}${value}`;

          const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

          if (
            !parsedPhoneNumber ||
            !parsedPhoneNumber.isValid() ||
            parsedPhoneNumber.isNonGeographic()
          ) {
            return this.createError({
              message: "Please enter a valid alternate contact number",
            });
          }

          if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
            return this.createError({
              message: "Mobile Number cannot have continuous single numbers.",
            });
          }

          return true;
        } catch (error) {
          console.error("Phone number validation error:", error);
          return this.createError({
            message: "Please enter a valid alternate contact number",
          });
        }
      }
    )
    // .matches(/^[0-9]{10}$/, "alternate contact number must be 10 digits")
    .required("Please enter alternate contact number"),
  typeOfOrganization: yup.string().required("Please enter organization name"),
  description: yup
    .string()
    .max(1000, "description cannot exceed 200 characters"),
});

//#region User management Schema

//#region edit profile
export const editUserInformationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Please enter first name")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: yup
    .string()
    .required("Please enter last name")
    .max(50, "Last name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Please enter valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  address: yup.string().max(100, "Address cannot exceed 200 characters"), // Optional field
  dateOfBirth: yup.string().required("Please enter email"),
  gender: yup.string().required("Please enter gender"),
  countryId: yup.string().required("Please enter country"),
  stateId: yup.string().required("Please enter state"),
  regionId: yup.string().required("Please enter region"),
  cityId: yup.string().required("Please enter city"),
  pinCodeId: yup.string().required("Please enter pincode"),
});

//#region edit profile
export const editUserPrivateInformationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  phoneNumber: yup
    .string()
    .required("Please enter phone number")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      function (value) {
        const { countryCode } = this.options.context || {}; // Get country code from Formik context

        if (!value)
          return this.createError({
            message: "Please enter phone number",
          });
        if (!countryCode) {
          console.error("Country code is missing for phone validation.");
          return this.createError({ message: "Country code is required." });
        }

        try {
          // Combine country code and phone number
          const fullPhoneNumber = `${countryCode}${value}`;

          const parsedPhoneNumber = parsePhoneNumberFromString(fullPhoneNumber);

          if (
            !parsedPhoneNumber ||
            !parsedPhoneNumber.isValid() ||
            parsedPhoneNumber.isNonGeographic()
          ) {
            return this.createError({
              message: "Please enter a valid phone number",
            });
          }

          if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
            return this.createError({
              message: "Mobile Number cannot have continuous single numbers.",
            });
          }

          return true;
        } catch (error) {
          console.error("Phone number validation error:", error);
          return this.createError({
            message: "Please enter a valid phone number",
          });
        }
      }
    )
    // .matches(REGEX.PHONE, "Please enter valid phone number")
    .nullable(), // Allows null or undefined
});

//#region Education Informations
export const editEducationInformationSchema = yup.object().shape({
  educationInfo: yup.array().of(
    yup.object().shape({
      classId: yup.string().required("Please select class"),
      courseId: yup.string().required("Please select course"),
      grade: yup.string().required("Please select grade"),
    })
  ),
});

//#region Financial Information
export const editFinancialInformationSchema = yup.object().shape({
  income: yup.string().required("Please enter income").nullable(),
  familyIncomeId: yup.string().required("Please enter family income"),
  occupationId: yup.string().required("Please enter occupation"),
  organizationId: yup.string().required("Please enter organization"),
});

export const userManagementSchema = ({ isEdit }) => {
  let schema = yup.object({
    logo: yup.mixed().nullable(),
    firstName: yup.string().required("Please enter first name"),
    lastName: yup.string().required("Please enter last name"),
    email: yup
      .string()
      .matches(REGEX.EMAIL, "Please enter valid email")
      .max(254, "Email cannot exceed 254 characters")
      // .email("Please enter valid email")
      .required("Please enter email"),
    phoneNumber: yup
      .string()
      // .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Please enter phone number")
      .test(
        "is-valid-phone",
        "Please enter a valid phone number",
        function (value) {
          const { countryCode } = this.options.context || {}; // Get country code from Formik context

          if (!value)
            return this.createError({
              message: "Please enter phone number",
            });
          if (!countryCode) {
            console.error("Country code is missing for phone validation.");
            return this.createError({ message: "Country code is required." });
          }

          try {
            // Combine country code and phone number
            const fullPhoneNumber = `${countryCode}${value}`;

            const parsedPhoneNumber =
              parsePhoneNumberFromString(fullPhoneNumber);

            if (
              !parsedPhoneNumber ||
              !parsedPhoneNumber.isValid() ||
              parsedPhoneNumber.isNonGeographic()
            ) {
              return this.createError({
                message: "Please enter a valid Mobile Number.",
              });
            }

            if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
              return this.createError({
                message: "Mobile Number cannot have continuous single numbers.",
              });
            }

            return true;
          } catch (error) {
            console.error("Phone number validation error:", error);
            return this.createError({
              message: "Invalid phone number format.",
            });
          }
        }
      ),
    dateOfBirth: yup.string().required("Please enter date of birth"),
    gender: yup.string().required("Please enter gender"),
    countryId: yup.string().required("Please enter country"),
    stateId: yup.string().required("Please enter state"),
    regionId: yup.string().required("Please enter region"),
    cityId: yup.string().required("Please enter city"),
    pinCodeId: yup.string().required("Please select zip/pincode"),
    scholarshipTypeId: yup
      .array()
      .of(yup.string().required("Please select scholarship preferences"))
      .min(1, "Please select at least one scholarship preference")
      .required("Please select at least one scholarship preference"),
    educationInfo: yup.array().of(
      yup.object().shape({
        classId: yup.string().required("Please select class"),
        courseId: yup.string().required("Please select course"),
        grade: yup.string().required("Please select grade"),
      })
    ),
    financialInfo: yup.object().shape({
      income: yup.string().nullable().required("Please enter income"),
      familyIncomeId: yup.string().required("Please enter family income"),
      occupationId: yup.string().required("Please enter occupation"),
      organizationId: yup.string().required("Please enter organization"),
    }),
  });

  // Edit mode me password aur confirmPassword hata do
  if (!isEdit) {
    schema = schema.shape({
      password: yup
        .string()
        .required("Please enter password")
        .max(20, "Password cannot exceed 20 characters"),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          "Confirm password must match password"
        )
        .required("Please enter confirm password"),
    });
  }

  return schema;
};

/// Notification and mail

export const NotificationAndMailSchema = yup.object({
  title: yup.string().required("Please enter title"),
  description: yup.string().required("Please select description"),
  scheduleDate: yup.date().required("Please select schedule date"),
  scheduleTime: yup.string().required("Please select schedule time"),
  type: yup.string().required("Please select type"),
  recipientType: yup.string().required("Please select recipient type"),
  selectScholarships: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one scholarship")
    .required("Please select scholarships"),
  selectedUsers: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one user")
    .required("Please select users"),
  selectedCompanies: yup
    .array()
    .of(yup.string())
    .min(1, "Please select at least one company")
    .required("Please select companies"),
  notificationMethod: yup
    .array()
    .of(
      yup
        .string()
        .oneOf(
          ["Push Notification", "Email/Inbox"],
          "Invalid notification method"
        )
    )
    .min(1, "Please select at least one notification method")
    .required("Please select notification method"),
});

// export const userManagementSchema = yup.object({
//   logo: yup.mixed().nullable(),
//   firstName: yup.string().required("Please enter first name"),
//   lastName: yup.string().required("Please enter last name"),
//   email: yup.string().required("Please enter email"),
//   phoneNumber: yup
//               .string()
//               .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
//               .required("Please enter phone number"),
//   dateOfBirth: yup.string().required("Please enter date of birth"),
//   gender: yup.string().required("Please enter gender"),
//   password: yup.string().required("Please enter password"),
//   confirmPassword: yup
//   .string()
//   .oneOf(
//     [yup.ref("password"), null],
//     "Confirm password must be same as password"
//   )
//   .required("Please enter confirm password"),
//   countryId: yup.string().required("Please enter country"),
//   stateId: yup.string().required("Please enter state"),
//   regionId: yup.string().required("Please enter region"),
//   cityId: yup.string().required("Please enter city"),
//   pinCodeId: yup.string().required("Please select zip/pincode"),
//   scholarshipPreferences: yup.array().of(
//           yup.string().required("Please select scholarship preferences")
//         )
//         .min(1, "Please select at least one scholarship preference") // Ensure at least one value is present
//         .required("Please select at least one scholarship preference"),

//   educationInfo: yup.array().of(
//     yup.object().shape({
//       classId: yup.string().required('Please select class'),
//       courseId: yup.string().required('Please select course'),
//       grade: yup.string().required('Please select grade'),
//     })
//   ),

//   financialInfo: yup.object().shape({
//     income: yup.string().nullable().required("Please enter income"),
//     familyIncome: yup.string().required("Please enter family income"),
//     occupation: yup.string().required("Please enter occupation"),
//     organization: yup.string().required("Please enter organization"),
//   })

// });
//#region scholarship schema

export const scholarshipSchema = yup.object().shape({
  scholarshipAmountType: yup.string().required("Please select amount type"),
  disbursementType: yup
    .string()
    .test(
      "interval-required-if-percentage",
      "Please select Intervals",
      function (value) {
        const { scholarshipAmountType } = this.parent;
        return (
          scholarshipAmountType !== "Fixed Amount" ||
          (scholarshipAmountType === "Fixed Amount" && value)
        );
      }
    ),

  amountId: yup.string().when("scholarshipAmountType", {
    is: "Percentage-Based Funding",
    then: () =>
      yup
        .string()
        .max(100, "Amount exceeds limit. Please enter an amount up to 100")
        .matches(
          /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,4})?|0(\.\d*[1-9]+\d{0,3})?)$/,
          "Please enter a valid amount"
        )
        .test(
          "is-not-zero",
          "Value should be greater than 0",
          (value) => parseFloat(value) !== 0
        )
        .required("Please enter amount"),
    otherwise: () =>
      yup.string().when("scholarshipAmountType", {
        is: "Fixed Amount",
        then: () => yup.string().required("Please enter amount"),
        otherwise: () => yup.string(),
      }),
  }),
  // highestQualification: yup
  //   .string()
  //   .required("Please enter highest qualification"),
  category: yup.string().required("Please select category"),
  image: yup.string().required("Please select banner"),
  publishDate: yup.date().required("Please select publish date"),
  dueDate: yup.date().required("Please select due date"),
  isSavedDraft: yup.boolean(),
  logo: yup.string().required("Please select logo"),
  title: yup.string().required("Please enter title"),
  scholarshipTypeId: yup.string().required("Please select type"),
  companyId: yup.string().required("Please select organization name"),
  aboutScholarship: yup.string().required("Please enter description"),
  stateId: yup.string().required("Please select state"),
  cityId: yup.string().required("Please select city"),
  regionId: yup.string().required("Please select region"),
  pinCodeId: yup.string().required("Please select zip/pincode"),
  countryId: yup.string().required("Please select country"),
  // age: yup
  //   .string()
  //   .matches(/^[1-9]\d*$/, "Age must be greater than 0")
  //   .required("Please enter age"),
  // gender: yup.string().required("Please select gender"),
  // classId: yup.string().required("Please select qualification"),
  documentId: yup
    .array()
    .of(yup.string().required("Please select document"))
    .min(1, "Please select at least one document")
    .required("Please select document"),
  // income: yup.string().required("Please enter income"),
  // familyIncome: yup.string().required("Please select family income"),
  // speciallyAbled: yup.string(),
  // nationality: yup.string().required("Please select nationality"),
  // casteId: yup
  //   .string()
  //   .test("caste-required-if-indian", "Please select caste", function (value) {
  //     const { nationality } = this.parent;
  //     return nationality !== "India" || (nationality === "India" && value);
  //   }),
  stagesId: yup
    .array()
    .min(1, "Please select at least one stage")
    .required("Please select stages"),
  termsAndConditions: yup.string().required("Please enter terms & condition"),
  stepsToApply: yup.string().required("Please enter steps to apply"),
  prefilterQuestionnaireId: yup
    .string()
    .required("Please select pre-filter questionnaire form"),
  criteria: yup.array().of(
    yup.object().shape({
      criteriaId: yup.string().required("Please select eligibility criteria"),
      value: yup.string().required("Please enter value"),
    })
  ),
});

export const applyScholarshipSchema = scholarshipSchema
  .pick([
    "isSavedDraft",
    "stateId",
    "cityId",
    "regionId",
    "pinCodeId",
    "countryId",
    "age",
    "gender",
    "classId",
    "income",
    "familyIncome",
    "speciallyAbled",
    "nationality",
    "casteId",
    "highestQualification",
    "prefilterQuestionnaire",
  ])
  .shape({
    prefilterQuestionnaire: yup
      .array()
      .of(
        yup.object().shape({
          answerType: yup.string().nullable(), // Individual error msg hataya
        })
      )
      .test(
        "all-answered",
        "Please select answers for all questions", // Poore array ke liye ek message
        (values) => {
          if (!values || values.length === 0) return false; // Agar array khali hai toh error dega
          return values.every(
            (item) => item.answerType && item.answerType.trim() !== ""
          );
        }
      ),
    UserDocumentId: yup.array().of(
      yup.object().shape({
        id: yup
          .string()
          .nullable()
          .test(
            "id-required-if-not-present",
            "Please upload document",
            function (value) {
              const { present } = this.parent;
              return (
                present ||
                (value !== null && value !== undefined && value.trim() !== "")
              );
            }
          ),
      })
    ),
  });

//#region  Company Profile

const validTypes = [
  "text",
  "number",
  "para",
  "email",
  "select",
  "date",
  "radio",
  "checkbox",
  "dropdown",
];

export const criteriaSchema = yup.object().shape({
  fields: yup.array().of(
    yup.object().shape({
      required: yup.boolean(),
      name: yup
        .string()
        .required("Field name is required")
        .min(2, "Name must be at least 2 characters"),
      type: yup
        .string()
        .oneOf(validTypes, "Invalid type selected")
        .required("Type is required"),
      options: yup.array().when("type", {
        is: (type) => ["checkbox", "dropdown", "radio"].includes(type),
        then: () =>
          yup
            .array()
            .of(
              yup.object().shape({
                name: yup.string().required("Option name is required"),
                type: yup
                  .string()
                  .oneOf(["text", "number", "email"], "Invalid option type"),
                fields: yup.array(),
              })
            )
            .min(1, "At least one option is required for a select field"),
        otherwise: () => yup.array().notRequired(),
      }),
      selectedOption: yup.string().nullable(),
    })
  ),
});

export const formSchema = yup.object().shape({
  formName: yup.string().required("Please enter form name"),
  fields: yup.array().of(
    yup.object().shape({
      required: yup.boolean(),
      name: yup
        .string()
        .required("Field name is required")
        .min(2, "Name must be at least 2 characters"),
      type: yup
        .string()
        .oneOf(validTypes, "Invalid type selected")
        .required("Type is required"),
      options: yup.array().when("type", {
        is: (type) => ["checkbox", "dropdown", "radio"].includes(type),
        then: () =>
          yup
            .array()
            .of(
              yup.object().shape({
                name: yup.string().required("Option name is required"),
                type: yup
                  .string()
                  .oneOf(["text", "number", "email"], "Invalid option type"),
                fields: yup.array(),
              })
            )
            .min(1, "At least one option is required for a select field"),
        otherwise: () => yup.array().notRequired(),
      }),
      selectedOption: yup.string().nullable(),
    })
  ),
});
///////////////////////////////////////////////////////////////////////////////////////

export const editUserProfileInformationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter first name")
    .max(50, "First name cannot exceed 50 characters"),
  email: yup
    .string()
    // .email("Please enter valid email")
    .matches(REGEX.EMAIL, "Please enter valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  dob: yup
    .string()
    .test("invalid-date", "Please enter valid date", (value) => {
      return value !== "Invalid Date";
    })
    .test("future-date", "Future date not allowed", (value) => {
      const date = new Date(value);
      const today = new Date();
      return date <= today;
    })
    .test(
      "minimum-age",
      "Age must be greater then or equal to 12 year",
      (value) => {
        const date = new Date(value);
        const today = new Date();
        const age = today?.getFullYear() - date?.getFullYear();
        const monthDiff = today?.getMonth() - date?.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today?.getDate() < date?.getDate())
        ) {
          return age >= 12;
        }
        return age >= 12;
      }
    )
    .required("Please enter date of birth"),
  gender: yup.string().required("Please select gender"),
  // college_id: yup.string().required("Please select college name"),
  // password: yup.string().required("Please enter password"),
  district: yup.string().required("Please enter district"),
  taluka_id: yup.string().required("Please enter taluka"),
  contactNumber: yup
    .string()
    .required("Please enter contact number")
    // .matches(REGEX.PHONE, "Please enter valid contact number"),
    .matches(REGEX.MOBILE_NUMBER, "Please enter valid contact number"),
  // college_name: yup.string().required("Please enter college name"),
  institute_type: yup.string().required("Please select institute type"),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    ),
  stream: yup.string().required("Please select stream"),
  semester: yup.string().required("Please select semester"),
  college_name: yup
    .string()
    .required("Please select college"),
  otherCollegeName: yup
    .string()
    .max(50, "College name cannot exceed 50 characters")
    .when("college_name", {
      is: "Other",
      then: (schema) => schema.required("Please enter college name"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
export const addEditTopicSchema = yup.object().shape({
  topicName: yup
    .string()
    .trim()
    .required("Please enter topic name")
    .min(3, "Topic name must be at least 3 characters")
    .max(255, "Topic name can't exceed 255 characters")
    // .matches(/^[A-Za-z\s]+$/, "Topic name must contain only letters"),
    .matches(/^(?!\s).*[^ \s]$/, "Topic name cannot start or end with a space")
    .matches(/^[^\d]/, "Topic name cannot start with a number"),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    )
    .test("required", "Please select topic thumbnail", function (value) {
      return typeof value === "string" || !!value;
    })
    .test("dimensions", "Image must be 315x200 pixels", function (value) {
      if (!value || typeof value === "string") return true;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const isValid = img.width === 315 && img.height === 200;
            resolve(isValid);
          };
          img.onerror = () => resolve(false);
          img.src = e.target.result;
        };
        reader.readAsDataURL(value);
      });
    }),

  duration: yup
    // .number()
    .string()
    .required("Please enter duration")
    .matches(/^\d{2}:\d{2}$/, "Please enter valid duration in HH:mm format"),
  // .positive("Duration must be a positive number")
  // .integer("Duration must be an integer"),
  documents: yup
    .array()
    .nullable()
    .test("fileType", "Only PDF files are allowed", function (value) {
      if (!value || value.length === 0) return true; // Skip if empty (handled in required check)

      const allowedFormats = ["application/pdf"];

      // Check if any file is invalid
      const hasInvalidFile = value.some(
        (file) =>
          typeof file?.document_url !== "string" &&
          file instanceof File &&
          !allowedFormats.includes(file.type)
      );
      return !hasInvalidFile; // Return false if an invalid file is found
    }),
  // .test("required", "Please select at least one document", function (value) {
  //   return (
  //     Array.isArray(value) &&
  //     value.some((doc) => typeof doc?.document_name === "string" || doc instanceof File)
  //   );
  // }),

  video: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only video files (.mp4, .mov, .avi) are allowed",
      (value) => {
        if (!value || typeof value === "string") return true; // Skip validation if it's a string
        return ["video/mp4", "video/quicktime", "video/x-msvideo"].includes(
          value.type
        );
      }
    ),
  topic_document: yup
    .mixed()
    .nullable()
    .test("fileType", "Only PDF files are allowed", (value) => {
      if (!value || typeof value === "string") return true;
      return value.type === "application/pdf";
    }),
  description: yup
    .string()
    .trim()
    .test(
      "required",
      "Please enter description or select a topic video or topic pdf",
      function (value) {
        return (
          !!value ||
          typeof this.parent.topic_document === "string" ||
          !!this.parent.topic_document ||
          typeof this.parent.video === "string" ||
          !!this.parent.video
        );
      }
    ),

  // .test("required", "Please select topic pdf", function (value) {
  //   return typeof value === "string" || !!value; // Skip required check if it's a string
  // }),
});

export const addEditSectionSchema = yup.object().shape({
  section_name: yup
    .string()
    .required("Please enter section name")
    .max(50, "Section name cannot exceed 50 characters"),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    )
    .test("required", "Please select section thumbnail", function (value) {
      return typeof value === "string" || !!value;
    })
    .test("dimensions", "Image must be 315x200 pixels", function (value) {
      if (!value || typeof value === "string") return true;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const isValid = img.width === 315 && img.height === 200;
            resolve(isValid);
          };
          img.onerror = () => resolve(false);
          img.src = e.target.result;
        };
        reader.readAsDataURL(value);
      });
    }),
});

export const userRegisterSchema = yup.object({
  name: yup
    .string()
    .required("Please enter name")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .matches(NEW_EMAIL_REGEX, "Please enter valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  dob: yup
    .string()
    .test("invalid-date", "Please enter valid date", (value) => {
      return value !== "Invalid Date";
    })
    .test("future-date", "Future date not allowed", (value) => {
      const date = new Date(value);
      const today = new Date();
      return date <= today;
    })
    .test(
      "minimum-age",
      "Age must be greater then or equal to 12 year",
      (value) => {
        const date = new Date(value);
        const today = new Date();
        const age = today?.getFullYear() - date?.getFullYear();
        const monthDiff = today?.getMonth() - date?.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today?.getDate() < date?.getDate())
        ) {
          return age >= 12;
        }
        return age >= 12;
      }
    )
    .required("Please select date of birth"),
  gender: yup.string().required("Please select gender"),
  college_name: yup
    .string()
    .required("Please select college"),
  otherCollegeName: yup
    .string()
    .max(50, "College name cannot exceed 50 characters")
    .when("college_name", {
      is: "Other",
      then: (schema) => schema.required("Please enter college name"),
      otherwise: (schema) => schema.notRequired(),
    }),
  pwdOption: yup.string().required("Please select PWD"),
  district: yup.string().required("Please select district"),
  taluka_id: yup.string().required("Please select taluka"),
  // sponsoringOrganisation: yup.string().required(
  //   "Please select sponsoring organization"
  // ),
  contactNumber: yup
    .string()
    .required("Please enter contact number")
    .matches(REGEX.MOBILE_NUMBER, "Please enter valid contact number"),
  password: yup
    .string()
    .required("Please enter password")
    .matches(
      REGEX.PASSWORD,
      "New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .max(20, "Password cannot exceed 20 characters"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password and Confirm password should match"
    )
    .required("Please enter confirm password"),
  institute_type: yup.string().required("Please select institute type"),
  accept_policy: yup
    .boolean()
    .oneOf([true], "Please accept the terms and conditions"),
  stream: yup.string().required("Please select stream"),
  semester: yup.string().required("Please select semester"),
  
});
export const contactUsSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter name")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(REGEX.EMAIL, "Please enter a valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  message: yup
    .string()
    .required("Please enter query")
    .max(500, "Query cannot exceed 500 characters"),
});

export const addEditCourseSchema = yup.object().shape({
  courseTitle: yup
    .string()
    .required("Please enter course title")
    .matches(
      /^(?!\s).*(?<!\s)$/,
      "Course title cannot start or end with a space."
    )
    .max(255, "Course title cannot exceed 255 characters"),
  // duration: yup
  //   .number()
  //   .required("Please enter duration")
  //   .positive("Duration must be a positive number")
  //   .integer("Duration must be an integer"),
  is_for_pwd: yup.string().required("Please select pwd"),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    )
    .test("required", "Please select course image", function (value) {
      return typeof value === "string" || !!value;
    })
    .test("dimensions", "Image must be 315x200 pixels", function (value) {
      if (!value || typeof value === "string") return true;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const isValid = img.width === 315 && img.height === 200;
            resolve(isValid);
          };
          img.onerror = () => resolve(false);
          img.src = e.target.result;
        };
        reader.readAsDataURL(value);
      });
    }),
  description: yup
    .string()
    .required("Please enter description")
    .max(2500, "description cannot exceed 2500 characters"),
});

export const addEditStudentSchema = yup.object({
  name: yup
    .string()
    .required("Please enter name")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .matches(NEW_EMAIL_REGEX, "Please enter valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  dob: yup
    .string()
    .test("invalid-date", "Please enter valid date", (value) => {
      return value !== "Invalid Date";
    })
    .test("future-date", "Future date not allowed", (value) => {
      const date = new Date(value);
      const today = new Date();
      return date <= today;
    })
    .test(
      "minimum-age",
      "Age must be greater then or equal to 12 year",
      (value) => {
        const date = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - date.getFullYear();
        const monthDiff = today.getMonth() - date.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < date.getDate())
        ) {
          return age >= 12;
        }
        return age >= 12;
      }
    )
    .required("Please select date of birth"),
  gender: yup.string().required("Please select gender"),
  // college_name: yup
  //   .string()
  //   .required("Please enter college name")
  //   .max(50, "College name cannot exceed 50 characters"),
  pwdOption: yup.string().required("Please select PWD"),
  district: yup.string().required("Please select district"),
  taluka_id: yup.string().required("Please select taluka"),
  contactNumber: yup
    .string()
    .required("Please enter contact number")
    .matches(REGEX.MOBILE_NUMBER, "Please enter valid contact number"),
  password: yup.string().when("isEdit", {
    is: false,
    then: () =>
      yup
        .string()
        .required("Please enter password")
        .matches(
          REGEX.PASSWORD,
          "New password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .max(20, "Password cannot exceed 20 characters"),
    otherwise: () => yup.string(),
  }),
  institute_type: yup.string().required("Please select institute type"),
  stream: yup.string().required("Please select stream"),
  semester: yup.string().required("Please select semester"),
  college_name: yup
    .string()
    .required("Please select college"),
  otherCollegeName: yup
    .string()
    .max(50, "College name cannot exceed 50 characters")
    .when("college_name", {
      is: "Other",
      then: (schema) => schema.required("Please enter college name"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const addEditQuizSchema = yup.object().shape({
  question: yup
    .string()
    .required("Please enter a question")
    .min(5, "Question must be at least 5 characters")
    .matches(/^(?!\s).*(?<!\s)$/, "Question cannot start or end with a space."),

  options: yup
    .array()
    .required("Options are required") // Ensures options array is provided
    .min(2, "At least two options are required") // Checks for minimum two options
    .of(
      yup.object().shape({
        text: yup.string().required("Please enter an option"), // Ensures each option has text
        isCorrect: yup.boolean(),
      })
    )
    .test(
      "at-least-one-correct",
      "At least one option should be marked as correct",
      (options) =>
        options &&
        options.length >= 2 &&
        options.some((option) => option.isCorrect) // Ensures at least one correct option
    ),
});

export const addEditHackathonSchema = yup.object().shape({
  course: yup.string().required("Please select course"),
  courseTitle: yup
    .string()
    .required("Please enter internship title")
    .matches(
      /^(?!\s).*(?<!\s)$/,
      "Course title cannot start or end with a space."
    )
    .max(255, "Course title cannot exceed 255 characters"),
  maxTeamSize: yup.string().required("Please enter maximum team size"),
  startdatetime: yup
    .string()
    .required("Please select start date and time"),
    // .test("is-future", "Start date and time cannot be in the past", (value) => {
    //   return moment(value).isSameOrAfter(moment(), "minute");
    // }),
  enddatetime: yup
    .string()
    .required("Please select end date and time")
    .test(
      "is-after-start",
      "End date and time must be after Start date",
      function (value) {
        const { startdatetime } = this.parent;
        return moment(value).isAfter(moment(startdatetime), "minute");
      }
    ),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    )
    .test("required", "Please select banner image", function (value) {
      return typeof value === "string" || !!value;
    })
    .test("dimensions", "Image must be 315x200 pixels", function (value) {
      if (!value || typeof value === "string") return true;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const isValid = img.width === 315 && img.height === 200;
            resolve(isValid);
          };
          img.onerror = () => resolve(false);
          img.src = e.target.result;
        };
        reader.readAsDataURL(value);
      });
    }),
});

export const feedBackFormSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter name")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .matches(REGEX.EMAIL, "Please enter a valid email")
    .max(254, "Email cannot exceed 254 characters")
    .required("Please enter email"),
  mobile: yup
    .string()
    .matches(REGEX.MOBILE_NUMBER, "Please enter a valid mobile number")
    .required("Please enter mobile number")
    .max(10, "Mobile number cannot exceed 10 characters"),
  feedback: yup.string().required("Please enter feedback"),
});

export const addEditFAQSchema = yup.object().shape({
  question: yup.string().required("Please enter question"),
  answer: yup
    .string()
    .required("Please enter answer")
    .max(2500, "Name cannot exceed 2500 characters"),
});

export const addEditTestimonialSchema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter name")
    .matches(REGEX.NAME, "Please enter valid name")
    .max(30, "Name cannot exceed 30 characters"),
  stream: yup
    .string()
    .required("Please enter stream")
    // .matches(REGEX.NAME, "Please enter valid name")
    .max(50, "Stream cannot exceed 30 characters"),
  placed_in: yup
    .string()
    .required("Please enter College")
    // .matches(REGEX.NAME, "Please enter valid name")
    .max(100, "College cannot exceed 100 characters"),

  description: yup.string().required("Please enter description"),

  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    )
    .test("required", "Please select an testimonial image", function (value) {
      return typeof value === "string" || !!value;
    }),

  testimonialDate: yup.string().required("Please select testimonial date"),
  // .test(
  //   "is-future",
  //   "Testimonial date cannot be in the past",
  //   (value) => {
  //     return moment(value).isSameOrAfter(moment(), "minute");
  //   }
  // ),
});

export const addEditDocumentSchema = yup.object().shape({
  documents: yup
    .array()
    .of(yup.mixed().required("Document is required"))
    .required("Please upload documents")
    .min(1, "At least one document is required")
    .max(3, "You can upload a maximum of 3 documents"),

  comment: yup.string().required("Please enter comment"),
});

export const weekWiseManagementSchema = yup.object().shape({
  title: yup.string().required("Please enter title"),
  // course: yup.string().required("Please select course"),
  // course: yup
  //   .array()
  //   .of(yup.string().required("Please select course"))
  //   .required("Please select course")
  //   .min(1, "At least one course is required"),
  assignmentRequired: yup.string().required("Please select assignment required"),
  // description: yup
  //   .string()
  //   .required("Please enter description")
  //   .max(2500, "Description cannot exceed 2500 characters"),
});

export const addEditInternshipCourseSchema = yup.object().shape({
  courseTitle: yup
    .string()
    .required("Please enter course title")
    .matches(
      /^(?!\s).*(?<!\s)$/,
      "Course title cannot start or end with a space."
    )
    .max(255, "Course title cannot exceed 255 characters"),
  image: yup
    .mixed()
    .nullable()
    .test(
      "fileType",
      "Only .jpg, .jpeg, .png, .svg files are allowed",
      (value) => {
        if (!value || typeof value === "string") return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/svg+xml",
        ].includes(value.type);
      }
    )
    .test("required", "Please select course image", function (value) {
      return typeof value === "string" || !!value;
    })
    .test("dimensions", "Image must be 315x200 pixels", function (value) {
      if (!value || typeof value === "string") return true;

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            const isValid = img.width === 315 && img.height === 200;
            resolve(isValid);
          };
          img.onerror = () => resolve(false);
          img.src = e.target.result;
        };
        reader.readAsDataURL(value);
      });
    }),
  description: yup
    .string()
    .required("Please enter description")
    .transform((value) => stripHtml(value || ""))
    .max(10000, "description cannot exceed 10000 characters"),
});
