import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// 삭제예정
import axios from 'axios';
import { likeApis } from '../../apis/likeApis';

export interface LikesItemDataParams {
  postsId: number;
  nickname: string;
  likesId: number;
}

export interface LikesState {
  list: Array<LikesItemDataParams>;
}

interface AddLikesType {
  postsId: number;
  nickname: string;
}

const initialState: LikesState = {
  list: [
    // {
    //   postsId: 1,
    //   nickname: 'test2',
    //   likesId: 1,
    // },
  ],
};

// 좋아요 등록
export const axiosAddLike = createAsyncThunk(
  'likesReducer/axiosAddLike',
  async (data: AddLikesType, thunkAPI) => {
    const _data = {
      posts_id: data.postsId,
    };
    return await axios({
      url: 'url',
      method: 'POST',
      data: _data,
    })
      .then((res) => {
        console.log(res);
        thunkAPI.dispatch(addLikes(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
// 좋아요 삭제
export const axiosDeleteLike = createAsyncThunk(
  'likesReducer/axiosDeleteLike',
  async (data: number, thunkAPI) => {
    const _data = {
      posts_id: data,
    };
    return await axios({
      url: 'url',
      method: 'POST',
      data: _data,
    })
      .then((res) => {
        console.log(res);
        thunkAPI.dispatch(deleteLikes(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

export const likesSlice = createSlice({
  name: 'likesReducer',
  initialState,
  reducers: {
    addLikes: (state, action: PayloadAction<AddLikesType>) => {
      const new_likesList = [
        ...state.list,
        {
          likesId: Math.random(),
          postsId: action.payload.postsId,
          nickname: action.payload.nickname,
        },
      ];
      return { list: new_likesList };
    },
    deleteLikes: (state: LikesState, action: PayloadAction<number>) => {
      if (action.payload === 0) {
        return;
      }
      const new_likesList = state.list.filter((like) => {
        return like.likesId !== action.payload;
      });
      return { list: new_likesList };
    },
  },
});

export default likesSlice;

export const { addLikes, deleteLikes } = likesSlice.actions;

const likeActionCreators = {
  // axiosGetLike,
  axiosAddLike,
  axiosDeleteLike,
};

export { likeActionCreators };
