

//#region validation for valid image
export const isValidFileType = (fileName) => {
  if (!fileName) return false;

  // Define allowed extensions
  const validExtensions = ["jpg", "jpeg", "png", "svg", "webp"];

  // Extract the extension using a regular expression
  const extension = fileName.split(".").pop().toLowerCase();

  // Check if the extracted extension is in the list of valid extensions
  return validExtensions.includes(extension);
};

//#region allow only numbers
export const allowOnlyNumbers = (str) => {
  return str.replace(/\D+/g, "");
};

//#region stop keyboard and remove extra space
export const processString = (str, limit) => {
  const cleanedString = str.replace(/^\s+/, "").replace(/\s\s+/g, " ");
  return cleanedString?.length > limit
    ? cleanedString.substring(0, limit)
    : cleanedString;
};

//#region allow only character
export const allowOnlyCharacters = (str) => {
  return str.replace(/[^a-zA-Z\s]+/g, "");
};

//#region scholarship type

export const scholarShipType = [
  "Income-Based",
  "Cultural-Based",
  "Visual Arts",
  "Sports Talent",
  "Literacy Art",
  "Merit-Based",
  "Out of the platform",
];

//#region scholarship amount type

export const amountType = ["Percentage-Based Funding", "Fixed Amount"];

//#region stages
export const Stages = ["Monthly", "Quarterly", "Half-Yearly", "Annually"];

//#region getFile Preview

export const getFilePreview = (file) => {
  const fileExtension = file.name?.split(".").pop().toLowerCase();

  if (fileExtension === "pdf") {
    return PageIndex.Png.pdfIcon;
  } else if (fileExtension === "doc" || fileExtension === "docx") {
    return PageIndex.Png.docIcon;
  } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
    return URL.createObjectURL(file);
  } else {
    return PageIndex.Svg.cloudUpload;
  }
};

export const activityTypes = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Company",
    value: "Company",
  },
  {
    name: "User",
    value: "User",
  },
  {
    name: "Scholarship",
    value: "Scholarship",
  },
  {
    name: "Admin",
    value: "Admin",
  },
];

export const genderTypes = ["Male", "Female", "Other"];

export const grades = ["A", "A+", "B", "B+", "C", "C+", "D", "D+"];

export const getLimitedString = (str, limit) => {
  return str.length > limit ? `${str.substring(0, limit)}...` : str;
}

//   const parsedPhoneNumber = parsePhoneNumber(mobileNo, dialCode);
//   console.log(parsedPhoneNumber, "validation mobile");
//   if (parsedPhoneNumber === undefined || parsedPhoneNumber === "") {
//     return "Please enter Mobile Number.";
//   }
//   if (
//     !parsedPhoneNumber ||
//     !parsedPhoneNumber.isValid() ||
//     parsedPhoneNumber.isNonGeographic()
//   ) {
//     return "Please enter a valid Mobile Number.";
//   }
//   if (/(\d)\1{6,}/.test(parsedPhoneNumber.number)) {
//     return "Mobie Number cannot have continuous single numbers";
//   }
//   return "";
// };
