import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AppLayout from "../../../components/layout/AppLayout";
import Card from "../../../components/shared/Card/Card";
import ProjectCard from "../../../components/shared/Card/ProjectCard/ProjectCard";
import Loader from "../../../components/shared/Loader/Loader";
import RichList from "../../../components/shared/RichList/RichList";
import Tag from "../../../components/shared/Tag/Tag";
import { useGetProjects } from "../../../hooks/useGetProjects";

export const ProjectsPage = () => {
  const projectsQuery = useGetProjects();
  const { push, query } = useRouter();
  const currentTag = query.tag || "All";
  const projects = projectsQuery.data?.result.data.allProjects.nodes;
  const tags = projectsQuery.data?.result.data.allTags.nodes;
  const onClickTag = tag => {
    push({ query: { ...query, tag } }, undefined, {
      shallow: true,
    });
  };
  const sortedProject =
    currentTag === "All"
      ? [...(projects || [])]
      : [...(projects || [])].filter(pr => pr.Tag === currentTag);
  return (
    <AppLayout
      title="Casper Network rich list"
      desc="Top holders and addresses of the Casper network"
    >
      {projectsQuery.isFetching || projectsQuery.isLoading ? (
        <div className="h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center">
            <Tag
              onClickTag={onClickTag}
              key="All"
              isSelected={"All" === currentTag}
              tag={{ tagName: "All", numOfItems: projects?.length || 0 }}
            />
            {tags?.map(tag => {
              return (
                <Tag
                  key={tag.tagName}
                  isSelected={tag.tagName === currentTag}
                  onClickTag={onClickTag}
                  tag={tag}
                />
              );
            })}
          </div>
          <div className="my-3 overflow-hidden">
            <div className="grid grid-cols-1 gap-4 mt-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {sortedProject?.map((project, index) => {
                return <ProjectCard key={index} project={project} />;
              })}
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
};

export default ProjectsPage;
