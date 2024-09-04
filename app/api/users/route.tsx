import { NextRequest, NextResponse } from "next/server";
// import dùng để tương tác với file
import fs from "fs";
import path from "path";

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
export async function GET() {
  try {
    // B1: lấy ra đường dẫn file cần đọc
    const filePath = path.join(process.cwd(), "database", "users.json");
    // B2: sư dụng fs để đọc ghi file
    const data = fs.readFileSync(filePath, "utf8");
    // B3: ép kiểu sử dụng dạng json sang ts
    const users = JSON.parse(data);
    // trả về dữ liệu cho phái clienr
    return NextResponse.json({ data: users });
  } catch (er) {
    return NextResponse.json(er);
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    // B1: lấy dữ liệu từ phía client
    const userRequest = await request.json();

    // B2: lấy ra dường dẫn của file cần ghi
    const filePath = path.join(process.cwd(), "database", "users.json");

    // B3: Đọc file cần ghi vào
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // B4: Push dữ liệu vào trong mảng
    users.push(userRequest);

    // B5: ghi file
    fs.writeFileSync(filePath, JSON.stringify(users), "utf8");
    // B6: trả về dữ liệu cho client
    return NextResponse.json("dữ liệu thành công");
  } catch (er) {
    return NextResponse.json("dữ liệu thất bại");
  }
}

// export async function POST(request: any) {
//   const data = await request.json();
//   console.log("1111", data);

//   return NextResponse.json({ massage: "thêm user thành công", users: data });
// }
