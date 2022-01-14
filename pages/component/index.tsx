import React from "react";
import DragAndDrop from "../../theme/dragAndDrop/DragAndDrop.component";
import styles from "../../styles/component.module.scss";
import Carousel from "../../theme/carousel/carousel.component";
import SmallcardComponent from "../../theme/cards/smallCard/SmallCard.component";
import Accordion from "../../theme/accordion/accordion.component";
import { Container } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

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
    <div className={styles.component__container}>
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
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined} recipe={undefined} findCompareRecipe={undefined} fucUnCheck={undefined} conpareLength={undefined}          />
        </Carousel>
      </div>

      <div className={styles.compoent__box} style={{ width: "33%" }}>
        <h3>Accordion</h3>

        <Accordion title="Energy">
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  "& .MuiTableCell-root": { padding: "10px 10px 10px 0px" },
                }}
              >
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Total Carbohydrates</TableCell>
                  <TableCell>39.2 g</TableCell>
                  <TableCell>12%</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Dietary Fiber</TableCell>
                  <TableCell>15.6 g</TableCell>
                  <TableCell>12%</TableCell>
                </TableRow>

                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>Sugars Protein</TableCell>
                  <TableCell>6.4 g</TableCell>
                  <TableCell> 8%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Accordion>

        <Accordion title="Vitamins">
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  "& .MuiTableCell-root": { padding: "10px 10px 10px 0px" },
                }}
              >
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> Vitamin A </TableCell>
                  <TableCell> 30.202 iu </TableCell>
                  <TableCell> 597% </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell> Vitamin B </TableCell>
                  <TableCell> 480 mg </TableCell>
                  <TableCell> 356% </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Accordion>

        <Accordion title="Minerals">
          <TableContainer>
            <Table>
              <TableBody
                sx={{
                  "& .MuiTableCell-root": { padding: "10px 10px 10px 0px" },
                }}
              >
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell> Potassium </TableCell>
                  <TableCell> 296 mg </TableCell>
                  <TableCell> 32% </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell> Iron </TableCell>
                  <TableCell> 9 mg </TableCell>
                  <TableCell> 39% </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell> Calcium </TableCell>
                  <TableCell> 600 mg </TableCell>
                  <TableCell> 232% </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Accordion>
      </div>
    </div>
  );
};

export default index;
