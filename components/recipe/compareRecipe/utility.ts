export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const formulateRecipeResponsiveSetting = (length: number) => {
  let slidesToShow = 3;
  switch (length) {
    case 1:
      slidesToShow = 1;
      break;
    case 2:
      slidesToShow = 2;
      break;
    default:
      slidesToShow;
      break;
  }
  return {
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: false,
    arrows: false,
    infinite: false,
    swipe: false,
    // afterChange: (num) => console.log("afterChange", num),
    // beforeChange: (num1, num2) => console.log("befourChange", num1, num2),

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: length === 1 ? 1 : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
};
export const compareRecipeResponsiveSetting = {
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: false,
  arrows: false,
  infinite: false,
  // afterChange: (num) => console.log("afterChange", num),
  // beforeChange: (num1, num2) => console.log("befourChange", num1, num2),

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const responsiveSetting = {
  slidesToShow: 7,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
