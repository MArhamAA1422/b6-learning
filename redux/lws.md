## Intro
- react <=> redux
- state management
- Separate Store (for state, kinda DB)
   - Component can "subscribed to" that store and will be notified if state gets changed
- Redux is suitable for big application, huge STATE
- No props drilling, Redux handles re-rendering itself. **Debugging** one of the most important features of Redux.

## Installation
- `npm i @reduxjs/toolkit react-redux`

## What is Redux
Redux is a flexible **state container** for JS apps that manages our application state **separately**

## How Redux Store works
- Button clicked: **action**, Event: **dispatch**, Resolve/Response: **reducer()**
```js
reducer( state, action ) {
   return newState;  // not updated state, immutable action
}
```

## Folder Structure Convention
- `features`
   - `counters`
      - `counterSlice.js`  // redux thinking way: pizza
```js
// counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const countersSlice = createSlice({
   name: "counters",  // by convention folder name
   initialState,
   reducers: {
      increment: (state, action) => {  // one reducer, action.payload
         const counterIndex = state.findIndex(c => c.id === action.payload);

         state[counterIndex].value++;  // we can mutate, internally redux handles immutability, also no need to return anything
      },
      decrement: (state, action) => {},
   }
});

export default countersSlice.reducer;
export const { increment, decrement } = counterSlice.actions;
```

- `src/app`, for store, one for whole application
   - `store.js`
```js
// store.js

import { configureStore } from "@reduxjs/toolkit";
import countersReducer from '../features/counters/countersSlice';

const store = configureStore({
   reducer: {
      counters: countersReducer,
      videos: videosReducer,  // another slice, scalable!
   }
});

export default store;
```

- `main.jsx`
```js
<Provider store={store}>
   <App />
</Provider>
```

- `App.jsx`
```js
const counters = useSelector((state) => state.counters);  // redux hook, counters from store

const dispatch = useDispatch();
dispatch(increment(onlyOneParam));  // increment action creator, increment() => returns an action, if multiple param is needed we can use object
```

## Debugging
- Redux DevTools (chrome extension)
- Redux tab in browser dev tools

## Asynchronous Action (Redux Thunk)
- Work flow
   - dispatch from component
   - before get into redux, there is a middleware
   - middleware calls api, gets response, then make action
   - finally, middleware sends this action to redux
   - inside redux, stuffs are synchronous

```js
/* postsSlice.js */
const initialState = {
   posts: [],
   isLoading: false,
   isError: false,
   error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', 
   async () => {
      const posts = await getPosts();  // getPosts is a function in postsAPI.js
      return posts;
   }
);

const postsSlice = createSlice({
   name: 'posts',
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchPosts.pending, (state) => {
         state.isError = false;
         state.isLoading = true;
      });

      builder.addCase(fetchPosts.fulfilled, (state) => {
         state.isLoading = false;
         state.posts = action.payload;
      });

      builder.addCase(fetchPosts.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.error = action.error?.message;
      });
   }
};

export default postsSlice.reducer;
```