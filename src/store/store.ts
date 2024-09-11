import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postReducer from "./posts/reducer";
import userReducer from "./users/reducer";
import storage from "redux-persist/es/storage";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  posts: postReducer.reducer,
  users: userReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: true,
});

const persistor = persistStore(store)

export  {store, persistor};
