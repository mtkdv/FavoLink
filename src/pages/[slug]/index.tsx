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

  const { profile, categories, links: videos } = data;

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 pt-36 pb-6 overflow-hidden">
      {/* Sidebar */}
      {session?.user && session.user.id === profile.userId && (
        <Link
          href="/my/profile"
          className="absolute group top-3 right-6 p-3 bg-gradient-to-br from-white/50 to-white/20 rounded-full shadow"
        >
          <FaUserCog
            size={24}
            className="text-stone-400 translate-x-0.5 group-[:is(:hover,:focus-visible)]:scale-110 group-[:is(:hover,:focus-visible)]:text-stone-600 transition"
          />
        </Link>
      )}
      {/* <main className="mt-12"> */}
      {/* <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-tr from-red-200 via-red-300 to-yellow-200 px-6"> */}
      <main className="relative min-h-[calc(100vh_-_256px)] px-6">
        {/* Circle */}
        <div className="absolute w-full h-full">
          <div className="absolute -top-[5%] -left-40 bg-gradient-to-tr from-white/40 to-white/10 rounded-full w-[450px] h-[450px] animate-[animate_7s_infinite]"></div>
          <div className="absolute top-[30%] -right-40 bg-gradient-to-bl from-white/40 to-white/0 rounded-full w-[550px] h-[550px] animate-[animate_10s_infinite]"></div>
          <div className="absolute bottom-[3%] left-10 bg-gradient-to-br from-white/40 to-white/0 rounded-full w-[400px] h-[400px] animate-[animate_6s_infinite]"></div>
        </div>

        {/* Profile, Contents */}
        <div className="relative z-10 mt max-w-3xl mx-auto">
          {/* Profile */}
          <div className="relative w-full h-32 space-y-4 bg-gradient-to-br from-white/50 to-white/20 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.05)]">
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
              <p className="text-center font-semibold line-clamp-2 break-all">
                {profile.name}
              </p>

              {/* Description */}
              {/* <p className="whitespace-pre-wrap">{profile.description}</p> */}
            </div>
          </div>

          {/* Contents */}
          <div className="mt-12">
            <CategorizedLink {...{ categories, videos }} />
          </div>
        </div>
      </main>

      <footer className="mt-6 flex flex-col space-y-2 items-center">
        <Link href="/">
          <p className="text-4xl font-black tracking-wide drop-shadow-white-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-600 to-slate-900">
            Favolink
          </p>
        </Link>
        <p className="text-xs text-stone-500 drop-shadow-[0_1px_0_white]">
          Copyright &copy; 2023 All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Public;
