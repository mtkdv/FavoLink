import Image from "next/image";
import avatar2 from "#/public/avatar2.png";
import { useGetProfile } from "#/lib/useGetProfile";
import { CategorizedLink } from "#/components/CategorizedLink";
import { useSession } from "next-auth/react";

const Public = () => {
  const { data: session } = useSession();
  const { data: profile } = useGetProfile(session);

  return (
    <div>
      {session && profile ? (
        <section>
          <Image
            src={session.user?.image ?? avatar2}
            alt="avatar"
            width={40}
            height={40}
          ></Image>
          <p>{session.user?.name}</p>
          <p>{profile.description}</p>
        </section>
      ) : null}
      <CategorizedLink />
    </div>
  );
};

export default Public;
