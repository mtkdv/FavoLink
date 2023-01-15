import { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

type Providers = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};

const SignIn: NextPage<Providers> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => {
              // console.log("providers:\n", providers);
              signIn(provider.id, {
                callbackUrl: "/",
              });
            }}
            className="flex"
          >
            <FcGoogle className="relative top-1" />
            <span>Sign in with {provider.name}</span>
          </button>
        </div>
      ))}
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps<Providers> = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
