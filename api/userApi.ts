import axiosInstance from "./axiosConfig";
interface UserInfoResponse {
  name: string;
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
    updateUserInfo(userId: string, userData: Partial<UserInfoResponse>) {
    let url = "/users/" + userId;
    return axiosInstance.patch(url, userData);
  },

}
export default userApi;