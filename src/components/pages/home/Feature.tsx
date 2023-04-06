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
  feature: { headings, paragraphs, reverse, src },
}: {
  feature: TopFeature;
}) => {
  return (
    <div className="py-6 px-4 bg-white rounded-sm sm:grid sm:grid-cols-12 sm:gap-x-2 shadow-[0_5px_25px_-5px] shadow-khaki-500/30">
      <div
        className={clsx(
          reverse && "order-2",
          "sm:col-span-5 grid place-content-center"
        )}
      >
        <h2 className="flex flex-col text-3xl text-center leading-relaxed">
          {headings.map((heading) => (
            <span>{heading}</span>
          ))}
        </h2>

        <Spacer size={20} axis="column" />

        {paragraphs && (
          <p className="flex flex-col text-center">
            {paragraphs.map((paragraph) => (
              <span>{paragraph}</span>
            ))}
          </p>
        )}
      </div>
      <MotionFeature className={clsx(reverse && "order-1", "sm:col-span-7")}>
        <Image src={featureImages[src]} alt="sample" />
      </MotionFeature>
    </div>
  );
};
