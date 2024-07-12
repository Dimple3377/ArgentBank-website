import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

// Thunk pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    credentials
  );
  return { user: response.data.body.user, token: response.data.body.token };
});

// Thunk pour la mise à jour du profil utilisateur
export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  }
);

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.body;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
    restoreUser: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", state.token);
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout, restoreUser } = userSlice.actions;

export default userSlice.reducer;
export const selectToken = (state) => state.user.token;
