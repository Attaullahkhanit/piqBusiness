import BusinessHome from "../pages/Business/Home/BusinessHome";
import VideoPerformanceStats from "../pages/Business/PerformanceStats/VideoPerformanceStats";
import ManageBusinessProfile from "../pages/Business/Profile/Manage/ManageBusinessProfile";
import BusinessUser from "../pages/Business/Profile/AddUser/BusinessUser";
import AddVideo from "../pages/Video/AddVideo/AddVideo";
import EditThumbnail from "../pages/Video/EditThumbnail/EditThumbnail";
import AddDetail from "../pages/Video/AddDetail/AddDetail";
import AddTags from "../pages/Video/AddTags/AddTags";
import UploadSuccessful from "../pages/Video/UploadSuccessful/UploadSuccessful";
import Wallet from "../pages/Business/Wallet/Wallet";
import Withdrawal from "../pages/Business/Wallet/Withdrawal/Withdrawal";
import Settings from "../pages/Business/Settings/Settings";
import Referral from "../pages/Business/Settings/Referral/Referral";
import Signin from "../pages/Authentication/Signin/Signin";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import SignUpAsBusiness from "../pages/Authentication/SignUp/SignUpAsBusiness/SignUpAsBusiness";
import ConfirmDetail from "../pages/Authentication/Signin/ConfirmDetail/ConfirmDetail";
import SignUpProgress from "../pages/Authentication/SignUp/SignUpProgress/SignUpProgress";
import ChangePassword from "../pages/PasswordOperations/ChangePassword/ChangePassword";
import FormPassword from "../pages/PasswordOperations/ChangePassword/FormPassword/Form";
import ConfirmForm from "../pages/PasswordOperations/ConfirmationPage/ConfirmForm";
import ForgotPassword from "../pages/PasswordOperations/ForgotPassword/ForgotPassword";
import VerifyOTP from "../pages/PasswordOperations/VerifyOTP/VerifyOTP";
import OTPExpired from "../pages/PasswordOperations/OTPExpired/OTPExpired";
import BusinessVideoImmersiveView from "../pages/Video/ImmersiveView/BusinessVideoImmersiveView";
import ChatWithUsers from "../pages/Business/ChatWithUsers/ChatWithUsers";
import ContentDetail from "../pages/Business/ContentDetail/ContentDetail";
import VideoInformation from "../pages/Business/Profile/VideoInformation/VideoInformation";
import ChatBotPage from "../pages/Business/ChatBotPage/ChatBotPage";
import SignUpAsUser from "../pages/Authentication/SignUp/SignUpAsUser/SignUpAsUser";
import ChooseBusiness from "../pages/Business/ChooseBusiness/ChooseBusiness";
import AddBusiness from "../pages/Business/Profile/AddBusiness/AddBusiness";
import AddProfileProgress from "../pages/Business/Profile/AddProfileProgress/AddProfileProgress";
import AllProfileVideos from "../pages/Video/AllProfileVideos/AllProfileVideos";

export const businessRoutes = [
  { path: "/:id", element: <BusinessHome /> },
  { path: "/", element: <BusinessHome /> },
  { path: "/settings", element: <Settings /> },
  { path: "/signin", element: <Signin /> },
  { path: "/confirmdetail", element: <ConfirmDetail /> },
  { path: "/settings/referral", element: <Referral /> },
  { path: "/wallet", element: <Wallet /> },
  { path: "/wallet/withdrawal", element: <Withdrawal /> },
  { path: "/performanceStats", element: <VideoPerformanceStats /> },
  { path: "/profiles/addBusiness/details", element: <AddBusiness /> },
  { path: "/profiles/addBusiness/progress", element: <AddProfileProgress /> },
  { path: "/profiles/manage/:id", element: <ManageBusinessProfile /> },
  { path: "/profiles/addBusiness/video/all", element: <AllProfileVideos /> },
  { path: "/profiles/addBusiness/video/add", element: <AddVideo /> },
  { path: "/profiles/addBusiness/video/editThumbnail", element: <EditThumbnail /> },
  { path: "/profiles/addBusiness/video/addDetail", element: <AddDetail /> },
  { path: "/profiles/addBusiness/video/addTags", element: <AddTags /> },
  { path: "/profiles/addBusiness/video/uploadSuccess", element: <UploadSuccessful /> },
  { path: "/profiles/add", element: <BusinessUser /> },
  { path: "/profiles/edit", element: <BusinessUser /> },
  { path: "/video/all", element: <AllProfileVideos /> },
  { path: "/video/add", element: <AddVideo /> },
  { path: "/video/editThumbnail", element: <EditThumbnail /> },
  { path: "/video/addDetail", element: <AddDetail /> },
  { path: "/video/addTags", element: <AddTags /> },
  { path: "/video/uploadSuccess", element: <UploadSuccessful /> },
  { path: "/immersiveView", element: <BusinessVideoImmersiveView /> },
  { path: "/videodetail/:id", element: <VideoInformation /> },
  //Chat With Users
  { path: "/chatwithusers", element: <ChatWithUsers /> },
  { path: "/content/detail/:id", elemt: <ContentDetail /> },
  { path: "/chatbot", element: <ChatBotPage /> },
  //Choose Business
  { path: "/choosebusiness", element: <ChooseBusiness /> },
];

export const authRoutes = [
  { path: "/signup", element: <SignUp /> },
  { path: "/signup/business", element: <SignUpAsUser /> },
  { path: "/signup/progress", element: <SignUpProgress /> },
  { path: "/signin/confirmdetail", element: <ConfirmDetail /> },
  { path: "/signin", element: <Signin /> },
  // { path: "/signup/user", element: <SignUpAsUser /> },
];

//Adding new paths for Password Operations folder; pw-password, op-operations
export const passopRoutes = [
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/otpexpired", element: <OTPExpired /> },
  { path: "/changepassword", element: <ChangePassword /> },
  { path: "/changepassword/setpassword", element: <FormPassword /> },
  { path: "/changepassword/confirmation", element: <ConfirmForm /> },
  { path: "/verifyotp", element: <VerifyOTP /> },
];
