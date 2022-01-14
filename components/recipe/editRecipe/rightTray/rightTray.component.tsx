import React from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Accordion from "../../../../theme/accordion/accordion.component";
import Image from "next/image";
import {healthList} from './rightTray'
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";


interface PassingProps {
    name: string;
    percent: number;
  }
const rightTray = () => {
  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__title}>Nutrition</div>
        <div className={styles.right__sub_heading}>
          Amount Per Servings Calories
        </div>
        <div className={styles.right__calories}>
          <h4>Calories</h4>
          <h3>93</h3>
          <div className={styles.right__userIcon}>
            <Image
              src={"/images/user-profile.png"}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <hr />
        <div className={styles.right__subheader}>
          <div className={styles.right__subheader__value}>Value</div>
          <div className={styles.right__subheader__daily}>Daily %</div>
        </div>
        <div className={styles.compoent__box} style={{}}>
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
      <div className={styles.right}>
        <div className={styles.right__title}>Health</div>
        <div className={styles.right__sub_heading}>
          Disease, Condition and Systems
        </div>
        <div className={styles.compoent__box} style={{}}>
        {healthList.map(({ name, percent }: PassingProps, index) => {
            return (
              <LinearComponent name={name} percent={percent} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default rightTray;
