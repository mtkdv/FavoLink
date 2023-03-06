import { MainContent } from "#/components/shared";
import { PreviewHeader } from "#/components/pages/my/preview/PreviewHeader";
import { Loader } from "#/components/uiParts";
import { useGetProfile, useGetCustom, useListUserVideo } from "#/hooks";

const Preview = () => {
  const profileResult = useGetProfile();
  const customResult = useGetCustom();
  const videoResult = useListUserVideo();

  if (
    profileResult.isLoading ||
    customResult.isLoading ||
    videoResult.isLoading
  ) {
    return <Loader className="h-screen" />;
  }

  if (profileResult.isError || customResult.isError || videoResult.isError)
    return;

  const { data: profile } = profileResult;
  const { data: custom } = customResult;
  const { data: videos } = videoResult;

  return (
    // <MainContent {...{ profile, categories, videos, custom }}>
    <MainContent {...{ profile, videos, custom }}>
      <PreviewHeader {...{ profile, custom }} />
    </MainContent>
    // )
  );
};

export default Preview;
