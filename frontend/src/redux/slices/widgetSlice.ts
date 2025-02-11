import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/axiosInstance";
import { Widget } from "@/components/homeWidget/types";
import { fetchWidgetData } from "@/app/lib/api"; 

interface WidgetState{
    widgets: Widget[];
    loading: boolean;
    error: string | null;
}

const initialState: WidgetState = {
    widgets: [],
    loading: false,
    error: null
};

export const fetchWidgets = createAsyncThunk(
    "widgets/fetchWidgets",
    async({ role, userId } : {role: string, userId: string}, {rejectWithValue} ) => {
        try{
            return await fetchWidgetData(role, userId);
        }catch(error: any){
            return rejectWithValue(error.response?.data?.message || "Failed to fetch widgets");
        }
    }
);

const widgetSlice = createSlice({
    name: "widgets",
    initialState,
    reducers: {
        ClearWidgets: (state) => {
            state.widgets = [];
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchWidgets.pending, (state) =>{
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchWidgets.fulfilled, (state, action) =>{
            state.widgets = action.payload;
            state.loading = false;
        });

        builder.addCase(fetchWidgets.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    },
});

export const { ClearWidgets } = widgetSlice.actions;
export default widgetSlice.reducer;