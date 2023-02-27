import { useRouter } from "next/router";
import Error from "next/error";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { PublicPageData } from "#/pages/api/[slug]";
import { MainContent, MainContentData } from "#/components/shared/MainContent";
import { SettingsButton } from "#/components/pages/[slug]/SettingsButton";
import { Loader } from "#/components/uiParts/Loader";
import { useState } from "react";

const Public = () => {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery<
    unknown,
    {
      code: string;
      message: string;
    },
    // PublicPageData
    MainContentData
  >({
    queryKey: ["public"],
    queryFn: async () => {
      // const res = await axios.get<PublicPageData>(`/api/${router.query.slug}`);
      const res = await axios.get<MainContentData>(`/api/${router.query.slug}`);

      // loading test
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return res.data;
    },
    enabled: !!Object.keys(router.query).length,
  });

  if (isLoading) return <Loader className="h-screen" />;

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
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

export default Public;
