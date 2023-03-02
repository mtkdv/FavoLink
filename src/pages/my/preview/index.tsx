import { useSession } from "next-auth/react";

import { MainContent } from "#/components/shared";
import { PreviewHeader } from "#/components/pages/my/preview/PreviewHeader";
import { Loader } from "#/components/uiParts";
import {
  useGetProfile,
  useGetLinks,
  useGetCategories,
  useGetCustom,
} from "#/hooks";
import UndrawNotFound from "/public/undraw_page_not_found_re_e9o6.svg";

const Preview = () => {
  const { data: session } = useSession();
  const profileResult = useGetProfile(session);
  const customResult = useGetCustom(session);
  const videosResult = useGetLinks(session);
  const categoriesResult = useGetCategories(session);

  if (
    profileResult.isLoading ||
    customResult.isLoading ||
    videosResult.isLoading ||
    categoriesResult.isLoading
  ) {
    return <Loader className="h-screen" />;
  }

  if (
    profileResult.isError ||
    customResult.isError ||
    videosResult.isError ||
    categoriesResult.isError
  ) {
    return (
      <div
        role="alert"
        className="h-screen flex flex-col items-center animate-appearance pt-[10%]"
      >
        <UndrawNotFound />
      </div>
    );
  }

  const { data: profile } = profileResult;
  const { data: custom } = customResult;
  const { data: videos } = videosResult;
  const { data: categories } = categoriesResult;

  return (
    // profile &&
    // custom &&
    // videos &&
    // categories && (
    <MainContent {...{ profile, categories, videos, custom }}>
      <PreviewHeader {...{ profile, custom }} />
    </MainContent>
    // )
  );
};

export default Preview;
