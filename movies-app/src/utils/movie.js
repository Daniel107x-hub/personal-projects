import { BiSolidStar, BiSolidStarHalf } from "react-icons/bi";

export function getScoreStars(votes){
    const score = votes / 2;
    const intPart = Math.floor(score);
    const hasDecimalPart = (score * 10) % 10 > 0;
    let scoreIcons = [];
    for (let index = 0; index < intPart; index++)
        scoreIcons.push(<BiSolidStar key={index} />);
    if (hasDecimalPart) scoreIcons.push(<BiSolidStarHalf key={intPart} />);
    return scoreIcons;
}