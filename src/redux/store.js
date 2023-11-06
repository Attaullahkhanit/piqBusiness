import { configureStore } from "@reduxjs/toolkit";
import profilePictureModalReducer from "./slices/profilePictureModalSlice";
import profileDataReducer from "./slices/profileDataSlice";
import tagsReducer from "./slices/tagsSlice";
import businessProfileReducer from "./slices/businessProfileSlice";
import businessIdReducer from "./slices/businessIdSlice";
import authReducer from "./slices/auth";
import allBusinessesReducer from './slices/allBusinessesSlice';

export const store = configureStore({ reducer: {
    profilePictureModal: profilePictureModalReducer,
    profileData: profileDataReducer,
    tags: tagsReducer,
    businessProfile: businessProfileReducer,
    allBusinesses: allBusinessesReducer,
    businessId: businessIdReducer,
    auth: authReducer,
} });
