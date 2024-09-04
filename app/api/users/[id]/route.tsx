// import { NextResponse } from "next/server";
// const users = [
//   {
//     id: 1,
//     name: "Đình Dương",
//     address: "HN",
//   },
//   {
//     id: 2,
//     name: "Đình Dương",
//     address: "DN",
//   },
//   {
//     id: 3,
//     name: "Đình Dương",
//     address: "HCM",
//   },
// ];
// export async function GET(req: any, res: any) {
//   let find = users.find((item) => {
//     return item.id == +res.params.id;
//   });
//   const { params } = res;
//   return NextResponse.json({ message: find ? find : "không tìm thấy" });
// }

// export async function PUT(request: any) {
//   const data = await request.json();
//   console.log("1111", data);

//   return NextResponse.json({
//     massage: "Cập nhật user thành công",
//     users: data,
//   });
// }

// export async function PATCH(request: any) {
//   const data = await request.json();
//   console.log("1111", data);

//   return NextResponse.json({
//     massage: "Cập nhật user thành công",
//     users: data,
//   });
// }

// export async function DELETE(request: any) {
//   const data = await request.json();
//   console.log("1111", data);

//   return NextResponse.json({
//     massage: "Xóa user thành công",
//     users: data,
//   });
// }

import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function PUT(
  request: NextRequest,
  params: { params: { id: string } }
) {
  try {
    // B1: lấy vị trí file cần đọc
    const filePath = path.join(process.cwd(), "database", "users.json");

    // B2: tìm kiếm vị trí phần tử cần cập nhật
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // B3: gán lại giá trị cho phần tử cần cập nhật
    const userIndex = users.findIndex(
      (user: any) => user.id == +params.params.id
    );

    if (userIndex !== -1) {
      users[userIndex].name = "Hùng";
    }

    // B4: ghi file
    fs.writeFileSync(filePath, JSON.stringify(users), "utf8");
    // B5: trả về dữ liệu cho client
    return NextResponse.json("dữ liệu thành công");
  } catch (er) {
    return NextResponse.json("dữ liệu thất bại");
  }
}
