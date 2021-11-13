import React from "react";
import DragAndDrop from "../../theme/dragAndDrop/DragAndDrop.component";
import styles from "../../styles/component.module.scss";
import Carousel from "../../theme/carousel/carousel.component";
import SmallcardComponent from "../../theme/cards/smallCard/SmallCard.component";
import { Container } from "@mui/material";

//responsive crousel Setting

const responsiveSetting = {
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

const index = () => {
  return (
    <Container maxWidth="xl">
      <div className={styles.compoent__box}>
        <h3>DRAG AND DROPS</h3>
        <DragAndDrop />
      </div>
      <div className={styles.compoent__box}>
        <h3>Responsive Carousel</h3>

        <Carousel moreSetting={responsiveSetting}>
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
          />
        </Carousel>
      </div>
    </Container>
  );
};

export default index;
