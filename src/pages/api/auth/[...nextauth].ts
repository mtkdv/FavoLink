import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import Credentials from "next-auth/providers/credentials";

import prisma from "#/lib/prisma";
import { guestCustom, guestProfile, guestUser, guestVideos } from "#/const";

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
            name: user.name!,
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
      // ゲストアカウントを削除
      const user = await prisma.user.findUnique({
        where: {
          email: guestUser.email,
        },
      });
      if (user && user.id === token.sub) {
        await prisma.user.delete({
          where: { id: user.id },
        });
      }
    },
  },
};

export default NextAuth(authOptions);

const createGuestUser = async () => {
  const user = await prisma.user.create({
    data: {
      ...guestUser,
      profile: { create: guestProfile },
      custom: { create: guestCustom },
    },
  });

  await Promise.all([
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
            await prisma.link.create({
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
      }
    ),
  ]);

  return user;
};
