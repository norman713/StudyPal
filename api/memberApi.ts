import axiosInstance from "./axiosConfig";

export interface  Member {
  userId: string;
  name: string;
  role: string;
  avatarUrl: string;
}

interface MemberListResponse {
  members: Member[];
  nextCursor: string | null;
  total: number;
}
const memberApi= {
join(userId: string, teamCode: string){
    const url="/members?userId="+userId+"&teamCode="+teamCode;
    return axiosInstance.post(url, null,{
        params:{userId},
    })
},
getList(teamId: string, cursor: string, size: number): Promise<MemberListResponse> {
  let url = `members/all?teamId=${teamId}&size=${size}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  return axiosInstance.get(url);
},

 deleteMember(userId: string, teamId: string, memberId: string) {
  const url = "/members?userId=" + userId;
  return axiosInstance.delete(url, {
    data: {
      teamId: teamId,
      memberId: memberId
    }
  });
},

 leaveTeam(userId: string, teamId: string) {
  const url = "/members/leave?userId=" + userId+"&teamId=" +teamId;
  return axiosInstance.delete(url);
},

search(teamId:string,cursor: string, size: number, keyword:string){
  let url="members/search?teamId="+teamId+"&keyword="+keyword+ "&size"+ size;
       if(cursor.length===0){
            url +="&cursor="+ cursor;
        }
        return axiosInstance.get(url);
},
updateRole(userId: string, teamId: string, memberId: string, role: string) {
  const url = "/members?userId="+userId; // URL for updating the role
  return axiosInstance.patch(url, {
    userId: userId,
    teamId: teamId,
    memberId: memberId,
    role: role
  });
}

}     
export default memberApi;                                                                        