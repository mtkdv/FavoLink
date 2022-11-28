import { auth } from "#/firebase/firebase";
// import { addUserProfile } from "#/lib/firestore";
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
        const userData = {
          uid: authUser.uid,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        };
        setUser(userData);
        // setUser(authUser);
        // addUserProfile(userData);
        // console.log("router:", router);
        // => router.asPath: "/"
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
    // }, [resetUser, router, setUser]);
  }, []);

  return null;
};
