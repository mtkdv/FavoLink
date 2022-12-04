import FooterSmall from "#/components/FooterSmall";
import Navbar from "#/components/Navbar";
import GoogleSvg from "#/public/google.svg";
import GithubSvg from "#/public/github.svg";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, provider } from "#/firebase/firebase";
import { useRouter } from "next/router";
import { saveProfile } from "#/lib/firestore";

export default function SignIn() {
  const router = useRouter();

  const handleSignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    // saveProfile(result.user);
    const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
    if (isNewUser) {
      const { uid, email, displayName, photoURL } = result.user;
      const body = {
        id: uid,
        email,
        name: displayName,
        image: photoURL,
      };

      try {
        await fetch(`/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch (error) {
        console.error(error);
      }
    }

    router.replace("/");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                // "url(" + require("assets/img/register_bg_2.png").default + ")",
                "url(#/public/register_bg_2.png)",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3 flex">
                      <button
                        className="text-lg text-gray-600"
                        onClick={handleBack}
                      >
                        ←
                      </button>
                      <h6 className="text-gray-600 text-sm font-bold flex-1">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 pl-1 pr-4 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        {/* <img
                          alt="..."
                          className="w-5 mr-1"
                          // src={require("assets/img/github.svg").default}
                          src="#/public/github.svg"
                        /> */}
                        <span className="scale-50 -mr-1.5">
                          <GithubSvg />
                        </span>
                        Github
                      </button>
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 pl-1 pr-4 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={handleSignInWithGoogle}
                      >
                        {/* <img
                          alt="..."
                          className="w-5 mr-1"
                          // src={require("assets/img/google.svg").default}
                          src="#/public/google.svg"
                        /> */}
                        <span className="scale-50 -mr-1.5">
                          <GoogleSvg />
                        </span>
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
