import React from "react";
import AuthScreen from "../theme/authScreen/authScreen.component";
// import InputComponent from "../theme/input/input.component";
// import InputField from "../theme/input/inputFeild.component";

export default function Login(props) {
  return (
    // <div>
    //   <InputComponent
    //     type=""
    //     style={{}}
    //     value=""
    //     setValue={undefined}
    //     placeholder={undefined}
    //     textarea={undefined}
    //     fullWidth={undefined}
    //     width={"100%"}
    //   />
    //   <InputField
    //     type="password"
    //     style={{}}
    //     value={undefined}
    //     placeholder={undefined}
    //     fullWidth={true}
    //   />
    //   <InputField
    //     type="text"
    //     style={{}}
    //     value={undefined}
    //     placeholder={undefined}
    //     fullWidth={true}
    //   />
    //   <InputField
    //     type="email"
    //     style={{}}
    //     value={undefined}
    //     placeholder={undefined}
    //     fullWidth={true}
    //   />
    // </div>
    <div>
        <AuthScreen type={"login"}/>
    </div>
  );
}
