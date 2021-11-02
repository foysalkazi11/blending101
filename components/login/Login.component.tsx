import React from 'react'
import styles from './Login.module.scss'

const Login = () => {
    return (
        <section className={styles.section_wrap }>
         <div className={styles.flex_container}>
            <div className={styles.flex_item_left}>
               <div className={styles.content_wrap_left}>
                  <div className={styles.img_wrap}>
                     <img src="assets/images/logo.png" alt="logo" className={styles.img_fluid} />
                  </div>
                  <h2 className={styles.heading_blk}>Login</h2>
                  <p className={styles.text_blk}>Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel<br />
                    scelerisque leo.
                  </p>
                  <div className={styles.form_wrap}>
                     <form>
                        <div className={styles.form_group}>
                           <input type="email" className={styles.form_control} placeholder="Email" />
                        </div>
                        <div className={styles.form_group}>
                           <input type="password" className={styles.form_control} placeholder="Password" />
                           <span className={styles.show_img}>
                           <img src="assets/images/eye_icon.png" />
                           </span>
                        </div>
                        <div className={styles.form_group}>
                           <a className={styles.forget_text} href="forget_password.html">Forget password?</a>
                        </div>
                <button type="submit" className={styles.orange_button}>Login</button>

                     </form>
                  </div>
                  <div className={styles.separator_login}></div>
                <ul className={styles.social_wrap}>
                     <li>
                        <a href="#"><img src="assets/images/google.png" /></a>
                     </li>
                     <li>
                        <a href="#"><img src="assets/images/fb.png" /></a>
                     </li>
                     <li>
                        <a href="#"><img src="assets/images/twitter.png" /></a>
                     </li>
                     <li>
                        <a href="#"><img src="assets/images/apple.png" /></a>
                     </li>
                  </ul>
               </div>
            </div>
            <div className={`${styles.flex_item_right} ${styles.login_right_bg}`}>
               <div className={styles.content_wrap_right}>
                  <h2 className={styles.heading_wht}>New User</h2>
                  <p className={styles.text_wht}>Aliquam vestibulum nunc quis blandit rutrum.<br />
                     Curabitur vel scelerisque leo.
                  </p>
                  <a href="signup.html" className={styles.white_button}>Sign up</a>
               </div>
            </div>
         </div>
         <div className={styles.footer_wrap}>
            <p>Copywrite &copy; 2021 Blending 101</p>
         </div>
      </section>
    )
}

export default Login
