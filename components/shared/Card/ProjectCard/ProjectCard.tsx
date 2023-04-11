import classNames from "classnames";
import React from "react";
import { AllProjectsNode, AllTagsNode } from "../../../../types/projects";
import { truncateString } from "../../../../utils/Utils";

interface IProjectCardProps {
  project: AllProjectsNode;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
  const img = project?.childrenFile[0]?.childImageSharp?.gatsbyImageData?.images
    ?.fallback?.src
    ? `https://casperecosystem.io${project?.childrenFile[0]?.childImageSharp?.gatsbyImageData?.images?.fallback?.src}`
    : "/defaultNFT.png";

  const re = /(?<=<!--lang:en--> ).*(?= <!--lang:es--])/g;
  const chaine = project?.Description?.replace(/\n|\r|(\n\r)/g, " ") || "";
  const desc = chaine.match(re);

  return (
    <a
      href={project.Website}
      target="_blank"
      className={classNames(
        "px-4 bg-white hover:shadow-lg py-2 mt-2 border relative rounded-lg"
      )}
    >
      <div className="flex items-center justify-center py-3 border-b">
        <img className="rounded-lg max-w-40 max-h-12" src={img}></img>
      </div>

      <div className="flex-col items-center justify-between h-full my-2">
        <p className="text-xl text-gray-800"> {project.Name}</p>
        <p className="my-2 text-sm text-gray-400">
          {desc && desc?.length > 0
            ? truncateString(desc[0], 90)
            : "No description"}
        </p>
        <div className="block p-1 px-3 text-sm text-gray-800 bg-gray-100 w-fit rounded-xl">
          {project.Tag}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
