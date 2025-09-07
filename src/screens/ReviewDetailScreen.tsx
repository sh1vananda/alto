// src/screens/ReviewDetailScreen.tsx

import { useState, useEffect } from "@lynx-js/react";
import { client, urlFor } from "../lib/sanity.client.js";
import { PortableText } from "@portabletext/react";
import RadarChart from "../components/RadarChart";
import BooGauge from "../components/BooGauge";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextBlock } from "@portabletext/types";
import type {
  NavigateFunction,
  GoBackFunction,
  NavParams,
} from "../navigation/AppNavigator";

interface FullReview {
  title: string;
  releaseDate: string;
  score: number;
  moviePoster: SanityImageSource;
  heroImage?: SanityImageSource;
  body: PortableTextBlock[];
  storytelling?: number;
  character?: number;
  visuals?: number;
  sound?: number;
  performances?: number;
  direction?: number;
  impact?: number;
  themes?: number;
  execution?: number;
  originality?: number;
  mainBooGauge?: number;
  dread?: number;
  jumpScares?: number;
  gore?: number;
  psychological?: number;
  atmosphere?: number;
  lingeringEffect?: number;
}

interface ReviewDetailScreenProps {
  navigation: {
    navigate: NavigateFunction;
    goBack: GoBackFunction;
  };
  route: {
    params: NavParams | null;
  };
}

const reviewQuery = `*[_type == "review" && slug.current == $slug][0]{ ... }`;

export default function ReviewDetailScreen({
  route,
  navigation,
}: ReviewDetailScreenProps) {
  const [review, setReview] = useState<FullReview | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const slug = route.params?.slug;
    if (slug) {
      client
        .fetch(reviewQuery, { slug })
        .then((data) => setReview(data))
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [route.params?.slug]);

  if (isLoading) {
    return (
      <view className="CenterContainer">
        <text style={{ color: "#FFF" }}>Loading...</text>
      </view>
    );
  }

  if (!review) {
    return (
      <view className="CenterContainer">
        <text style={{ color: "#FFF" }}>Review not found.</text>
      </view>
    );
  }

  const attributeData = [
    review.storytelling || 0,
    review.character || 0,
    review.visuals || 0,
    review.sound || 0,
    review.performances || 0,
    review.direction || 0,
    review.impact || 0,
    review.themes || 0,
    review.execution || 0,
    review.originality || 0,
  ];
  const booGaugeData = {
    mainBooGauge: review.mainBooGauge,
    dread: review.dread,
    jumpScares: review.jumpScares,
    gore: review.gore,
    psychological: review.psychological,
    atmosphere: review.atmosphere,
    lingeringEffect: review.lingeringEffect,
  };

  const imageToDisplay = review.heroImage || review.moviePoster;

  return (
    <view className="Container" style={{ overflow: "scroll" }}>
      <view className="HeroContainer">
        <image
          src={urlFor(imageToDisplay).width(800).url()}
          className="HeroImage"
        />
        <view className="BackButton" bindtap={navigation.goBack}>
          <text style={{ color: "#FFF", fontSize: 24 }}>&lt;</text>
        </view>
      </view>

      <view className="HeaderContent">
        <text className="Title">{review.title}</text>
        <text className="Subtitle">
          {new Date(review.releaseDate).getFullYear()} • Score: {review.score}
          /10
        </text>
      </view>

      <view className="VizContainer">
        <RadarChart data={attributeData} />
      </view>
      <view className="VizContainer">
        <BooGauge data={booGaugeData} />
      </view>

      <view className="BodyContainer">
        <PortableText value={review.body} />
      </view>
    </view>
  );
}
