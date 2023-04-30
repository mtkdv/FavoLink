import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 既存のすべてのユーザーに対して Custom レコードを作成する。
const createCustomRecordsForExistingUsers = async () => {
  const users = await prisma.user.findMany();
  for (const user of users) {
    // すでに Custom レコードが存在する場合はスキップ。
    const existingCustom = await prisma.custom.findUnique({
      where: {
        userId: user.id,
      },
    });
    if (existingCustom !== null) {
      continue;
    }

    // User モデルに基づく新しい Custom レコードを作成する。
    await prisma.custom.create({
      data: {
        userId: user.id,
      },
    });

    console.log(`Created custom record for user ${user.name ?? ""}`);
  }
};

createCustomRecordsForExistingUsers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
