import { SetStateAction, Dispatch as SetState } from "react";

declare global {
  type Dispatch<T> = SetState<SetStateAction<T>>;
  type Ref<T> = React.MutableRefObject<T>;
  interface Image {
    hash: string;
    url: string;
  }
  interface ImageType {
    image: string;
    default: boolean;
    hash?: string;
    url?: string;
  }
  interface TopIngredient {
    quantity?: number;
    label?: string;
    icon?: string;
  }
}

export {};
