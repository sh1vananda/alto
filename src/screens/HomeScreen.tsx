import { useState, useEffect } from "@lynx-js/react";
import { client } from "../lib/sanity.client.js";
import ReviewCard from "../components/ReviewCard.js";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface Review {
  _id: string;
  title: string;
  slug: { current: string };
  moviePoster: SanityImageSource;
  score: number;
}

interface HomeScreenProps {
  navigation: {
    navigate: (screen: "ReviewDetail", params: { slug: string }) => void;
  };
}

const latestReviewsQuery = `
  *[_type == "review" && defined(slug.current) && defined(moviePoster)] | order(_createdAt desc)[0...10]{
    _id, title, slug, moviePoster, score
  }`;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(latestReviewsQuery)
      .then((data) => setReviews(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <view
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
        }}
      >
        <text style={{ color: "#EDEDED", fontSize: 18 }}>
          Loading Reviews...
        </text>
      </view>
    );
  }

  return (
    <view
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#111",
      }}
    >
      <scroll-view scroll-orientation="vertical" style={{ flex: 1 }}>
        <view>
          <text className="HeaderTitle">Recently Autopsied</text>
          <view className="Grid">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                onTap={() =>
                  navigation.navigate("ReviewDetail", {
                    slug: review.slug.current,
                  })
                }
              />
            ))}
          </view>
        </view>
      </scroll-view>
    </view>
  );
}
