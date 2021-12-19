// export const awsconfig = {
//   aws_project_region: "us-east-1", // REGION
//   aws_cognito_region: "us-east-1", // REGION
//   aws_user_pools_id: "us-east-1_4715wq6ef", // ENTER YOUR USER POOL ID
//   aws_user_pools_web_client_id: "1qef45v3tsmqlt0v7kmarj9dii", // ENTER YOUR
//   aws_project_region: "us-east-2", // REGION
//   aws_cognito_region: "us-east-2", // REGION
//   aws_user_pools_id: "us-east-2_v2nak5mao", // ENTER YOUR USER POOL ID
//   aws_user_pools_web_client_id: "2h0rtfsn7rg3joc93a546b2h70", // ENTER YOUR CLIENT ID
// };

const awsConfig = {
  aws_project_region: "us-east-1", // REGION
  aws_cognito_region: "us-east-1", // REGION
  aws_user_pools_id: "us-east-1_4715wq6ef", // ENTER YOUR USER POOL ID
  aws_user_pools_web_client_id: "1qef45v3tsmqlt0v7kmarj9dii", // ENTER YOUR CLIENT ID
  oauth: {
    domain: "blending-test-pool.auth.us-east-1.amazoncognito.com", // ENTER COGNITO DOMAIN LIKE: eru-test-pool.auth.eu-west-1.amazoncognito.com
    scope: ["phone", "email", "openid", "profile"],
    redirectSignIn: "http://localhost:3000/login", // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    redirectSignOut: "http://localhost:3000/login", // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
};
export default awsConfig;
