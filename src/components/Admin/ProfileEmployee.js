import React from "react";
import { profileEmployeeState } from "../Store/recoil";
import { useRecoilState } from "recoil";

function ProfileEmployee(props) {
  const [profileEmployee, setProfileEmployee] =
    useRecoilState(profileEmployeeState);
  console.log(profileEmployee);
  return (
    <div className="">
      <div>
        <div className="flex text-[18px] mb-4">
          <h1 className="mr-8"> Hình ảnh:</h1>
          <img src={profileEmployee.avatar} width="150px"></img>
        </div>
        <h1 className="flex text-[18px] mb-4">{`Mã: ${profileEmployee.id}`}</h1>
        <h1 className="flex text-[18px] mb-4">{`Họ và tên: ${profileEmployee.fullName}`}</h1>
        <h1 className="flex text-[18px] mb-4">{`Địa chỉ: ${profileEmployee.address}`}</h1>
        <h1 className="flex text-[18px] mb-4">{`Ngày sinh: ${profileEmployee.dateOfBirth}`}</h1>
        <h1 className="flex text-[18px] mb-4">{`Mật khẩu: ${profileEmployee.password}`}</h1>
        <h1 className="flex text-[18px] mb-4">{`Số điện thoại: ${profileEmployee.phoneNumber}`}</h1>
      </div>
    </div>
  );
}

export default ProfileEmployee;
