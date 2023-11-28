// Types
import { FetchReposResult } from "../types";

// Utils
import ButtonGray from "./buttons/ButtonGray"


interface PaginatorProps {
  hasNextPage: boolean | undefined,
  fetchNextPage: (options?: {
    pageParam?: string | null | undefined;
  }) => Promise<FetchReposResult>
}

const Paginator = ({ hasNextPage, fetchNextPage }: PaginatorProps) => {

  console.log('hasNextPage', hasNextPage)

  return (
    <>
      {hasNextPage && (
        <div
          onClick={() => {
            fetchNextPage(); 
          }}
        >
          <ButtonGray text="Load 10 more" />
        </div>
      )}
    </>
  )
}

export default Paginator
