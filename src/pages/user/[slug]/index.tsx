import { SettingsButton } from "#/components/pages/[slug]";
import { MainContent } from "#/components/shared";
import { Loader } from "#/components/uiParts";
import { useQueryPublicResources } from "#/hooks";

const Public = () => {
  const { data, isLoading, isError } = useQueryPublicResources();

  if (isLoading) return <Loader className="h-screen" />;

  if (isError) return;

  return (
    <MainContent {...data}>
      <SettingsButton />
    </MainContent>
  );
};

// TODO: SSR化

export default Public;
