import Image from "next/image";
import React from "react";
import styles from "./Event.module.scss";
import IconButton from "component/atoms/Button/IconButton.component";
import { faShare, faShareNodes } from "@fortawesome/pro-thin-svg-icons";

const EventCard = () => {
  return (
    <div className={styles.event}>
      <div className={styles.event__hero}>
        <img src="/background/juices.png" alt="Card" />
        <button className={styles.action__join}>$99.00</button>
      </div>
      <div className={styles.event__content}>
        <span>Nov 12 - Dec 10, 2020 7:00pm | 6 Sessions</span>
        <h5>30 Day Blending Challenge</h5>
      </div>
    </div>
  );
};

export default EventCard;
