import { Divider } from "#/components/uiParts";
import { Legal } from "#/types";

export const LegalMain = ({
  docs,
  children,
}: {
  docs: Legal;
  children: React.ReactNode;
}) => {
  return (
    <div className="mx-auto max-w-5xl pb-28 text-base-black">
      <div>
        <div className="py-20">
          <h2 className="text-center text-3xl">{docs.title}</h2>
        </div>
        <div className="px-8">
          <p className="flex justify-end space-x-2">
            <span className="w-30">{docs.createdAt}</span>
            <span>制定</span>
          </p>
          {docs.updatedAt && (
            <p className="flex justify-end space-x-2">
              <span className="w-30">{docs.updatedAt}</span>
              <span>改訂</span>
            </p>
          )}
        </div>
        <div className="mt-8 px-8">
          <p>{docs.desc}</p>
        </div>

        <ol className="mt-16 space-y-14 px-8">
          {docs.articles.map((article, articleIndex) => (
            <li key={article.heading}>
              <h3 className="text-2xl">
                第{articleIndex + 1}条（{article.heading}）
              </h3>

              <Divider classWrapper="mt-2" />

              {article.desc && (
                <p className="mt-5 whitespace-pre-wrap">{article.desc}</p>
              )}
              {article.paragraphs && (
                <ol className="ml-6 mt-5 list-decimal space-y-2">
                  {article.paragraphs.map((paragraph) => (
                    <li key={paragraph.desc}>
                      <p>{paragraph.desc}</p>
                      {paragraph.items && (
                        <ol className="my-5 ml-6 list-decimal space-y-2">
                          {paragraph.items.map((item) => (
                            <li key={item.desc}>
                              <p>{item.desc}</p>
                              {item.subitems && (
                                <ol className="my-5 ml-6 list-decimal space-y-2">
                                  {item.subitems.map((subitem) => (
                                    <li key={subitem.desc}>
                                      <p>{subitem.desc}</p>
                                    </li>
                                  ))}
                                </ol>
                              )}
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </div>

      {children}
    </div>
  );
};
