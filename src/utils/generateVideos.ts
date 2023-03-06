import { Category, Link } from "@prisma/client";

export const generateVideos = ({
  categories,
  links,
}: {
  categories: Category[];
  links: Link[];
}) => {
  // データ整形
  return categories.map((category) => {
    const categoryLinks = links.filter((video) => {
      return category.id === video.categoryId;
    });

    return {
      categoryId: category.id,
      categoryName: category.name,
      categoryLinks,
    };
  });
};
