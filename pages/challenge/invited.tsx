import { useQuery } from "@apollo/client";
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Icon from "../../component/atoms/Icon/Icon.component";
import { GET_SHARED_CHALLENGE_DETAILS } from "../../graphql/Challenge";

import styles from "../../styles/pages/challenge.module.scss";

const Invited = () => {
  const router = useRouter();
  const { data } = useQuery(GET_SHARED_CHALLENGE_DETAILS, {
    variables: {
      challengeId: router.query?.id,
    },
  });

  const onViewChallenge = (e) => {
    router.push(
      `/challenge?id=${router.query?.id}&token=${router.query?.token}`,
    );
  };

  // if (!router.query?.id || !router.query?.token) return <></>;
  return (
    <Fragment>
      <header className={styles.invited__header}>
        <img src="/logo.png" alt="" />
      </header>
      <main className={styles.invited__main}>
        <div className="row">
          <div className="col-8">
            <h1>
              {data?.getChallengeInfoById?.memberInfo?.displayName || "Gabriel"}{" "}
              has invited you to join a Poily Challenge!
            </h1>
            <p>
              Join the{" "}
              <span>&quot;Team Tiger 30 Day Blending Challenge&quot;</span>.
              Track and visualize your daily blending habit with ease.
            </p>
            <button onClick={onViewChallenge}>Join Challenge</button>
            <div style={{ textAlign: "center" }}>
              <h3>{data?.getChallengeInfoById?.challengeName}</h3>
              <div className={styles.invited__preview}>
                <img src="/images/challenge.jpg" alt="Challenge Preview" />
              </div>
            </div>
          </div>
          <div className="col-4" style={{ position: "relative" }}>
            <img
              src="/images/top-ingredients.png"
              alt=""
              className={styles.invited__main_ing}
            />
            <img
              src="/images/scnd_phone.png"
              alt=""
              className={styles.invited__main_mockup}
            />
            <img
              src="/images/leaderboard.svg"
              alt=""
              className={styles.invited__main_leader}
            />
          </div>
        </div>
      </main>
      <footer className={styles.invited__footer}>
        <div className={styles.invited__footer_bg}></div>
        <div className={styles.invited__footer_social}>
          <Icon className="mr-20" fontName={faFacebook} size={24} />
          <Icon className="mr-20" fontName={faInstagram} size={24} />
          <Icon className="mr-20" fontName={faTwitter} size={24} />
          <Icon className="mr-20" fontName={faYoutube} size={24} />
          <Icon className="mr-20" fontName={faPinterest} size={24} />
          <Icon fontName={faTiktok} size={24} />
          <p>© 2022 Blending101 - 2022</p>
        </div>
        <img src="/images/footer-img.png" alt="" />
      </footer>
    </Fragment>
  );
};

export default Invited;
