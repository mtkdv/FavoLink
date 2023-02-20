import { useRouter } from "next/router";
import Error from "next/error";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PublicPageData } from "#/pages/api/[slug]";
import { MainContent } from "#/components/shared/MainContent";
import { SettingsButton } from "#/components/pages/[slug]/SettingsButton";
import { Loader } from "#/components/uiParts/Loader";

const Public = () => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery<
    unknown,
    {
      code: string;
      message: string;
    },
    PublicPageData
  >({
    queryKey: ["public"],
    queryFn: async () => {
      const res = await axios.get<PublicPageData>(`/api/${router.query.slug}`);
      // console.log("res:", res);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return res.data;
    },
    enabled: !!Object.keys(router.query).length,
  });

  if (isLoading) return <Loader className="h-screen" />;

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
  }

  const { profile, categories, videos, custom } = data;

  return (
    <MainContent {...{ profile, categories, videos, custom }}>
      <SettingsButton />
    </MainContent>
  );
};

export default Public;
