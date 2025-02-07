function roleMiddleware(requiredRole) {
  return (req, res, next) => {
      const userRole = req.user?.role;
z
      if (!userRole) {
          return res.status(401).json({ error: "Not authenticated" });
      }

      if (userRole !== requiredRole) {
          return res.status(403).json({ error: "Access denied: insufficient permissions" });
      }

      next();
  };
}

module.exports = roleMiddleware;
