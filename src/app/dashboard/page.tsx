"use client";
import React, { useEffect, useState } from "react";
import { Box, Divider, styled } from "@mui/material";
import Link from "next/link";
import Grid2 from "@mui/material/Unstable_Grid2";

const DotBallStyle = styled(Box)({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: "black",
});
const BoxSpaceStyle = styled(Box)({
  display: "inline-block",
  width: "50px",
  height: "50px",
});
const RowStyle = styled(Box)({
  display: "flex",
});
const ColumnStyle = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const HorizContainerStyle = styled(Box)({
  display: "inline-block",
  height: "10px",
  width: "25px",
  border: "2px",
});
const VertContainerStyle = styled(Box)({
  display: "inline-block",
  height: "25px",
  width: "10px",
  border: "2px",
});
const BoxStyle = styled(Box)({
  height: "25px",
  width: "25px",
});

const App = () => {
  const [boardSize, setBoardSize] = useState(5);
  const [turn, setTurn] = useState("red");
  const [lineCoordinates, setLineCoordinates] = useState<any>({});

  const initialBoard = () => {
    const lineCoordinates: any = {};
    const boxColors: any = {};

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < boardSize + 1; j++) {
        for (let k = 0; k < boardSize; k++) {
          lineCoordinates[`${i + "," + j + "," + k}`] = 0;
        }
      }
    }
    setLineCoordinates(lineCoordinates);
  };

  useEffect(() => {
    initialBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Função ao passar mouse por cima da area, marca com uma das cores, dependendo de qual é o jogador da vez.
   * @param event
   */
  const tint = (event) => {
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      if (turn === "red") {
        event.target.style.backgroundColor = "rgba(255,0,0,0.5)";
      } else {
        event.target.style.backgroundColor = "rgba(0,0,255,0.5)";
      }
    }
  };

  /**
   * Função ao tirar o mouse de cima da area, marca a area com cor 'Branca'.
   * @param event
   */
  const untint = (event) => {
    const currentCoord = event.target.dataset.coord;
    if (lineCoordinates[currentCoord] === 0) {
      event.target.style.backgroundColor = "rgb(255,255,255)";
    }
  };

  /**
   * Função de start do programa, onde montará o quadrado do jogo em tela.
   * @param boardSize Quantidade de quadrados em tela. Ex.: 5, será 5 quadrados com 6x6 pontos em tela
   * @returns
   */
  const makeBoard = (boardSize = 5) => {
    const cols = [];
    for (let row = 0; row <= 2 * boardSize; row++) {
      const rows = [];
      for (let column = 0; column <= 2 * boardSize; column++) {
        if (row % 2 === 0) {
          if (column % 2 === 0) {
            rows.push(<DotBallStyle />);
          } else {
            rows.push(
              <HorizContainerStyle
                data-coord={
                  "0," + Math.floor(row / 2) + "," + Math.floor(column / 2)
                }
                onMouseEnter={tint}
                onMouseLeave={untint}
              />
            );
          }
        } else {
          if (column % 2 === 0) {
            rows.push(
              <VertContainerStyle
                data-coord={
                  "1," + Math.floor(column / 2) + "," + Math.floor(row / 2)
                }
                onMouseEnter={tint}
                onMouseLeave={untint}
              />
            );
          } else {
            rows.push(<BoxStyle />);
          }
        }
      }
      cols.push(<RowStyle key={`{row-${row}}`}>{rows}</RowStyle>);
    }
    return <ColumnStyle>{cols}</ColumnStyle>;
  };

  return (
    <Grid2 container spacing={1}>
      <Grid2 xs={12}>
        <Link href="/">Home</Link>
        <Divider />
      </Grid2>
      <Grid2 xs={12}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {makeBoard(boardSize)}
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default App;
