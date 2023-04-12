import Image from "next/image";
import clsx from "clsx";

import { TopFeature } from "#/const";
import { Spacer } from "#/components/uiParts";
import { MotionFeature } from "#/components/pages/home";
import feature1 from "/public/feature1.png";
import feature2 from "/public/feature2.png";
import feature3 from "/public/feature3.png";

const featureImages = { feature1, feature2, feature3 };

export const Feature = ({
  feature: { headings, paragraphs, reverse, image },
}: {
  feature: TopFeature;
}) => {
  return (
    <li className="rounded-sm bg-white px-4 py-6 shadow-[0_5px_25px_-5px] shadow-khaki-500/30 sm:grid sm:grid-cols-12 sm:gap-x-2">
      <div
        className={clsx(
          reverse && "order-2",
          "grid place-content-center sm:col-span-5"
        )}
      >
        <h2 className="flex flex-col text-center text-3xl leading-relaxed">
          {headings.map((heading) => (
            <span key={heading}>{heading}</span>
          ))}
        </h2>

        {paragraphs && (
          <>
            <Spacer size={20} axis="column" />
            <p className="flex flex-col text-center text-liver-400">
              {paragraphs.map((paragraph) => (
                <span key={paragraph}>{paragraph}</span>
              ))}
            </p>
          </>
        )}
      </div>
      <MotionFeature className={clsx(reverse && "order-1", "sm:col-span-7")}>
        <Image src={featureImages[image]} alt={image} className="rounded-xl" />
      </MotionFeature>
    </li>
  );
};
