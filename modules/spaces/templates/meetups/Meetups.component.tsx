import React, { useState } from "react";

import styles from "./Meetups.module.scss";
import Icon from "component/atoms/Icon/Icon.component";
import { faCircleChevronRight, faPlus, faSearch, faCalendarDays } from "@fortawesome/pro-solid-svg-icons";
import ToggleCard from "theme/toggleCard/toggleCard.component";

const Meetups = () => {
  const [toggler, setToggler] = useState(true);

  return (
    <div className={styles.meetups}>
      <div className={styles.meetups__header}>
        <h2>Meetups</h2>
        <div className={styles.meetups__actions}>
          <button>
            <Icon fontName={faSearch} size={15} />
          </button>
          <button>
            <Icon fontName={faCalendarDays} size={15} />
          </button>
          <button>
            <Icon fontName={faPlus} size={15} />
          </button>
        </div>
      </div>
      <div className={styles.meetups__content}>
        <ToggleCard
          noRoute
          toggler={toggler}
          setTogglerFunc={setToggler}
          leftToggleHeading="Scheduled"
          rightToggleHeading="Past"
          headingStyle={{
            padding: "15px 5px",
          }}
        />
        <div className={styles.meetups__items}>
          <Meetup />
          <Meetup />
          <Meetup />
        </div>
      </div>
    </div>
  );
};

const Meetup = () => {
  return (
    <div className={styles.meetup}>
      <h3>30 Day Blending Challenge: Season 3</h3>
      <p>Hands on creating Refreshing drink and prepping strategies for busy people.</p>
      <span>Now, Today</span>
      <button>
        Join Now
        <Icon fontName={faCircleChevronRight} size={20} />
      </button>
    </div>
  );
};

export default Meetups;
