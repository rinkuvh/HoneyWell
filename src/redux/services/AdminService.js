import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../config/Api";
import DataService, {
  doGet,
  doGetByQuery,
  doGetParams,
  doPost,
  doPostData,
  doPostFormData,
} from "../../config/DataService";
import { toast } from "react-toastify";

//#region auth module
export const loginAdmin = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.LOGIN, data, false);
    if (response?.data?.status === 200) {
      toast.success(response?.data?.message);
      DataService.defaults.headers.common.auth = response?.data?.data?.token;
      return response.data;
    }
  } catch (error) {
    return error;
  }
};
export const loginVerifyOtp = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.LOGIN_VERIFY_OTP, data, true);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

export const changePasswordProfile = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.CHANGE_PASSWORD, data, true);
    if (response?.data?.status === 200) {
      return response?.data?.status;
    }
  } catch (error) {}
};

export const updateProfile = createAsyncThunk(
  "admin/updateProfile",
  async (data) => {
    try {
      const response = await doPost(Api.Admin.Auth.UPDATE_PROFILE, data);
      if (response?.data?.status === 200) {
        return response?.data;
      }
    } catch (error) {}
  }
);

export const forgotPassword = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.FORGOT_PASSWORD, data, false);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.VERIFY_OTP, data, false);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};
export const resetPassword = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.RESET_PASSWORD, data, true);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};
export const resendOTP = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.RESEND_OTP, data, true);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {}
};
export const resendForgotPasswordOTP = async (data) => {
  try {
    const response = await doPost(Api.Admin.Auth.RESEND_FORGOT_PASSWORD_OTP, data, true);
    if (response?.data?.status === 200) {
      return response?.data;
    }
  } catch (error) {}
};



//#region Logout
export const adminLogout = createAsyncThunk(
  "admin/adminLogout",
  async (data, { rejectWithValue }) => {
    try {
      const response = await doPost(Api.Company.LOGOUT, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);



//#region User Mater Apis Start
export const getAllUserService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.FETCH_LIST,
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

export const addStudentService = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.ADD_USER, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const updateStudentService = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.UPDATE_USER, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getCourses = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Course.GET_COURSES,
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

export const getSections = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Sections.GET_SECTIONS,
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

export const addSection = async (data) => {
  try {
    const resp = await doPost(Api.Admin.Sections.ADD_SECTIONS, data);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const deleteSection = async (data) => {
  try {
    const resp = await doPost(Api.Admin.Sections.DELETE_SECTIONS, data);

    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const addCourse = async (data) => {
  try {
    const response = await doPostFormData(Api.Admin.Course.ADD_COURSE, data);
    return response?.data;
  } catch (error) {}
};

export const deleteCourse = async (data) => {
  try {
    const response = await doGetParams(Api.Admin.Course.DELETE_COURSE, data.id);

    return response;
  } catch (err) {}
};
export const getSingleUserService = async (id) => {
  try {
    const response = await doGetParams(
      Api.Admin.User.FETCH_SINGLE_USER,
      id,
      false
    );

    return response?.data;
  } catch (error) {
    return error;
  }
};

//#region Applicat User Mater Apis Start
export const getAllApplicatUserService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.FETCH_APPLICAT_USER_LIST,
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

export const addEditUserService = async (values) => {
  try {
    const response = await doPost(Api.Admin.User.CREATE_UPDATE, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const deleteUserService = async (values) => {
  try {
    const response = await doPost(Api.Admin.User.DELETE_USER, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};
export const activeDeactiveUserService = async (values) => {
  try {
    const response = await doPost(Api.Admin.User.USER_ACTIVE_DEACTIVE, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};
//#endregion User Master End







export const adminLoginWithOtp = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.Auth.ADMIN_LOGIN_WITH_OTP,
      data,
      true
    );
    if (response?.data?.status === 200) {
      DataService.defaults.headers.common.auth = response?.data?.data?.token;
      return response?.data;
    }
  } catch (error) {
    return error;
  }
};

export const userRegisterModalService = async (values) => {
  try {
    const response = await doPost(Api.Admin.User.USER_REGISTER_API, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const getAllDistrictServices = async () => {
  try {
    const resp = await doGet(Api.Admin.User.ALL_DISTRICT_API, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};
export const getAllCollegeServices = async () => {
  try {
    const resp = await doGet(Api.Admin.User.ALL_COLLEGE_API, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getAllTalukaServices = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.ALL_TALUKA_API,
      {
        params: { districtId: data },
      },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getSingleUserDetailsServices = async () => {
  try {
    const resp = await doGet(Api.Admin.User.GET_SINGLE_USER_API, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region Topic

export const addEditTopicService = async (values) => {
  try {
    const response = await doPost(Api.Admin.Topic.ADD_TOPIC, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const deleteTopic = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Topic.DELETE_TOPIC,
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

export const getAllTopics = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Topic.GET_TOPICS_BY_SECTION,
      { params: data },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getDashboardData = async () => {
  try {
    const resp = await doGet(Api.Admin.Dashboard.GET_DASHBOARD_DATA, false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getSingleTopic = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Topic.GET_TOPIC_BY_ID,
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

export const updateTopicStatusService = async (values) => {
  try {
    const response = await doPost(Api.Admin.Topic.CHANGE_TOPIC_STATUS, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

//#region quizz
export const getAllQuiz = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.QUIZ.GET_ALL_QUIZ,
      { params: data },
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const addEditQuizService = async (values) => {
  try {
    const response = await doPost(Api.Admin.QUIZ.ADD_EDIT_QUIZ, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const updateQuizStatusService = async (values) => {
  try {
    const response = await doPost(Api.Admin.QUIZ.UPDATE_QUIZ_STATUS, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};

export const getSingleQuizById = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.QUIZ.GET_QUIZ_BY_ID,
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

export const deleteQuiz = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.QUIZ.DELETE_QUIZ,
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

export const getAllHackathon = async (data) => {

  try {
    const resp = await doGetByQuery(
      Api.Admin.Hackathon.GET_ALL_HACKATHON,
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

export const getHackathon = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Hackathon.GET_HACKATHON_BY_ID,
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

export const addHackathon = async (data) => {
  try {
    const response = await doPostFormData(
      Api.Admin.Hackathon.ADD_EDIT_HACKATHON,
      data
    );
    return response?.data;
  } catch (error) {}
};

export const getAllCourses = async () => {
  try {
    const resp = await doGet(Api.Admin.Hackathon.GET_ALL_COURSES, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const deleteHackathon = async (data) => {
  try {
   
    const response = await doGetByQuery(
      Api.Admin.Hackathon.DELETE_HACKATHON,
      {
        params: data,
      },
      "",
      false
    );

    return response;
  } catch (err) {}
};

//#reason get all quiz results
export const getAllQuizResults = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.QUIZ.GET_ALL_QUIZ_RESULT,
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

//#reason get quiz result by id
export const getQuizResultById = async (id) => {
  try {
    const resp = await doGetParams(
      Api.Admin.QUIZ.GET_QUIZ_RESULT_BY_ID,
      id,
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region course tracking
export const getCourseTrackingService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.GET_COURSE_TRACKING,
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

//#region course rating
export const getCourseRatingsService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.GET_COURSE_RATING,
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

//#reason get course rating by id
export const getCourseRatingById = async (id) => {
  try {
    const resp = await doGetParams(
      Api.Admin.GET_COURSE_RATING_BY_ID,
      id,
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getFaq = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.FAQ.GET_FAQ_BY_ID,
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

export const addEditFaq = async (data) => {
  try {
    const response = await doPostData(Api.Admin.FAQ.ADD_EDIT_FAQ, data);
    return response?.data;
  } catch (error) {}
};

export const getAllFaqList = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.FAQ.GET_ALL_FAQ,
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

export const deleteFaq = async (data) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.FAQ.DELETE_FAQ,
      {
        params: data,
      },
      "",
      false
    );

    return response;
  } catch (err) {}
};

export const getPwdFeedbackService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.PWD.GET_FEEDBACK_LIST,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getTestimonial = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.TESTIMONIAL.GET_TESTIMONIAL_BY_ID,
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
export const getPwdFeedback = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.PWD.GET_PWD_FEEDBACK,
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

export const addEditTestimonial = async (data) => {
  try {
    const response = await doPostData(
      Api.Admin.TESTIMONIAL.ADD_EDIT_TESTIMONIAL,
      data
    );
    return response?.data;
  } catch (error) {}
};

export const getAllTestimonials = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.TESTIMONIAL.GET_ALL_TESTIMONIAL,
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

export const deleteTestimonial = async (data) => {

  try {
    const response = await doGetByQuery(
      Api.Admin.TESTIMONIAL.DELETE_TESTIMONIAL,
      {
        params: data,
      },
      "",
      false
    );

    return response;
  } catch (err) {}
};

export const getTeamListService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.TEAM.GET_TEAM_LIST,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const addTeamFeedbackService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.TEAM.ADD_TEAM_FEEDBACK, payload);
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getTeamDetailService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.TEAM.GET_TEAN_DETAIL,
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

export const getAllIntershipsService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.GET_ALL_INTERNSHIPS,
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

export const getContactByIdService = async (params) => {
  try {
    const response = await doGetParams(
      Api.Admin.GET_CONTACT_QUERY_BY_ID,
      params,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const replyToContactInquiryService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.REPLY_TO_CONTACT_INQUIRY, payload);
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
};

export const getDashboardStudentChartInfo = async (timePeriod) => {
  try {
    const resp = await doGet(
      `${Api.Admin.Dashboard.GET_STUDENT_CHART_DATA}?timePeriod=${timePeriod}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getDashboardInternshipChartInfo = async (timePeriod) => {
  try {
    const resp = await doGet(
      `${Api.Admin.Dashboard.GET_INTERNSHIP_CHART_DATA}?timePeriod=${timePeriod}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getSectionById = async (id) => {
  try {
    const resp = await doGet(
      `${Api.Admin.Sections.GET_SINGLE_SECTION}/${id}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getStudentCoursesService = async (id, query) => {
  try {
    const response = await doGetByQuery(
      `${Api.Admin.Course.STUDENT_COURSES}/${id}`,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getStudentInternshipsService = async (id, query) => {
  try {
    const response = await doGetByQuery(
      `${Api.Admin.Course.STUDENT_INTERNSHIPS}/${id}`,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getInternshipCourses = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.InternshipCourse.GET_INTERNSHIP_COURSES,
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

export const addEditInternshipCourseService = async (data) => {
  try {
    const response = await doPostFormData(
      Api.Admin.InternshipCourse.ADD_EDIT_COURSE,
      data
    );
    return response?.data;
  } catch (error) {}
};

export const deleteInternshipCourseService = async (id) => {
  try {
    const response = await doGetParams(
      Api.Admin.InternshipCourse.DELETE_COURSE,
      id
    );

    return response;
  } catch (err) {}
};

export const getSingleInternshipCourses = async (id) => {
  try {
    const resp = await doGet(
      `${Api.Admin.InternshipCourse.GET_SINGLE_INTERNSHIP}/${id}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getInternshipWeekManagement = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.InternshipCourse.GET_WEEK,
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

export const addEditInternshipWeekManagement = async (data) => {
  try {
    const response = await doPost(
      Api.Admin.InternshipCourse.ADD_EDIT_WEEKWISE_MANAGEMENT,
      data
    );
    return response?.data;
  } catch (error) {}
};

export const deleteInternshipWeekManagement = async (id) => {
  try {
    const response = await doGetParams(
      Api.Admin.InternshipCourse.DELETE_WEEK,
      id
    );

    return response;
  } catch (err) {}
};

export const getSingleInternshipWeekManagement = async (id) => {
  try {
    const resp = await doGet(
      `${Api.Admin.InternshipCourse.GET_SINGLE_WEEK}/${id}`,
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};
export const getAssesmentList = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.ASSESSMENT.GET_ASSESSMENT_LIST,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const addFeedbackAssessment = async (payload) => {
  try {
    const response = await doPost(
      Api.Admin.ASSESSMENT.UPDATE_ASSESMENT,
      payload
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};

export const getCourseByIdTrackingService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Internship.COURSE_TRACKING_LIST,
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

//#reason get all Internship quiz results
export const getAllInternshipQuizResults = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.INTERNSHIP_QUIZ.GET_ALL_INTERNSHIP_QUIZ_RESULT,
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

//#reason get Internship quiz result by id
export const getInternshipQuizResultById = async (id) => {
  try {
    const resp = await doGetParams(
      Api.Admin.INTERNSHIP_QUIZ.GET_INTERNSHIP_QUIZ_RESULT_BY_ID,
      id,
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

//#region week tracking
export const getWeekTrackingService = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.Internship.WEEK_TRACKING_LIST,
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

export const getAssessmentView = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.ASSESSMENT_LIST.GET_SINGLE_ASSESSMENT,
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

export const getAllInternship = async () => {
  try {
    const resp = await doGet(
      Api.Admin.Internship.GET_ALL_INTERNSHIP,
      "",
      false
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getInternshipRegisterUserCount = async () => {
  try {
    const resp = await doGet(Api.Admin.Dashboard.GET_INTERNSHIP_REGISTER_USER_COUNT, false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const getAllHackathonList = async () => {
  try {
    const resp = await doGet(Api.Admin.Hackathon.GET_HACKATHON_LIST, "", false);
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const addBulkStudentService = async (payload) => {
  try {
    const resp = await doPost(Api.Admin.User.IMPORT_BULK_STUDENTS, payload);
    return resp?.data;
  } catch (error) {
    return error;
  }
};
export const exportTeamListService = async (query) => {
  try {
    const response = await doGetByQuery(
      Api.Admin.TEAM.EXPORT_TEAM_LIST,
      { params: query },
      null,
      false
    );
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};


export const deleteUserWiseTeamMember = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.User.DELETE_TEAM_BY_HACKATHON,
      {
        params: data,
      },
      "",
      true
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const deleteUserWiseTeamMemberByAdmin = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.TEAM.DELETE_TEAM_MEMBER,
      {
        params: data,
      },
      "",
      true
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const deleteUserWiseTeamByAdmin = async (data) => {
  try {
    const resp = await doGetByQuery(
      Api.Admin.TEAM.DELETE_TEAM,
      {
        params: data,
      },
      "",
      true
    );
    return resp?.data;
  } catch (error) {
    return error;
  }
};

export const updateTeamDataAdminService = async (payload) => {
  try {
    const response = await doPost(Api.Admin.TEAM.UPDATE_ADMIN_TEAM, payload);
    if (response?.data?.status === 200) {
      return response.data;
    }
  } catch (err) {}
};


export const getAllInternshipWeeksService = async (internshipId) => {
  try {
    const resp = await doGet(
      `${Api.Admin.Internship.GET_ALL_INTERNSHIP_WEEk}/${internshipId}`,
      "",
      false
    );
    return resp?.data;
    } catch (error) {
    return error;
  }
};

export const changeStudentInternshipCourse = async (values) => {
  try {
    const response = await doPost(Api.Admin.Internship.CHANGE_STUDENT_INTERNSHIP, values);
    return response?.data;
  } catch (error) {
    return error;
  }
};