const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token expired" });
  }
};
module.exports = verifyToken;