import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchFunction,
  fetchFunction2,
  fetchFunction3,
} from "../helpers/fetchFunctions";
const initialState = {
  findNote: [],
  loading: "false",
  notelist: [],
  impnotes:[],
  error: "",
};

export const createNote = createAsyncThunk("createNote", async (body) => {
  const result = await fetchFunction("/NOTE_PAD/addnote", body);
  return result;
});
export const getallNotes = createAsyncThunk("getallNotes", async () => {
  const result = await fetchFunction2("/NOTE_PAD/getallnotes", "get");
  // console.log(result);
  return result;
});

export const getImpnote = createAsyncThunk("getImpnote", async () => {
  const result = await fetchFunction2("/NOTE_PAD/imp_note", "get");
  return result;
})



export const deletenotes = createAsyncThunk("deletenotes", async (id) => {
  const result = await fetchFunction2(`/NOTE_PAD/remove/${id}`, "delete");
  // console.log(result);
  return result;
});

export const updatenotes = createAsyncThunk(
  "updatenotes",
  async ({ id, note, subject }) => {
    console.log(id, note, subject);
    const body = { note, subject };
    const result = await fetchFunction3(`/NOTE_PAD/update/${id}`, body);
    return result;
  }
);

export const findNotesBySubject = createAsyncThunk(
  "findNotesBySubject",
  async (subject) => {
    const result = await fetch(`NOTE_PAD/findbysubject/${subject}`, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const res = await result.json();
    return res;
  }
);

export const noteReducer = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: {
    [createNote.fulfilled]: (state, action) => {
      state.error = action.payload.error;
      state.notelist.push(action.payload.message);
    },
    [createNote.pending]: (state, action) => {
      state.loading = true;
    },
    [createNote.rejected]:(state,action) => {
      state.error = action.payload.message
    },
    [getallNotes.fulfilled]: (state, action) => {
      state.notelist = action.payload.message;
    },
    [getallNotes.pending]: (state, action) => {
      state.loading = true;
    },
    [getallNotes.rejected]:(state,action) => {
      state.error = "Please Add Note"
    },

    [deletenotes.fulfilled]: (state, action) => {
      // return state.notelist.filter((item) => {
      //   return item._id != action.payload.message._id;
      // })
      state.error = action.payload.message
    },
    [updatenotes.fulfilled]: (state, action) => {
      if(action.payload.message == undefined){
      state.error = "please fill the fileds";
      }
      else{
        state.error = action.payload.message
      }

    },
    [updatenotes.pending]: (state, action) => {
      state.loading = true;
    },
    [updatenotes.rejected]:(state,action) => {
      state.error = "Please fill all the fields"
    },
    [findNotesBySubject.fulfilled]: (state, action) => {
      state.findNote = action.payload.message;
    },
    [findNotesBySubject.pending]: (state, action) => {
      state.loading = true;
    },
    [findNotesBySubject.rejected]:(state,action) =>{
      state.error = "Note Note found!"
    },

    [getImpnote.fulfilled]:(state,action) => {
      state.impnotes = action.payload.message;
    },
    [getImpnote.pending]:(state,action) => {
      state.loading = true;
    },
    [getImpnote.rejected]:(state,action) => {
      state.error = "Imp Note Not found!"
    }
    
  },
});

export default noteReducer.reducer;
