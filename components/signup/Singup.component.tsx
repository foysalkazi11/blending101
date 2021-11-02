import React from 'react'

const Singup = () => {
    return (
        <section className="section-wrap user-auth-desk">
       <div className="flex-container">
           <div className="flex-item-right signup-right-bg">
               <div className="content-wrap-right">
                    <div className="img-wrap">
                        <img src="assets/images/logo.png" alt="logo" className="img-fluid" />
                    </div>
                    <h2 className="heading-wht">Already have an Account</h2>
                    <p className="text-wht">Aliquam vestibulum nunc quis blandit rutrum.<br />
                    Curabitur vel scelerisque leo.</p>
                    <div className="btn-wrap">
                    <a href="login.html" className="white-button">Login</a>
                    </div>
               </div>
           </div>
           <div className="flex-item-left signup-left-bg">
            <div className="content-wrap-left">
                 
                 <h2 className="heading-blk">Sign Up</h2>
                 <p className="text-blk">Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel<br />
                 scelerisque leo.</p>
                 <div className="form-wrap">
                     <form>
                         <div className="form-group">
                           <input type="email" className="form-control" placeholder="Email" />
                         </div>
                         <div className="form-group">
                           <input type="password" className="form-control" placeholder="Password" />
                             <span className="show-img">
                               <img src="assets/images/eye-icon.png" />
                             </span>
                         </div>
                         <div className="form-group">
                            <input type="password" className="form-control" placeholder="Confirm Password" />
                              <span className="show-img">
                                <img src="assets/images/eye-icon.png" />
                              </span>
                          </div>
                        
                         <div className="btn-wrap">
                             <button type="submit" className="orange-button">Sign Up</button>
                         </div>
                       
                       </form>
                 </div>
                 <div className="separator-login"></div>
                 <ul className="social-wrap">
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
       </div>
       <div className="footer-wrap">
           <p>Copywrite &copy; 2021 Blending 101</p>
       </div>
   </section> 
    )
}

export default Singup
