import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { Divider } from "#/components/uiParts";
import { privacyPolicy, gmail } from "#/const";
import { LegalMain } from "#/components/shared/LegalMain";

const PrivacyPolicy: NextPageWithLayout = () => {
  return (
    <LegalMain docs={privacyPolicy}>
      <div className="px-8 mt-8">
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
    </LegalMain>
  );
};

PrivacyPolicy.getLayout = (page: React.ReactElement) => {
  return <TopLayout>{page}</TopLayout>;
};

export default PrivacyPolicy;
