import jwt from "jsonwebtoken";
const { verify } = jwt;

const checkRoles = (array, decoded) => {
  const arrayAc = array.toString();
  const roles = decoded.roles.split(", ");

  return roles.includes(arrayAc);
};

const authenticateToken = (array) => {
  return async (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Không có token được cung cấp." });
    }

    verify(token.split(" ")[1], "your-256-bit-secret", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token không hợp lệ." });
      }

      if (!checkRoles(array, decoded))
        return res.status(401).json({ message: `Failed: UNAUTHORIZED!` });

      req.user = decoded;

      next();
    });
  };
};

export default authenticateToken;
