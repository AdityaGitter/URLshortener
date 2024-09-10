const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/user/login");
  const user = await getUser(userUid);

  if (!user) return res.redirect("/user/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  if (userUid) {
    const user = await getUser(userUid);
    req.user = user;
  } else {
    req.user = null;
  }

  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
