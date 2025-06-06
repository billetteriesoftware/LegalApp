import Config from 'react-native-config';

// export const API_BASE_URL = 'https://legalapi.billetteriesoftware.com/api/v1';
export const Image_URL = 'https://legalapi.billetteriesoftware.com/'; //image url

// export const Swagger_BASE_URL = 'https://mapi.billetteriesoftware.com/api';

console.log('99999API_BASE_URL', Config.API_BASE_URL);
export const getApiUrl = endpoint => Config.API_BASE_URL + endpoint;

export const swaggerGEtApiUrl = endpoint => Config.Swagger_BASE_URL + endpoint;

export const Login_API = swaggerGEtApiUrl('/Auth/login');
export const GetTrademark_API = swaggerGEtApiUrl(
  '/TradeMark/GetTradeMarksForUser',
);
export const GetTrademarkDetails_API = swaggerGEtApiUrl(
  '/TradeMark/GetTradeMarkByRef',
);

export const GetTradeMarkApperance_API = swaggerGEtApiUrl(
  '/TradeMark/GetTradeMarkApperance',
);

export const ApplicationCount_API = swaggerGEtApiUrl(
  '/TradeMark/GetApplicationsCount',
);
export const TradeMarkApplication_API = swaggerGEtApiUrl('/TradeMark');
export const GetUserById_API = swaggerGEtApiUrl('/User/GetUser');
export const ForgotPassword_API = getApiUrl('/auth/forgot-password');
export const OTPVerification_API = getApiUrl('/auth/verify-otp');
export const ResetPassword_API = getApiUrl('/auth/reset-password');
export const PublicationList_API = getApiUrl('/publication/list');
export const PublicationDetail_API = getApiUrl('/publication/?id=');
export const CMS_API = getApiUrl('/cms/?type=');
export const FAQ_API = getApiUrl('/faq/list');
export const ChangePassword_API = getApiUrl('/auth/change-password');
export const GetProfile_API = getApiUrl('/auth/profile');
export const UploadProfileImage_API = getApiUrl('/upload/images');
export const UploadFile_API = getApiUrl('/upload/files');
export const EditProfie_API = getApiUrl('/auth/profile');
export const Trademark_Appliaction_API = getApiUrl('/trademark');
export const ReportIssue_API = getApiUrl('/ticket');
export const ReportList_API = getApiUrl('/ticket/list');
export const ReportDetail_API = getApiUrl('/ticket?id=');
export const AddResponse_API = getApiUrl('/ticket/response');
export const ApplicatinList_API = getApiUrl('/trademark/list');
export const ApplicationDetails_API = getApiUrl('/trademark?id=');
export const Dashboard_API = getApiUrl('/auth/dashboard');
export const RefreshToken_API = getApiUrl('/admin/auth/access-token');
export const Notification_API = getApiUrl('/notification');
export const ReadNotification = getApiUrl('/notification/');
export const NotificationCount_API = getApiUrl('/notification/unread-count');
export const ImageDelete_API = getApiUrl('/upload/file?shortPath=');

export const SavedSearch_API = getApiUrl('/save-search');
export const SavedSearchGetList_API = getApiUrl('/save-search/list');
export const SavedSearchDelete_API = getApiUrl('/save-search');

export const SwaggerSearch_API = swaggerGEtApiUrl('/TradeMark/SimpleSearch');
