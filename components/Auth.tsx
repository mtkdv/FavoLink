import { auth } from "#/firebase/firebase";
import { userState } from "#/store/store";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";

export const Auth: FC = () => {
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const { uid, displayName, photoURL } = authUser;
        setUser({ uid, displayName, photoURL });
        console.log("いつ実行されてるの");
        // console.log("router:", router);
        //=> router.asPath: "/"
        if (/^\/(signin|signup)/.test(router.asPath)) {
          router.replace("/");
        }
      } else {
        resetUser();
        if (/^\/(?!(signin|signup))/.test(router.asPath)) {
          router.replace("/");
        }
      }
    });

    return unSubscribe;
  }, []);

  return null;
};
