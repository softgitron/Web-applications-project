import React from "react";

import { reducer as reduxAsyncConnect } from "redux-connect";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { getPostsReducer } from "./reducers/getPosts";
import { userReducer } from "./reducers/user";
import { newPostReducer } from "./reducers/newPost";
import { getSearchReducer } from "./reducers/getSearch";
import UserRouter from "./containers/user";

import "./styles/App.css";

//stackoverflow.com/questions/49649767/reactjs-how-do-you-switch-between-pages-in-react/49649856

const store = createStore(
    combineReducers({
        reduxAsyncConnect,
        getPostsReducer,
        newPostReducer,
        getSearchReducer,
        userReducer
    }),
    applyMiddleware(thunk)
);

const AppRouter = () => (
    <Provider store={store}>
        <UserRouter></UserRouter>
    </Provider>
);

export default AppRouter;
