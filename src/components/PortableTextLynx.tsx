// src/components/PortableTextLynx.tsx

import type { PortableTextBlock } from "@portabletext/types";

interface PortableTextLynxProps {
  value: PortableTextBlock[];
}

export default function PortableTextLynx({ value }: PortableTextLynxProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <view className="flex flex-col gap-4">
      {value.map((block) => {
        if (block._type === "block" && block.children) {
          const textContent = block.children
            .map((child) => child.text)
            .join("");
          return (
            <text
              key={block._key}
              className="text-secondary text-base leading-relaxed text-justify"
            >
              {textContent}
            </text>
          );
        }
        return null;
      })}
    </view>
  );
}
