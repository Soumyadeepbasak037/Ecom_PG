function roleMiddleware(req, res, next) {
  const user = req.user;

  if (!user || !user.is_admin) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next();
}

export default roleMiddleware;
