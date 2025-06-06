import {createSlice, current} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    isLogin: false,
    hideBottomScreen: undefined,
    profileData: {},
    tradeApplicationData: {},
    isLogout: false,
    notficationCount: 0,
    dial_code: '27',
    displayName: '',
    badgeIcon: null,
  },
  reducers: {
    saveUserData: (state, action) => {
      state.userData = action.payload;
    },
    authStatus: (state, action) => {
      state.isLogin = action.payload;
    },
    hideTab: (state, action) => {
      state.hideBottomScreen = action.payload;
    },
    saveProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    // saveTradeApplicationData: (state, action) => {
    //   state.tradeApplicationData = {
    //     ...state.tradeApplicationData, // Keep existing data
    //     ...action.payload, // Merge new data
    //   };
    // },
    saveTradeApplicationData: (state, action) => {
      state.tradeApplicationData = Object.keys(action.payload).length
        ? {...state.tradeApplicationData, ...action.payload} // Merge new data
        : {}; // Reset to an empty object when payload is empty
    },

    logouthandler: (state, action) => {
      state.isLogout = action.payload;
    },
    handlerNotificationCount: (state, action) => {
      state.notficationCount = action.payload;
    },

    handleDial_code: (state, action) => {
      state.dial_code = action.payload;
    },

    location_display: (state, action) => {
      state.displayName = action.payload;
    },

    handleBadgeIcon: (state, action) => {
      state.badgeIcon = action.payload;
    },
  },
});

export const {
  handleBadgeIcon,
  location_display,
  handleDial_code,
  handlerNotificationCount,
  saveUserData,
  authStatus,
  hideTab,
  saveProfileData,
  saveTradeApplicationData,
  logouthandler,
} = authSlice.actions;

export default authSlice.reducer;
