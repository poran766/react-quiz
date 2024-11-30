import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import useVideoList from "../hooks/useVideoList";

export default function Videos() {
  const [page, setPage] = useState(1);
  const { loading, error, videos, hasMore } = useVideoList(page);

  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          next={() => {
            setPage(page + 10);
          }}
          loader={<h4>Loading...Please Wait</h4>}
        >
          {videos.map((video, index) =>
            video.noq > 0 ? (
              <Link to={`/quiz/${video.youtubeID}`} key={`${video.youtubeID}-${index}`}>
                <Video title={video.title} id={video.youtubeID} noq={video.noq} />
              </Link>
            ) : (
              <Video title={video.title} id={video.youtubeID} noq={video.noq} key={`${video.youtubeID}-${index}`} />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div> No Data Found </div>}
      {error && <div> Occurred An Error </div>}
      {loading && <div> Loading... </div>}
    </div>
  );
}
