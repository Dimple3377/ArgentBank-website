import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Thunk pour la connexion de l'utilisateur
export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  const response = await axios.post(
    "http://localhost:3001/api/v1/user/login",
    credentials
  );
  console.log("Réponse de l'API login:", response.data); // Log de la réponse de l'API
  return response.data.body; // On suppose que body contient user et token
});

// Thunk pour la mise à jour du profil utilisateur
export const updateUser = createAsyncThunk(
  "user/update",
  async (userData, { getState }) => {
    const state = getState();
    const token = state.user.token; // Récupération du token dans le state
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
    const state = getState();
    const token = state.user.token;
    console.log("Token utilisé pour fetchUserProfile:", token); // Log du token
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Réponse de l'API fetchUserProfile:", response.data); // Log de la réponse de l'API
    return response.data.body;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // Réinitialisation du token
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Payload reçu de loginUser:", action.payload); // Log du payload reçu
        state.user = action.payload.user; // Stockage de l'utilisateur
        state.token = action.payload.token; // Stockage du token
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

export const { logout } = userSlice.actions;

export default userSlice.reducer;
