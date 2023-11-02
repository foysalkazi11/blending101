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
  spaces: {
    discovery: "/spaces",
    joined: "/spaces/joined",
    feeds: "/spaces/feeds",
    details: "/spaces/space/id/page",
  },
});

export default routes;
