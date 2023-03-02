import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

import { MainContent, MainContentData } from "#/components/shared";
import { SettingsButton } from "#/components/pages/[slug]/SettingsButton";
import { Loader } from "#/components/uiParts";
import UndrawNotFound from "/public/undraw_page_not_found_re_e9o6.svg";

const Public = () => {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<
    MainContentData,
    AxiosError<{
      code: string;
      message: string;
    }>
  >({
    queryKey: ["public"],
    queryFn: async () => {
      const res = await axios.get<MainContentData>(`/api/${router.query.slug}`);

      // loading test
      // FIXME: remove
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return res.data;
    },
    enabled: !!Object.keys(router.query).length,
  });

  if (isLoading) return <Loader className="h-screen" />;

  if (isError) {
    // return <Error statusCode={404} title={error.message} />;
    return (
      <div
        role="alert"
        className="h-screen flex flex-col items-center animate-appearance pt-[10%]"
      >
        <UndrawNotFound />
      </div>
    );
  }

  // const { profile, categories, videos, custom } = data;

  return (
    // <MainContent {...{ profile, categories, videos, custom, isLoading }}>
    // <MainContent {...{ isLoading, data }}>
    <MainContent {...data}>
      <SettingsButton />
    </MainContent>
  );
};

// TODO: SSR化

export default Public;
