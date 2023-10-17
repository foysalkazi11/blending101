const routes = Object.freeze({
  login: "/login",
  signup: "/auth/signup",
  auth: {
    verification: "/auth/verification",
  },
  user: {
    profile: "/user/profile",
  },
  plan: {
    discovery: "/planner",
    myPlan: "/planner/plan",
    details: "",
  },
});

export default routes;
