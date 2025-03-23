import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfo {
    name: string;
    email: string;
    phonenumber: string;
    usertype: string;
}

const initialState: UserInfo = {
    name: '',
    email: '',
    phonenumber: '',
    usertype: '',
};

const userInfo = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phonenumber = action.payload.phonenumber;
      state.usertype = action.payload.usertype;
    },
  },
});

export const { setUserInfo } = userInfo.actions;
export default userInfo.reducer;
