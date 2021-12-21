import { useState } from "react";

import HomeComponent from "../components/home/Home";

export default function Home() {
  const [state, setState] = useState("desktop");

  return <HomeComponent />;
}
