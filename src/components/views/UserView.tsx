// Types
import { User } from "../../types";

// Date formatter
import { formatDate } from "../utils/func/reposUtils";

// Icons
import GitHubIcon from "../utils/svg/GitHubIcon";
import FollowersIcon from "../utils/svg/FollowersIcon";
import TwitterIcon from "../utils/svg/TwitterIcon";
import EmailIcon from "../utils/svg/EmailIcon";

interface UserViewProps {
  user: User | undefined;
}

const UserView = ({ user }: UserViewProps) => {
  
  const avatarUrl = user?.avatarUrl;
  const login = user?.login;
  const url = user?.url;
  const bio = user?.bio;
  const followersCount = user?.followers.totalCount;
  const followingCount = user?.following.totalCount;
  const email = user?.email;
  const publicReposCount = user?.public_repositories.totalCount;
  const twitterUsername = user?.twitterUsername;
  const createdAt = user ? formatDate(user.createdAt) : undefined;

  return (
    // TODO: hover en textos y enlaces
    <div className="flex flex-col gap-4 py-8 px-5 rounded-md bg-custom-lightGray sticky top-10">
      <img
        src={avatarUrl}
        alt={` avatar for ${login}`}
        className="rounded-full w-2/5 md:w-2/3 mx-auto"
      />
      <div className="flex justify-center items-center gap-1">
        <GitHubIcon color="text-custom-black" />
        <h2 className="text-lg md:text-xl font-bold">
          <a href={url}>{login}</a>
        </h2>
      </div>
      <p className="text-sm lg:text-base">{bio}</p>
      <ul className="list-disc flex flex-col justify-start items-start px-6 text-sm">
        <li>
          <span className="font-semibold">
            {publicReposCount}
          </span>{" "}
          public repositories
        </li>
        <li>User created at {createdAt}</li>
      </ul>
      <div className="flex flex-col lg:flex-row justify-center gap-1 lg:gap-6 text-sm border-dashed border-y border-y-custom-darkGray py-3">
        <p className="flex flex-wrap items-center justify-center lg:justify-start gap-1">
          <FollowersIcon color="text-custom-darkGray" />
          <span className="font-semibold">
            {followersCount}
          </span>{" "}
          followers
        </p>
        <p>
          <span className="font-semibold">{followingCount}</span>{" "}
          following
        </p>
        {twitterUsername && (
          <p className="flex justify-center items-center gap-1">
            <TwitterIcon color="text-custom-black" />
            <a href={`https://twitter.com/${twitterUsername}`}>
              @{twitterUsername}
            </a>
          </p>
        )}
      </div>
      {email && (
        <p className="flex justify-center items-center gap-1 text-xs lg:text-base">
          <EmailIcon color="text-custom-darkGray" />
          <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
    </div>
  );
};

export default UserView;
