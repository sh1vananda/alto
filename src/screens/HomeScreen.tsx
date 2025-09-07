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
      <view className="CenterContainer">
        <text className="LoadingText">Loading Reviews...</text>
      </view>
    );
  }

  return (
    <view className="SafeArea" style={{ flex: 1, display: "flex" }}>
      <scroll-view
        className="Container"
        scroll-orientation="vertical"
        style="width:100%;height:100%;"
      >
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
