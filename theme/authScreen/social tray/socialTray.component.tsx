import React, { useState } from "react";
import styles from "./socialTray.module.scss";
import Image from "next/image";
import Link from "next/link";

const SocialTray = () => {
    return (
        <ul className={styles.socialWrap}>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/google.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/fb.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="/login">
                    <a style={{}}>
                      <Image
                        src={"/images/twitter.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/apple.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
              </ul>
    )
}

export default SocialTray
