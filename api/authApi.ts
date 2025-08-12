import axiosInstance from "./axiosConfig";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;

}
interface UserInfoResponse {
  username: string;
  dateOfBirth: string;
  gender: string;
  avatarUrl: string;
  id: string
}
const authApi = {


  login(email: string, password: string): Promise<LoginResponse> {
    const url = "/auth/cred";
    const body = { email, password };
    return axiosInstance.post(url, body);
  },
  sendResetCode(email: string) {
    const url = "/auth/reset?email="+email;
    return axiosInstance.get(url);
  },
  resetPassword(email:string, newPassword:string, verificationCode:string){
    const url="/auth/reset";
    const body={email, newPassword, verificationCode}
    return axiosInstance.post(url, body)
  },
  validate(username: string, email: string, password: string, dateOfBirth: string, gender: string) {
    const url = "/auth/validate";
    const body = { username, email, password, dateOfBirth, gender };
    console.log(body);
    return axiosInstance.post(url, body);
  },
  registerValidate(name: string, email: string, password: string) {
    const url = "/auth/validate";
    const body = { name, email, password};
    console.log(body);
    return axiosInstance.post(url, body);
  },


}
export default authApi;