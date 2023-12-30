import jwt from "jsonwebtoken";
const { sign } = jwt;

const resposeToken = async (username, roles) => {
  return sign({ username, roles }, "your-256-bit-secret", { expiresIn: "10h" });
};

export default resposeToken;
