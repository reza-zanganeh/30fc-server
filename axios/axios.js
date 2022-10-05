const fs = require("fs")
const FormData = require("form-data")
const path = require("path")
const axios = require("axios").default
const accesstoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkFkbWluIiwiaXNCbG9jayI6ZmFsc2UsImlhdCI6MTY2NDc4NTYzMCwiZXhwIjoxNjY0ODcyMDMwfQ.O4S2s_VDQcESmmkYEgHR5Yl87aa57VL_zNhFVlAk4xU"
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
})

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (accesstoken) config.headers.accesstoken = accesstoken
    return config
  },
  function (error) {
    // Do something with request error
    console.log("request error", error)
  }
)
// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    fs.appendFile(
      "./response.json",
      JSON.stringify(response.data) + "\n",
      (err) => {
        if (err) console.log(err)
      }
    )
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error)
    if (error.response) {
      fs.appendFile(
        "./response.json",
        JSON.stringify(error.response.data) + "\n",
        (err) => {
          if (err) console.log(err)
        }
      )
    }
  }
)

module.exports.axiosInstance = axiosInstance
