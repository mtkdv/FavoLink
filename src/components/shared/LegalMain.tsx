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
    <div className="pb-28 max-w-5xl mx-auto text-base-black">
      <div>
        <div className="py-20">
          <h2 className="text-3xl text-center">{docs.title}</h2>
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

        <ol className="px-8 mt-16 space-y-14">
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
                <ol className="mt-5 ml-6 space-y-2 list-decimal">
                  {article.paragraphs.map((paragraph) => (
                    <li key={paragraph.desc}>
                      <p>{paragraph.desc}</p>
                      {paragraph.items && (
                        <ol className="my-5 ml-6 space-y-2 list-decimal">
                          {paragraph.items.map((item) => (
                            <li key={item.desc}>
                              <p>{item.desc}</p>
                              {item.subitems && (
                                <ol className="my-5 ml-6 space-y-2 list-decimal">
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
