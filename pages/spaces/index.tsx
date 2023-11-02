import React, { useState } from "react";

import styles from "@pages/spaces/discovery.module.scss";
import CommunityCard from "@/spaces/partials/Shared/Community.component";
import EventCard from "@/spaces/partials/Shared/Event.component";
import Icon from "component/atoms/Icon/Icon.component";
import { faSearch, faSliders, faUser } from "@fortawesome/pro-solid-svg-icons";

import { GET_ALL_SPACES } from "@/spaces/spaces.graphql";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import routes from "routes";

const Space = () => {
  const { data } = useQuery(GET_ALL_SPACES);
  return (
    <div className="mb-30">
      <div className={styles.hero}>
        <div className={styles.hero__box}>
          <h2>Blending101 Spaces</h2>
          <p>Where you learn to blend life into your lifestyle</p>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__data}>
          <div className={styles.menu}>
            <div className={styles.menu__filter}>
              <button className={styles.menu__button}>
                <Icon fontName={faSliders} size={16} /> Filter
              </button>
              <button className={styles.menu__search}>
                <Icon fontName={faSearch} size={16} />
              </button>
            </div>
            <Link href={routes.spaces.joined} className={styles.menu__button}>
              <Icon fontName={faUser} size={16} /> My Spaces
            </Link>
          </div>
          <div className={styles.discovery}>
            <div>
              <h3 className={styles.headline}>Featured Communities</h3>
              <div className="row">
                {data?.getAllSpaces?.map((space) => {
                  const { _id, name, members, facilitators } = space;
                  const users = members.length + facilitators.length;
                  return (
                    <div key={_id} className="col-3">
                      <CommunityCard id={_id} name={name} members={users} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-30 mb-30">
              <h3 className={styles.headline}>Upcoming Events</h3>
              <div className="row">
                <div className="col-3">
                  <EventCard />
                </div>
                <div className="col-3">
                  <EventCard />
                </div>
                <div className="col-3">
                  <EventCard />
                </div>
                <div className="col-3">
                  <EventCard />
                </div>
              </div>
            </div>
          </div>
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
