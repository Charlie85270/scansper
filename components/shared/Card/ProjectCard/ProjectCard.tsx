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

  const re = /(<!--lang:en--> ).*( <!--lang:es--])/g;
  const desc = project?.Description?.replace(/\n|\r|(\n\r)/g, " ").match(re);
  const chaine =
    desc?.[0].replace("<!--lang:en-->", "").replace("<!--lang:es--]", "") || "";

  return (
    <a
      href={project.Website}
      target="_blank"
      className={classNames(
        "px-4 relative background-card hover:shadow-lg py-2 mt-2 border dark:border-gray-900 relative rounded-lg"
      )}
    >
      {project.Status.toString() === "Not Live - In Development" && (
        <p className="absolute top-0 right-0 p-1 text-xs text-white bg-indigo-600 rounded">
          Comming soon
        </p>
      )}
      <div className="flex items-center justify-center py-3 border-b dark:border-gray-900">
        <img className="rounded-lg max-w-40 max-h-12" src={img}></img>
      </div>

      <div className="flex-col items-center justify-between h-full my-2">
        <p className="text-xl text-primary"> {project.Name}</p>
        <p className="my-2 text-sm text-secondary">
          {chaine && chaine?.length > 0
            ? truncateString(chaine, 90)
            : "No description"}
        </p>
        <div className="block p-1 px-3 text-sm bg-gray-100 dark:bg-gray-900 text-primary w-fit rounded-xl">
          {project.Tag}
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
