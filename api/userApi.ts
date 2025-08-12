import axiosInstance from "./axiosConfig";
interface UserInfoResponse {
  username: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string;
  id: string
}
const userApi = {
  getUserInfo(): Promise<UserInfoResponse> {

    let url = "/users"
    return axiosInstance.get(url);
  },



}
export default userApi;