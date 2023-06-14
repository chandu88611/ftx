// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { HYDRATE, createWrapper } from 'next-redux-wrapper'
// import users from './userSlice.js'
// // import counter from './counterSlice'

// const combinedReducer = combineReducers({
//   users
// });

// const masterReducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             counter: {
//                 count: state.counter.count + action.payload.counter.count,
//             },
//             users: {
//                 users: [...action.payload.users.users, ...state.users.users]
//             }
//         }
//         return nextState;
//     } else {
//     return combinedReducer(state, action)
//   }
// }

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import users from './userSlice.js';

import alertSlice from './alertSlice.js';
import loaderSlice from './loaderSlice.js';

const combinedReducer = combineReducers({
  users,
  alert:alertSlice,
  loader:loaderSlice,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      users: {
        users: [...action.payload.users.users, ...state.users.users],
      },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const wrapper = createWrapper(makeStore, { debug: true });









// import users from './userSlice.js';
// import alert from './alertSlice.js';
// import loader from './loaderSlice.js';

// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import { HYDRATE, createWrapper } from 'next-redux-wrapper';


// const combinedReducer = combineReducers({
//   users: users,
//   alert: alert,
//   loader: loader,
// });

// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state,
//       ...action.payload,
//     };
//     return nextState;
//   }
//   return combinedReducer(state, action);
// };

// export const makeStore = () =>
//   configureStore({
//     reducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });