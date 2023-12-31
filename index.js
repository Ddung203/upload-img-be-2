import express from "express";
import {} from "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import options from "./src/configs/cors.js";
import Data from "./src/model/Data.js";
import Auth from "./src/model/Auth.js";
import authenticateToken from "./src/middlewares/authenticateToken.js";
import resposeToken from "./src/services/resposeToken.js";
const app = express();
const port = process.env.PORT || 8080;

app.use(cors(options));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json("Hello World!");
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundAuthUser = await Auth.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    if (foundAuthUser) {
      const token = await resposeToken(
        foundAuthUser.username,
        foundAuthUser.roles
      );
      return res.status(200).json({
        username: foundAuthUser.username,
        roles: foundAuthUser.roles,
        token,
      });
    } else throw new Error("Không tìm thấy user");
  } catch (error) {
    const { username, password } = req.body;

    return res.status(200).json({
      error: error.message,
      username,
      password,
    });
  }
});

app.post("/api/check", authenticateToken(["admin"]), async (req, res) => {
  try {
    const { code } = req.body;

    const user = await Data.findOne({
      where: {
        userCode: code,
      },
    });

    if (user) {
      return res.status(404).json({
        code,
        message: "Thông tin user bị trùng!",
      });
    }

    return res.status(200).json({
      code,
      message: "Không tìm thấy thông tin của user!",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    const { code } = req.body;
    return res.status(404).json({
      code,
      message: "Tìm kiếm xảy ra lỗi!",
    });
  }
});

app.post("/api/send", authenticateToken(["admin"]), async (req, res) => {
  try {
    const { code, fullname, note, url } = req.body;

    const newUser = await Data.create({
      userCode: code,
      fullname: fullname,
      note,
      url,
    });

    return res.status(200).json({
      newUser,
      message: "Đã thêm mới thông tin!",
    });
  } catch (error) {
    console.error("  >> Lỗi khi thêm mới:", error);
    const { url } = req.body;
    return res.status(404).json({
      url,
      message: "Thông tin user có lỗi!",
    });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
