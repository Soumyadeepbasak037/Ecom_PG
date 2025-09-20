function roleMiddleware(allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // usually set after JWT/session authentication

    if (!user || !allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: insufficient role" });
    }

    next();
  };
}

export default roleMiddleware;
