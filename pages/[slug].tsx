import { userState } from "#/store/store";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import avatar2 from "#/public/avatar2.png";
import { Profile, useGetProfile } from "#/lib/useGetProfile";
import { CategorizedLink } from "#/components/CategorizedLink";

const Public = () => {
  const user = useRecoilValue(userState);
  const { data: profile } = useGetProfile<Profile>(user);

  return (
    <div>
      {profile ? (
        <section>
          <Image
            src={profile.image ?? avatar2}
            alt="avatar"
            width={40}
            height={40}
          ></Image>
          <p>{profile.name}</p>
          <p>{profile.description}</p>
        </section>
      ) : null}
      <CategorizedLink />
    </div>
  );
};

export default Public;
