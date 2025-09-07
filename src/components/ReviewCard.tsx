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
    <view
      className="w-[48%] mb-4 rounded-lg overflow-hidden relative"
      bindtap={onTap}
    >
      <image src={posterUrl} className="w-full aspect-[2/3]" />
      <view className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
        <text className="text-white text-sm font-bold">{review.title}</text>
        <text className="text-secondary text-xs">{review.score}/10</text>
      </view>
    </view>
  );
}
