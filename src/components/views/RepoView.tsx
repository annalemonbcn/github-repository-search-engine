// Types
import { Repo } from "../../types"

// Utils
import { formatDate } from "../utils/func/reposUtils";
import StarIcon from "../utils/svg/StarIcon";
import TopicBadge from "../utils/buttons/TopicBadge";

/**
 * prop for the RepoView comp
 */
interface RepoViewProps {
  repo: Repo;
}

const RepoView = ({ repo }: RepoViewProps) => {

  // Props
  const {
    name,
    description,
    repositoryTopics,
    primaryLanguage,
    stargazerCount,
    updatedAt,
  } = repo;

  // Format date
  const formattedUpdated_at = formatDate(updatedAt);

  return (
    <div className="flex flex-col items-start gap-1 p-4 border border-custom-black rounded-md repositoryCard">
      <div className="flex items-center gap-2 text-left">
        <a className="font-semibold hover:text-custom-blue hover:underline" href={`https://github.com/${name}`}>
          {name}
        </a>
      </div>
      <div className="text-sm text-left">{description}</div>
      {repositoryTopics.nodes.length > 0 && (
        <div className="flex flex-wrap gap-2 md:gap-4 my-2">
          {repositoryTopics.nodes.map((topic, index) => (
            <TopicBadge key={index} text={topic.topic.name} url={topic.url} />
          ))}
        </div>
      )}
      <div className="text-sm flex items-center gap-2">
        {primaryLanguage?.name && (
          <span className="flex items-center gap-1 font-semibold">
            {primaryLanguage.name} <span>·</span>
          </span>
        )}

        <span className="flex items-center gap-1">
          {<StarIcon />}
          {stargazerCount}
        </span>
        <span>·</span>
        <span className="text-left"><span className="text-xs md:text-sm">Updated on </span>{formattedUpdated_at}</span>
      </div>
    </div>
  )
}

export default RepoView
