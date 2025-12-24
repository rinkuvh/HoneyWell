import AuthBackground from "../components/common/AuthBackground";
import {
  StyledMenu,
  BpCheckbox,
  CustomTabPanel,
  a11yProps,
  style,
  IOSSwitch,
  BpRadio,
} from "../components/common/commonCssFunction/cssFunction";
import Png from "../assets/Png";
import Svg from "../assets/Svg";
import Jpg from "../assets/Jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  activityTypes,
  allowOnlyCharacters,
  allowOnlyNumbers,
  amountType,
  genderTypes,
  getFilePreview,
  getLimitedString,
  grades,
  isValidFileType,
  processString,
  scholarShipType,
  Stages,
} from "../utils/sharedFunctions";
import { imageUrl } from "../config/DataService";
import usePaginationHook from "../hooks/usePaginationHook";
import { FieldArray, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  editProfileSchema,
  forgotPasswordSchema,
  loginSchema,
  userLoginSchema,
  otpSchema,
  passwordValidationSchema,
  REGEX,
  resetPasswordSchema,
  rolePermissionSchema,
  userManagementSchema,
  scholarshipSchema,
  editCompanyProfileSchema,
  companyEnquirySchema,
  editUserInformationSchema,
  addEditFAQSchema,
  editFinancialInformationSchema,
  editEducationInformationSchema,
  editUserPrivateInformationSchema,
  applyScholarshipSchema,
  companyPersonalInfoSchema,
  companyPrivateInfoSchema,
  contactPersonInfoSchema,
  companyAddressInfoSchema,
  CompanySchema,
  NotificationAndMailSchema,
  criteriaSchema,
  formSchema,
  editUserProfileInformationSchema,
  addEditDocumentSchema,
  resetPasswordUserSchema,
  addEditTopicSchema,
  addEditTestimonialSchema,
  addEditSectionSchema,
  contactUsSchema,
  addEditCourseSchema,
  addEditHackathonSchema,
  addEditStudentSchema,
  addEditQuizSchema,
  feedBackFormSchema,
} from "../validations/Schema";
import AdminEditProfile from "./admin/pages/adminAccountLayout/AdminEditProfile";
import ChangePassword from "./admin/pages/adminAccountLayout/ChangePassword";

import Sidebar from "./admin/pages/adminLayout/Sidebar";
import Header from "./admin/pages/adminLayout/Header";

import Loader from "../components/common/loader/Loader";
import PageLoader from "../components/common/loader/PageLoader";
import DataNotFound from "../components/common/dataNotFound/DataNotFound";

import PrimaryButton from "../components/common/Button/PrimaryButton";
import BorderButton from "../components/common/Button/BorderButton";
import CommonTable from "../components/common/commonTable/CommonTable";
import { usePermission } from "../hooks/usePermission";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CommonFormModal from "../components/common/createModal/CommonFormModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ConfirmationModal from "../components/common/confirmationModal/ConfirmationModal";
import CommonCkEditor from "../components/common/ckEditor/CommonCkEditor";
import UserHeader from "./user/pages/userLayout/Header";
import UserSidebar from "./user/pages/userLayout/Sidebar";


import { handleCommonExport } from "../components/common/common";
import UpdatePersonalInformation from "./admin/pages/adminAccountLayout/UpdatePersonalInformation";
// Web components
import WebHeader from "./web/pages/webLayout/WebHeader";
import WebFooter from "./web/pages/webLayout/WebFooter";
import Hero from "./web/pages/home/Hero";
import JoinLeader from "./web/pages/home/JoinLeader";
import AboutNew from "./web/pages/home/AboutNew";

import VerifyOtpModal from "../components/common/verifyOtpModal/VerifyOtpModal";

import Blog from "./web/pages/home/Blog";
import ContactSect from "./web/pages/home/ContactSect";
import BecomeOurPartner from "./web/pages/home/BecomeOurPartner";

import AboutCoustomer from "./web/pages/home/AboutCoustomer";
import CommonFilterDrawer from "../components/common/commonFilterDrawer/CommonFilterDrawer";
import GoToTop from "../components/common/GoToTop";
import * as XLSX from "xlsx";
import ImportButton from "./../components/common/importButton/ImportButton";
import useSystemInfo from "../hooks/useSystemInfo";
import WelcomeModal from "../components/common/welcomeModal/WelcomeModal";
import MomentTimeZone from "moment-timezone";
import ShareModal from "../components/common/shareModal/ShareModal";
import CourseRatingModal from "../components/common/courseRatingModal/CourseRatingModal";
import QuizInstructionModal from "../components/common/quizInstructionModal/QuizInstructionModal";

export default {
  ImportButton,
  XLSX,
  grades,
  genderTypes,
  activityTypes,
  VerifyOtpModal,
  companyAddressInfoSchema,
  contactPersonInfoSchema,
  addEditTestimonialSchema,
  companyPrivateInfoSchema,
  companyPersonalInfoSchema,
  addEditDocumentSchema,
  editUserPrivateInformationSchema,
  addEditFAQSchema,
  FieldArray,
  editEducationInformationSchema,
  editFinancialInformationSchema,
  addEditCourseSchema,
  addEditHackathonSchema,
  editUserInformationSchema,
  addEditQuizSchema,
  handleCommonExport,
  companyEnquirySchema,
  editCompanyProfileSchema,
  userManagementSchema,
  //////////////////////////////////

  editUserProfileInformationSchema,
  useParams,
  //#region common
  AuthBackground,
  ConfirmationModal,
  Loader,
  PageLoader,
  DataNotFound,
  style,
  PrimaryButton,
  BorderButton,
  CommonTable,
  DatePicker,
  LocalizationProvider,
  AdapterDayjs,
  CommonFormModal,
  scholarShipType,
  Stages,
  CommonCkEditor,
  getFilePreview,
  amountType,
  CommonFilterDrawer,
  QuizInstructionModal,
  
  //#region image files
  Svg,
  Png,
  Jpg,

  //#region common function start
  processString,
  allowOnlyNumbers,
  allowOnlyCharacters,
  isValidFileType,
  REGEX,

  //#region hooks
  usePaginationHook,
  useNavigate,
  useDispatch,
  useLocation,
  useSelector,
  Formik,
  useFormik,
  usePermission,
  useSystemInfo,

  //#region validation schemas
  loginSchema,
  userLoginSchema,
  forgotPasswordSchema,
  otpSchema,
  editProfileSchema,
  passwordValidationSchema,
  resetPasswordSchema,
  resetPasswordUserSchema,
  rolePermissionSchema,
  scholarshipSchema,
  applyScholarshipSchema,
  CompanySchema,
  NotificationAndMailSchema,
  criteriaSchema,
  formSchema,
  addEditTopicSchema,
  addEditSectionSchema,
  contactUsSchema,
  addEditStudentSchema,
  //#region image Url
  imageUrl,
  feedBackFormSchema,

  //#components
  AdminEditProfile,
  ChangePassword,
  Sidebar,
  Header,
  StyledMenu,
  BpCheckbox,
  CustomTabPanel,
  a11yProps,
  IOSSwitch,
  UserHeader,
  UserSidebar,
  UpdatePersonalInformation,
  BpRadio,
  WelcomeModal,
  ShareModal,
  CourseRatingModal,
  //#web components
  WebHeader,
  WebFooter,
  Hero,
  JoinLeader,
  AboutNew,

  Blog,
  ContactSect,
  AboutCoustomer,
  BecomeOurPartner,
  GoToTop,
  MomentTimeZone,
  getLimitedString,
  Yup,
};
