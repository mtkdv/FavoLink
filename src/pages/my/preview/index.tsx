import Error from "next/error";
import { useSession } from "next-auth/react";

import { useGetProfile } from "#/hooks/useGetProfile";
import { useGetLinks } from "#/hooks/useGetLinks";
import { useGetCategories } from "#/hooks/useGetCategories";
import { useGetCustom } from "#/hooks";
import { MainContent } from "#/components/shared/MainContent";
import { PreviewHeader } from "#/components/pages/my/preview/PreviewHeader";
import { Loader } from "#/components/uiParts/Loader";

const Preview = () => {
  const { data: session } = useSession();
  const profileResult = useGetProfile(session);
  const customResult = useGetCustom(session);
  const videosResult = useGetLinks(session);
  const categoriesResult = useGetCategories(session);

  if (profileResult.isError) {
    // return <Error statusCode={profileResult.error.code} title={profileResult.error.message} />;
    return <Error statusCode={404} title={profileResult.error.message} />;
  } else if (customResult.isError) {
    return <Error statusCode={404} />;
  } else if (videosResult.isError) {
    return <Error statusCode={404} />;
  } else if (categoriesResult.isError) {
    return <Error statusCode={404} />;
  }

  if (
    profileResult.isLoading ||
    customResult.isLoading ||
    videosResult.isLoading ||
    categoriesResult.isLoading
  ) {
    return <Loader />;
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
