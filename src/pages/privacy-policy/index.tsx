import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { Divider } from "#/components/uiParts";
import { privacyPolicy, gmail } from "#/const";

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <>
      <div className="mt-28">
        <h2 className="text-3xl font-black text-center">
          {privacyPolicy.title}
        </h2>
        <p className="mt-8 text-end">{privacyPolicy.createdAt} 制定</p>
        {privacyPolicy.updatedAt && (
          <p className="text-end">{privacyPolicy.updatedAt} 改訂</p>
        )}
        <p className="mt-8">{privacyPolicy.desc}</p>
      </div>

      <ol className="mt-16 space-y-14">
        {privacyPolicy.articles.map((article, articleIndex) => (
          <li key={article.heading}>
            <h3 className="text-2xl font-black">
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

      <div className="mt-8 mb-20">
        <p>
          E-mail:&nbsp;
          <a
            // href={`mailto:${urls.gmail.href}`}
            href={`mailto:${gmail.href}`}
            className="text-blue-500 hover:underline underline-offset-4"
          >
            {gmail.href}
          </a>
        </p>
      </div>
    </>
  );
};

PrivacyPolicy.getLayout = (page: React.ReactElement) => {
  return <TopLayout>{page}</TopLayout>;
};

export default PrivacyPolicy;
