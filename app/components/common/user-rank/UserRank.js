import React from "react";
import { Container } from "./UserRank.styled";

function setRankList(level) {
  const rankList = [];
  let levels = [1, 4, 16, 64, 256, 1024, 4096, 16384];
  let maxLevel = 0;
  // let level = Math.ceil(count / 10 || 1);
  // this._level = level;

  for (let i = 0; i < levels.length; i++) {
    if (level < levels[i]) {
      maxLevel = levels[i - 1];
      break;
    }
  }

  while (level >= maxLevel) {
    let max = maxLevel;
    rankList.push(convertRankToType(max));
    level -= max;
  }

  return rankList;
}

function convertRankToType(level) {
  switch (level) {
    case 4096:
      return "ts";
    case 1024:
      return "tb";
    case 256:
      return "rc";
    case 64:
      return "yc";
    case 16:
      return "bd";
    case 4:
      return "yd";
    case 1:
      return "star";
  }
}

export default function UserRank(props) {
  const { count } = props;
  const level = Math.ceil(count / 10 || 1);

  const rankList = setRankList(level);

  return (
    <Container>
      {rankList.map((rank, idx) => (
        <li key={idx} className={rank} />
      ))}
    </Container>
  );
}
