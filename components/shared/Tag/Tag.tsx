import classNames from "classnames";
import React from "react";
import { AllTagsNode } from "../../../types/projects";

interface ITagProps {
  onClickTag: (tag: string) => void;
  tag: AllTagsNode;
  isSelected?: boolean;
}

const Tag = ({ tag, onClickTag, isSelected }: ITagProps) => {
  return (
    <button
      className={classNames(
        {
          "bg-indigo-600 text-white": isSelected,
          "bg-white": !isSelected,
        },
        "px-4 py-2 mt-2  mr-2 border rounded-lg"
      )}
      onClick={() => onClickTag(tag.tagName)}
    >
      {tag.tagName}
      <span
        className={classNames(
          { "text-white": isSelected },
          "text-sm text-gray-400"
        )}
      >
        {" "}
        ({tag.numOfItems})
      </span>
    </button>
  );
};

export default Tag;
