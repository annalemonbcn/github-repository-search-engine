// Types
import { User } from "../../types"

// Date formatter
import { formatDate } from "../../utils/func/utils"

// Icons
import GitHubIcon from "../utils/svg/GitHubIcon"
import FollowersIcon from "../utils/svg/FollowersIcon"
import TwitterIcon from "../utils/svg/TwitterIcon"
import EmailIcon from "../utils/svg/EmailIcon"


interface UserViewProps {
  user: User | undefined
}

const UserView = ({ user }: UserViewProps) => {
  let formattedCreatedAt;
  if (user) {
    formattedCreatedAt = formatDate(user.createdAt);
  }

  return (
    // TODO: hover en textos y enlaces
    <div className="flex flex-col gap-4 py-8 px-5 rounded-md bg-custom-lightGray sticky top-10">
      <img
        src={user?.avatarUrl}
        alt={` avatar for ${user?.login}`}
        className="rounded-full w-2/5 md:w-2/3 mx-auto"
      />
      <div className="flex justify-center items-center gap-1">
        <GitHubIcon color="text-custom-black" />
        <h2 className="text-lg md:text-xl font-bold">
          <a href={user?.url}>{user?.login}</a>
        </h2>
      </div>
      <p className="text-sm lg:text-base">{user?.bio}</p>
      <ul className="list-disc flex flex-col justify-start items-start px-6 text-sm">
        <li>
          <span className="font-semibold">{user?.public_repositories.totalCount}</span> public
          repositories
        </li>
        <li>User created at {formattedCreatedAt}</li>
      </ul>
      <div className="flex flex-col lg:flex-row justify-center gap-1 lg:gap-6 text-sm border-dashed border-y border-y-custom-darkGray py-3">
        <p className="flex flex-wrap items-center justify-center lg:justify-start gap-1">
          <FollowersIcon color="text-custom-darkGray" />
          <span className="font-semibold">{user?.followers.totalCount}</span> followers
        </p>
        <p>
          <span className="font-semibold">{user?.following.totalCount}</span> following
        </p>
        {user?.twitterUsername && (
          <p className="flex justify-center items-center gap-1">
            <TwitterIcon color="text-custom-black" />
            <a href={`https://twitter.com/${user?.twitterUsername}`}>
              @{user?.twitterUsername}
            </a>
          </p>
        )}
      </div>
      {user?.email && (
        <p className="flex justify-center items-center gap-1 text-xs lg:text-base">
          <EmailIcon color="text-custom-darkGray" />
          <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </p>
      )}
    </div>
  );
}

export default UserView
