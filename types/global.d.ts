declare global {
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
