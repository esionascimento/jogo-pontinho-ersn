"use client";
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import Link from "next/link";

const DotBallStyle = styled(Box)({
  display: "inline-block",
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

const App = () => {
  const [boardSize] = useState(4);

  const makeBoard = (boardSize = 5) => {
    const cols = [];
    for (let row = 0; row <= 2 * boardSize; row++) {
      const rows = [];
      for (let column = 0; column <= 2 * boardSize; column++) {
        if (row % 2 === 0) {
          if (column % 2 === 0) {
            rows.push(<DotBallStyle />);
          } else {
            rows.push(<BoxSpaceStyle />);
          }
        }
      }
      cols.push(<RowStyle key={`{row-${row}}`}>{rows}</RowStyle>);
    }
    return <ColumnStyle>{cols}</ColumnStyle>;
  };

  return (
    <Box>
      <Box>{makeBoard(boardSize)}</Box>
      <Box m={5}>
        <Link href="/">Home</Link>
      </Box>
    </Box>
  );
};

export default App;
