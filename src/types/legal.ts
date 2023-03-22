export type Legal = {
  title: string;
  createdAt: string;
  updatedAt?: string;
  desc: string;
  articles: {
    heading: string;
    desc?: string;
    paragraphs?: {
      desc: string;
      items?: {
        desc: string;
        subitems?: {
          desc: string;
        }[];
      }[];
    }[];
  }[];
};
