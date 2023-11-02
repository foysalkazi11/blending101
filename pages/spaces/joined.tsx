import React, { useState } from "react";

import styles from "@pages/spaces/joined.module.scss";
import CommunityCard from "@/spaces/partials/Shared/Community.component";
import EventCard from "@/spaces/partials/Shared/Event.component";
import Icon from "component/atoms/Icon/Icon.component";
import { faCalendarDays, faPager, faSearch, faSliders, faUser } from "@fortawesome/pro-solid-svg-icons";

import { GET_MY_SPACES } from "@/spaces/spaces.graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import routes from "routes";
import { useUser } from "context/AuthProvider";
import { faTableCellsLarge } from "@fortawesome/pro-thin-svg-icons";
import Meetups from "@/spaces/templates/meetups/Meetups.component";

const Space = () => {
  const { id } = useUser();
  const { data } = useQuery(GET_MY_SPACES, {
    variables: {
      userId: id,
    },
  });

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-6">
        <div className={styles.wrapper}>
          <div className={styles.menu}>
            <div className={styles.menu__filter}>
              <button className={styles.menu__button}>
                <Icon fontName={faSliders} size={16} /> Filter
              </button>
              <button className={styles.menu__search}>
                <Icon fontName={faSearch} size={16} />
              </button>
            </div>
            <div className={styles.tabMenu}>
              <Link href="">
                <Icon fontName={faPager} size={16} /> Feed
              </Link>
              <Link href="">
                Card <Icon fontName={faTableCellsLarge} size={16} />
              </Link>
            </div>
            <Link href={routes.spaces.joined} className={styles.menu__button}>
              <Icon fontName={faCalendarDays} size={16} />
              Discovery
            </Link>
          </div>
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
      </div>
      <div className="col-4" style={{ padding: 0 }}>
        <div className={styles.meetups}>
          <Meetups />
        </div>
      </div>
    </div>
  );
};

export default Space;

Space.meta = {
  sidebar: true,
  title: "Space",
  icon: "/icons/home.svg",
};
