import React from "react";
import { QuackContentType } from "../types";
import { parse } from "../utils/quackContentParser";

export const QuackContent: React.FC<QuackContentType> = ({ text }) => {
  return <>{parse(text).map((e) => e)}</>;
};
