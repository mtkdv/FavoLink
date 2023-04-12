import { NextPageWithLayout } from "#/pages/_app";
import { TopLayout } from "#/components/shared/TopLayout";
import { terms } from "#/const";
import { LegalMain } from "#/components/shared/LegalMain";

const Terms: NextPageWithLayout = () => {
  return (
    <LegalMain docs={terms}>
      <p className="mt-12 px-8">以上</p>
    </LegalMain>
  );
};

Terms.getLayout = (page: React.ReactElement) => {
  return <TopLayout>{page}</TopLayout>;
};

export default Terms;
