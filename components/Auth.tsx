import { useRouter } from "next/router";
import { FC, useEffect } from "react";

export const Auth: FC = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (authUser) => {
  //     if (authUser) {
  //       const userData = {
  //         uid: authUser.uid,
  //         displayName: authUser.displayName,
  //         photoURL: authUser.photoURL,
  //       };
  //       setUser(userData);
  //       // setUser(authUser);
  //       // addUserProfile(userData);
  //       // console.log("router:", router);
  //       // => router.asPath: "/"
  //       if (/^\/(signin|signup)/.test(router.asPath)) {
  //         router.replace("/");
  //       }
  //     } else {
  //       resetUser();
  //       if (/^\/(?!(signin|signup))/.test(router.asPath)) {
  //         router.replace("/");
  //       }
  //     }
  //   });

  //   return unSubscribe;
  //   // }, [resetUser, router, setUser]);
  // }, []);

  return null;
};
