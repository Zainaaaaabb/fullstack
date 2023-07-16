import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        filterChange(state, action) {
            action.type = 'FILTER'
            return action.payload
        },
        filterRemove(state, action) {
            action.type = 'ALL'
            return state
        }
    }
})

export const { filterChange, filterRemove } = filterSlice.actions
export default filterSlice.reducer