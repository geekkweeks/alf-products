const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) res.status(401).json({ errors: "Invalid Roles" }).end();
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) res.status(401).json({ errors: "Invalid Roles" }).end();
    next();
  };
};
