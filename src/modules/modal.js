import { handleActions, createAction } from "redux-actions";

const SHOW_MODAL = "modal/SHOW_MODAL";
const HIDE_MODAL = "modal/HIDE_MODAL";

export const showModal = createAction(SHOW_MODAL, (modal) => modal);
export const hideModal = createAction(HIDE_MODAL, (modal) => modal);

const initialState = {
  deletePost: false,
  deleteComment: false,
  level: 1,
};

const modal = handleActions(
  {
    [SHOW_MODAL]: (state, { payload: modal }) => ({
      ...state,
      [modal]: true,
      level: state.level + 1,
    }),
    [HIDE_MODAL]: (state, { payload: modal }) => ({
      ...state,
      [modal]: false,
      level: state.level - 1,
    }),
  },
  initialState
);

export default modal;
