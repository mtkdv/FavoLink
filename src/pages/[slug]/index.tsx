import Image from "next/image";
import silhouetteAvatar from "/public/silhouette-avatar.png";
import { CategorizedLink } from "#/components/shared/CategorizedLink";
import Router, { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PublicPageData, PublicPageRes } from "../api/[slug]";
import Error from "next/error";
import { FaArrowLeft, FaShareSquare, FaUserCog } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useGetProfile } from "#/hooks/useGetProfile";
import { useEffect } from "react";
import clsx from "clsx";

const Public = () => {
  // console.log("Public");
  const { data: session } = useSession();
  // const {
  // data: loginUserProfile,
  // isLoading: isLoadingProfile,
  // isError: isProfileError,
  // error: profileError,
  // } = useGetProfile(session);

  // if (isProfileError) {
  //   console.log("特に何もしないよ。一般ユーザーです。");
  // }
  // if (loginUserProfile) {
  //   console.log("自分自身のページだ。編集ページへのボタン付けるよ。");
  // }

  // useEffect(() => {
  //   console.log("session:", session);
  //   console.log("cliendId:", session?.user?.id);
  // }, [session]);

  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery<
    PublicPageData,
    { message: string }
  >({
    queryKey: ["public"],
    queryFn: async () => {
      // const res = await axios.get<PublicPageRes>(`/api/${router.query.slug}`);
      const res = await axios.get<PublicPageData>(`/api/${router.query.slug}`);
      // return (await res.data) as {
      //   profile: Profile;
      //   categories: Category[];
      //   links: Link[];
      // };
      // console.log("ax:", res);
      return res.data;
    },
    enabled: !!Object.keys(router.query).length,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <Error statusCode={404} title={error.message} />;
  }

  const { profile, categories, videos, custom } = data;

  return (
    // <div className="relative min-h-screen bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 pt-36 pb-6 overflow-hidden">
    <div className="min-h-screen pt-36 pb-6 overflow-hidden">
      <div className="fixed top-0 w-full h-screen -z-10">
        {custom.backgroundImage ? (
          <Image
            src={custom.backgroundImage}
            alt="公開ページの背景画像"
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full bg-gradient-to-tr from-rose-200 via-red-300 to-yellow-200" />
        )}
        {/* <div className="h-full bg-gradient-to-r from-slate-900 to-slate-700" /> */}
      </div>

      {/* Setting button */}
      {session?.user && session.user.id === profile.userId && (
        <Link
          href="/my/profile"
          className={clsx(
            // "absolute group top-3 right-6 p-3 border border-white/25 border-t-white/50 border-l-white/50 rounded-full shadow-md hover:shadow-lg backdrop-blur-sm",
            "absolute group top-3 right-6 p-3 border-2 border-white rounded-full shadow-[0_2px_8px_-2px] shadow-black/30 hover:shadow-lg backdrop-blur-sm transition outline-none focus-visible:ring-2",
            custom.mode === "LIGHT"
              ? "bg-white/20 hover:bg-white/40"
              : "bg-black/20 hover:bg-white"
          )}
        >
          <FaUserCog
            size={24}
            className={clsx(
              "translate-x-0.5 transition",
              custom.mode === "LIGHT"
                ? "text-stone-500 group-hover:text-base-black"
                : "text-white group-hover:text-base-black"
            )}
          />
        </Link>
      )}
      {/* <main className="mt-12"> */}
      {/* <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 px-6"> */}
      <main className="relative min-h-[calc(100vh_-_256px)] px-6">
        {/* Circle */}
        {/* <div className="absolute w-full h-full">
          <div className="absolute -top-[5%] -left-40 bg-gradient-to-tr from-white/40 to-white/10 rounded-full w-[450px] h-[450px] animate-[animate_7s_infinite]"></div>
          <div className="absolute top-[30%] -right-40 bg-gradient-to-bl from-white/40 to-white/0 rounded-full w-[550px] h-[550px] animate-[animate_10s_infinite]"></div>
          <div className="absolute bottom-[3%] left-10 bg-gradient-to-br from-white/40 to-white/0 rounded-full w-[400px] h-[400px] animate-[animate_6s_infinite]"></div>
        </div> */}

        {/* Profile, Contents */}
        <div className="relative z-10 mt max-w-3xl mx-auto">
          {/* Profile */}
          <div
            className={clsx(
              "relative w-full h-32 space-y-4 border border-white/25 border-t-white/50 border-l-white/50 rounded-2xl shadow-[0_5px_15px_-5px] shadow-black/20 backdrop-blur-sm",
              custom.mode === "LIGHT"
                ? "bg-white/20 text-base-black"
                : "bg-black/20 text-white"
            )}
          >
            <div className="absolute left-1/2 w-full px-6 -translate-x-1/2 -top-10 space-y-6">
              {/* Avatar */}
              <div className="flex justify-center">
                <Image
                  src={profile.image ?? silhouetteAvatar}
                  alt="avatar"
                  width={80}
                  height={80}
                  className="rounded-full min-w-[80px] h-20 drop-shadow-md"
                ></Image>
              </div>

              {/* Name */}
              <p className="text-center font-semibold tracking-wide line-clamp-2 break-all">
                {profile.name}
              </p>

              {/* Description */}
              {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
            </div>
          </div>

          {/* Contents */}
          <div className="mt-12">
            <CategorizedLink {...{ categories, videos, custom }} />
          </div>
        </div>
      </main>

      <footer className="mt-6 flex flex-col space-y-2 items-center">
        <Link href="/">
          <p className="text-4xl font-black tracking-wide drop-shadow-white-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900">
            Favolink
          </p>
        </Link>
        <p className="text-xs drop-shadow-[1px_1px_0_white]">
          Copyright &copy; 2023 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Public;
