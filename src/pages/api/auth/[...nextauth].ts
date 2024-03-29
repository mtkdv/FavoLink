import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import { guestCustom, guestProfile, guestUser, guestVideos } from "#/const";
import prisma from "#/lib/prisma";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      // FIXME: GOOGLE_CLIENT_ID: string | undefined
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Create Guest User",
      credentials: {},
      async authorize() {
        return createGuestUser();
      },
    }),
    // ...add more providers here
  ],
  events: {
    async createUser({ user }) {
      await Promise.all([
        prisma.profile.create({
          data: {
            name: user.name ?? "",
            image: user.image,
            user: { connect: { id: user.id } },
          },
        }),
        prisma.custom.create({
          data: {
            user: { connect: { id: user.id } },
          },
        }),
      ]);
    },
    async signOut({ token }) {
      // ゲストアカウントはsignOut時に削除する
      if (token.email?.endsWith("@guestUser.com")) {
        await prisma.user.delete({
          where: { id: token.sub },
        });
      }
    },
  },
};

export default NextAuth(authOptions);

const createGuestUser = async () => {
  const user = await prisma.user.create({
    data: {
      ...guestUser(),
      profile: { create: guestProfile() },
      custom: { create: guestCustom },
    },
  });

  // const user = guestUser();

  // const guestUserVideos = await Promise.all(
  await Promise.all(
    guestVideos.map(
      async ({ categoryName: name, categoryLinks }, categoryIndex) => {
        const index = (categoryIndex + 1) * 1024;
        const createdCategory = await prisma.category.create({
          data: {
            name,
            index,
            user: {
              connect: { id: user.id },
            },
          },
        });

        const createdLinks = await Promise.all(
          categoryLinks.map(async (categoryLink, linkIndex) => {
            const index = (linkIndex + 1) * 1024;
            return await prisma.link.create({
              data: {
                ...categoryLink,
                index,
                user: {
                  connect: { id: user.id },
                },
                category: {
                  connect: { id: createdCategory.id },
                },
              },
            });
          })
        );

        return { createdCategory, createdLinks };
      }
    )
  );

  // console.log("guestUserVideos=> ", guestUserVideos);

  return user;
};
