import { SetStateAction, Dispatch as SetState } from "react";

declare global {
  type Dispatch<T> = SetState<SetStateAction<T>>;
  interface Image {
    hash: string;
    url: string;
  }
  interface ImageType {
    image: string;
    default: boolean;
  }
}

export {};
