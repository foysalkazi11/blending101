import CommunityCard from "@/spaces/partials/Shared/Community.component";
import { GET_MY_SPACES } from "@/spaces/spaces.graphql";
import { useQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import React from "react";

import styles from "@pages/spaces/joined.module.scss";

const MySpaces = () => {
  const { id } = useUser();

  const { data } = useQuery(GET_MY_SPACES, {
    variables: {
      userId: id,
    },
  });

  return (
    <div className={styles.myspace}>
      <div className="row">
        {data?.getAllSpaces?.map((space) => {
          const { _id, name, members, facilitators } = space;
          const users = members.length + facilitators.length;
          return (
            <div key={_id} className="col-4">
              <CommunityCard id={_id} name={name} members={users} isJoined />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySpaces;

MySpaces.meta = {
  sidebar: true,
  title: "Space",
  icon: "/icons/home.svg",
};
