import { LegalMain } from "#/components/shared/LegalMain";
import { TopLayout } from "#/components/shared/TopLayout";
import { privacyPolicy, gmail } from "#/const";
import { NextPageWithLayout } from "#/pages/_app";

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <LegalMain docs={privacyPolicy}>
      <div className="mt-8 px-8">
        <p>
          E-mail:&nbsp;
          <a
            href={`mailto:${gmail.href}`}
            className="px-0.5 text-sky-500 underline-offset-2 outline-none ring-blue-400 hover:underline focus-visible:ring-2"
          >
            {gmail.href}
          </a>
        </p>
      </div>
    </LegalMain>
  );
};

PrivacyPolicy.getLayout = (page: React.ReactElement) => {
  return <TopLayout>{page}</TopLayout>;
};

export default PrivacyPolicy;
