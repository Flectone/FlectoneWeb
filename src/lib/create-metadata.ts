import { getTranslations } from "next-intl/server";

type MetadataParams = {
  params: Promise<{ locale: string }>;
};

type MetadataConfig = {
  namespace: string;
};

export function createMetadata(config: MetadataConfig) {
  return async function generateMetadata({ params }: MetadataParams) {
    const { locale } = await params;

    const t = await getTranslations({
      locale,
      namespace: `Metadata.${config.namespace}`,
    });

    return {
      title: t("title"),
      description: t("description"),
      openGraph: {
        title: t("title"),
        description: t("description"),
        locale: locale,
      },
    };
  };
}
