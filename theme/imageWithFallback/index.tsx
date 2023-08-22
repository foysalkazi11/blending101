import Image from "next/image";
import React, { ImgHTMLAttributes, useState } from "react";

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export const ImageWithFallback = ({
  fallbackSrc = "/cards/coriander.png",
  src,
  alt,
  ...props
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    if (!isError && fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsError(true);
    }
  };

  return <img src={imageSrc} alt={alt} onError={handleImageError} {...props} />;
};

import { ImageProps as NextImageProps } from "next/image";

interface ExtendedImageProps extends NextImageProps {
  fallbackSrc?: string;
}

export const NextImageWithFallback: React.FC<ExtendedImageProps> = ({
  alt,
  src,
  fallbackSrc = "/cards/coriander.png",
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    if (!isError && fallbackSrc) {
      setImageSrc(fallbackSrc);
      setIsError(true);
    }
  };

  return (
    <Image src={imageSrc} onError={handleImageError} alt={alt} {...props} />
  );
};
