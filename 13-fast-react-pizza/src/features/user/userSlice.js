import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition()
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }
    
    const addressObj = await getAddress(position.latitude, position.longitude)
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj.postcode}, ${addressObj.countryName}`
    
    console.log(position, address)
    return { position, address }
  },
)

const initialState = {
  username: '',
  status: "idle",
  position: {},
  address: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.username = action.payload
    },
  },
  extraReducers: (builder) => 
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(fetchAddress.fulfilled, (state, action) => {
      const {latitude, longitude} = action.payload.position;
      state.position = `${latitude}, ${longitude}`
      state.address = action.payload.address;
      state.status = "idle";
    }).addCase(fetchAddress.rejected, (state, action) => {
      state.status = 'error';
      state.error = "There was an error getting your address"
    })
})

export const { updateUser } = userSlice.actions
export default userSlice.reducer

export function getUsername(state) {
  return state.user.username
}

export function getUserAddress(state) {
  return state.user.address
}

export function getStatus(state) {
  return state.user.status
}