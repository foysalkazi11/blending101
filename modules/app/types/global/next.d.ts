import { NextPage } from "@/app/types/global/next";
import { ComponentType, ReactElement, ReactNode } from "react";

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  getLayout?: React.FC;
  layout?: ComponentType;
};
