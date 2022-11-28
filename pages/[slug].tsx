import { fetchCategorizedFavolinks, fetchProfile } from "#/lib/firestore";
import { userState } from "#/store/store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import avatar2 from "#/public/avatar2.png";
import { useRouter } from "next/router";

const Public = () => {
  const user = useRecoilValue(userState);
  const router = useRouter();

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(user.uid),
    enabled: !!user,
  });

  const { data: categorizedFavolinks } = useQuery({
    queryKey: ["categorizedFavolinks"],
    queryFn: () => fetchCategorizedFavolinks(user.uid),
    enabled: !!user,
  });

  return (
    <div>
      {profile ? (
        <section>
          <Image
            src={profile.photoURL ?? avatar2}
            alt="avatar"
            width={40}
            height={40}
          ></Image>
          <p>{profile.displayName}</p>
          <p>{profile.desc}</p>
        </section>
      ) : null}
      <section>
        <ul className="mt-4">
          {categorizedFavolinks ? (
            categorizedFavolinks.length > 0 ? (
              categorizedFavolinks.map((spesificFavolinks, index) => (
                <li
                  key={index}
                  className="border border-white border-dashed p-2 m-4"
                >
                  <h3>{spesificFavolinks[0].categoryTitle}</h3>
                  <ul className="flex">
                    {spesificFavolinks.map((favolink) => (
                      <li key={favolink.url} className="w-60 p-1">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={favolink.url}
                        >
                          <Image
                            src={favolink.thumbnailUrl}
                            alt="thumbnail"
                            width={320}
                            height={180}
                            className="rounded-md hover:scale-105 transition-transform"
                          />
                          <h3 className="line-clamp-2">{favolink.title}</h3>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : null
          ) : (
            <p>loading...</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default Public;
