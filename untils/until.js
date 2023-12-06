import jwt from 'jsonwebtoken'
import multer from "multer";
import path from "path";

//xác thực và bảo mật thông tin người dùng
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET || "ngquangvinh",
    {
      expiresIn: "30d",
    }
  );
};

//kiểm tra ng dùng đăng nhập hay chưa
export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "ngquangvinh",
      (err, decode) => {
        if (err) {
          res.status.send({ message: "invalid token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "no token" });
  }
};

//kiểm tra quyền admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "invalid admin token" });
  }
};


//kiểm tra tệp tải lên
export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});


//ghim comment(chuyển phần tử từ fromIndex đến toIndex)
export function PinComment(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);//loại bỏ phần tử fromIndex
  arr.splice(toIndex, 0, element);//chèn element tại vị trí to index

  return arr;
}


