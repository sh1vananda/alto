// src/components/ReviewCard.tsx

import { urlFor } from "../lib/sanity.client.js";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface ReviewCardProps {
  review: {
    title: string;
    moviePoster: SanityImageSource;
    score: number;
  };
  onTap: () => void;
}

export default function ReviewCard({ review, onTap }: ReviewCardProps) {
  const posterUrl = review.moviePoster
    ? urlFor(review.moviePoster).width(300).height(450).url()
    : "";

  return (
    <view className="CardContainer" bindtap={onTap}>
      <image src={posterUrl} className="Poster" />
      <view className="TextOverlay">
        <text className="Title">{review.title}</text>
        <text className="Score">{review.score}/10</text>
      </view>
    </view>
  );
}
