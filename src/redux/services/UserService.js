import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../config/Api";
import DataService, {
  doGet,
  doGetByQuery,
  doGetParams,
  doPost,
  doPostFormData,
} from "../../config/DataService";
import { toast } from "react-toastify";
import Index from "../../containers/Index";

//#region auth module
export const loginUser = async (data) => {
  try {
    const response = await doPost(Api.Admin.User.LOGIN, data, false);
    if (response?.data?.status === 200) {
      toast.success(response?.data?.message);
      DataService.defaults.headers.common.auth = response?.data?.data?.token;
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const changePasswordProfile = async (data) => {
  try {
    const response = await doPost(Api.Admin.User.CHANGE_PASSWORD, data, true);
    if (response?.data?.status === 200) {
      return response?.data?.status;
    }
  } catch (error) {}
};

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data) => {
    try {
      const response = await doPost(Api.Admin.User.UPDATE_PROFILE, data);
      if (response?.data?.status === 200) {
        return response?.data;
      }
    } catch (error) {}
  }
);

export const forgotPassword = async (data) => {
  try {
    const response = await doPost(Api.Admin.User.FORGOT_PASSWORD, data, false);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.User.USER_VERIFY_OTP_API,
      data,
      false
    );
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (data) => {
  try {
    const response = await doPost(Api.Admin.User.RESET_PASSWORD, data, true);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

//Dashboard Api

export const getAllLatestCourse = async (data) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.GET_LATEST_COURSES,
      { params: data },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getSingleCourseService = async (id, user_id) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_SINGLE_COURSE}?courseID=${id}&user_id=${user_id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getSingleTopicService = async (id, user_id, courseId) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_SINGLE_TOPIC}?id=${id}&user_id=${user_id}&courseId=${courseId}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getContactQueryService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.GET_CONTACT_QUERY_LIST,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const contactUsService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.User.ADD_CONTACT_US, payload);
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

//#region Logout

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await doPost(Api.User.LOGOUT, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const userLoginWithOtp = async (data) => {
  try {
    const response = await doPost(
      Api.User.Auth.USER_LOGIN_WITH_OTP,
      data,
      false
    );
    if (response?.data?.status === 200) {
      DataService.defaults.headers.common.auth = response?.data?.data?.token;
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

//#region SIngle User
export const getSingleUser = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.User.FETCH_SINGLE_USER,
      {
        params: data,
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const verifyRegisterOtp = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.User.USER_VERIFY_OTP_API,
      data,
      false
    );
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

export const resendOtp = async (data) => {
  try {
    const response = await doPost(Api.Admin.User.RESEND_OTP, data, true);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {}
};

export const addVideoTracking = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.User.ADD_VIDEO_TRACKING,
      data,
      false
    );
    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
  } catch (error) {}
};
//#region single quiz by courseId
export const getQuizByCourseId = async (courseId) => {
  try {
    const resp = await doGetParams(
      Api.Admin.User.FETCH_QUIZ_BY_COURSE_ID,
      courseId,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region submit quiz
export const submitQuiz = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.SUBMIT_QUIZ, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region get user quiz result
export const getUserQuizResult = async (params) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.GET_QUIZ_RESULT,
      {
        params,
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region get user quiz passed results
export const getUserQuizPassedResult = async (courseId) => {
  try {
    const resp = await doGet(Api.Admin.User.GET_PASSED_QUIZ_RESULT, false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region download certificate
export const downloadQuizCertificate = async (params) => {
  try {
    const base_url = import.meta.env.VITE_BASE_URL;
    const query = `?id=${params?.id}&course_id=${params?.course_id}`;
    const authToken = localStorage.getItem("authToken");
    const response = await fetch(
      `${base_url}/${Api.Admin.User.DOWNLOAD_CERTIFICATE}${query}`,
      {
        method: "GET",
        headers: {
          auth: authToken,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getVideoTracking = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.GET_VIDEO_TRACKING,
      {
        params: data,
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getAllLatestHackathon = async (data) => {
  try {
    const response = await doGet(Api.Admin.User.GET_LATEST_HACKATHON, false);
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getSingleHackathonService = async (id) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_LATEST_HACKATHON}/${id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const createTeamEligblility = async (id) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_CREATE_TEAM_ELIGBLE}/${id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    Index.toast.error(error?.response?.data?.message);
    return error;
  }
};

export const findUserByIdAndEmail = async (id, hackathonName) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_USER_EMAIL_AND_ID}?search=${id}&hackathonName=${hackathonName}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    Index.toast.error(error?.response?.data?.message);
    return error;
  }
};

export const createTeamAction = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.CREATE_TEAM, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const inviteMemberInTeamAction = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.INVITE_MEMBER, payload,true);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getHackathonTeamInvitationAction = async (params) => {
  try {
    const resp = await doGet(
      Api.Admin.User.GET_HACKATHON_TEAM_INVITATION,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getHackathonInvitationAction = async (id) => {
  try {
    const resp = await doGetParams(
      Api.Admin.User.GET_HACKATHON_INVITATION,
      id,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const hackathonInvitationStatus = async (payload) => {
  try {
    const resp = await doPost(
      Api.Admin.User.HACKATHON_INVITATION_STATUS,
      payload,
      true
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getMyTeamList = async (id) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_TEAM_BY_USER}/${id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getMyTeamDetail = async (id) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_TEAM_BY_ID}/${id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getTeamDetailByHackathon = async (id) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_TEAM_BY_HACKATHON}/${id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getFaqListAction = async (id) => {
  try {
    const response = await doGet(`${Api.Admin.User.GET_ALL_FAQ}`, false);

    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
export const getContinueWatchingService = async (data) => {
  try {
    const response = await doGet(Api.Admin.User.CONTINUE_WATCHING, false);
    return response.data;
  } catch (error) {}
};

export const feedbackService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.User.ADD_PWD_FEEDBACK, payload);
    if (response?.data?.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getAllTestimonials = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.GET_ALL_TESTIMONIAL,
      {
        params: data,
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getTestimonial = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.GET_TESTIMONIAL_BY_ID,
      {
        params: data,
      },
      "",
      false
    );

    return resp?.data;
  } catch (error) {
    return error;
  }
};
export const addCourseRatingService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.User.ADD_COURSE_RATING, payload);
    if (response?.data?.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getTeamListService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.GET_TEAM_LIST,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getTeamDetailService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.GET_TEAN_DETAIL,
      {
        params: data,
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const addTeamDocumentService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.User.ADD_TEAM_DOCUMENT, payload);
    if (response?.data?.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const fetchTeamDocumentService = async (id) => {
  try {
    const resp = await doGetParams(
      Api.Admin.User.GET_TEAM_DOCUMENT,
      id,
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getNotificationListService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.GET_USER_NOTIFICATIONS,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getUnreadNotificationService = async (data) => {
  try {
    const response = await doGet(
      Api.Admin.User.GET_USER_UNREAD_NOTIFICATIONS,
      false
    );
    return response.data;
  } catch (error) {}
};

export const applyForInternshipService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.User.APPLY_FOR_INTERNSHIP, payload);
    if (response?.data?.status === 201) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const checkInternshipApplicationService = async (data) => {
  try {
    const response = await doGet(
      Api.Admin.User.CHECK_INTERNSHIP_APPLICATION,
      false
    );
    return response.data;
  } catch (error) {}
};

export const getMyCoursesService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.MY_COURSES,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getMyInternshipsService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.MY_INTERNSHIPS,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const addPdfTracking = async (data) => {
  try {
    const response = await doPost(Api.Admin.User.ADD_PDF_TRACKING, data, false);
    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
  } catch (error) {}
};

export const getAllInternshipCourses = async (data) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.GET_ALL_INTERNSHIP_COURSES,
      { params: data },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getSingleInternshipCourse = async (id) => {
  try {
    const resp = await doGet(
      `${Api.Admin.User.GET_SINGLE_INTERNSHIP}/${id}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const addAssignmentService = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.User.UPLOAD_INTERNSHIP_WEEK_ASSIGNMENT,
      data
    );
    return response?.data;
  } catch (error) {}
};

export const getSingleInternshipWeekManagement = async (id) => {
  try {
    const resp = await doGet(`${Api.Admin.User.GET_SINGLE_WEEK}/${id}`, false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getInternshipWeekTrackingService = async (id) => {
  try {
    const resp = await doGet(
      `${Api.Admin.User.GET_INTERNSHIP_WEEK_TRACKING}?internshipId=${id}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getSingleInternshipTopicService = async (
  id,
  user_id,
  courseId
) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.INTERNSHIP_TOPIC_DETAIL}?id=${id}&user_id=${user_id}&courseId=${courseId}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const addInternshipVideoTracking = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.User.INTERNSHIP_TOPIC_TRACKING,
      data,
      false
    );
    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
  } catch (error) {}
};

export const addInternshipPdfTracking = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.User.ADD_INTERNSHIP_PDF_TRACKING,
      data,
      false
    );
    if (response?.status === 200 || response?.status === 201) {
      return response;
    }
  } catch (error) {}
};

export const getSingleInternshipCourseService = async (
  id,
  user_id,
  internshipId,
  week_id
) => {
  try {
    const response = await doGet(
      `${Api.Admin.User.GET_SINGLE_INTERNSHIP_COURSE}?courseID=${id}&user_id=${user_id}&internshipId=${internshipId}&week_id=${week_id}`,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
export const submitInternshipQuiz = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.INTERNSHIP_QUIZ_SUBMIT, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};
export const getInternshipTopicQuizResult = async (params) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.GET_INTERNSHIP_QUIZ_RESULT,
      {
        params,
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getAssesmentFeedBackView = async (data) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.User.GET_FEEDBACK,
      {
        params: data,
      },
      "",
      false
    );
    return response?.data;
  } catch (error) {}
};

//#region submit quiz
export const downloadInternshipCertificate = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.INETERSHIP_CERTIFICATE, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};


export const checkStudentCertificate = async (id, type, typeId) => {
  try {
    const response = await doGet( `${Api.Admin.User.CHECK_CERTIFICATE}/${type}/${typeId}/${id}`, false);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const generateCourseCertificate = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.COURSE_CERTIFICATE, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getAllSemesterServices = async () => {
  try {
    const resp = await doGet(Api.Admin.User.ALL_SEMESTERS, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getAllStreamServices = async () => {
  try {
    const resp = await doGet(Api.Admin.User.ALL_STREAMS, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};