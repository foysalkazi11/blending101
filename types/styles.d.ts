// For SCSS
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

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
