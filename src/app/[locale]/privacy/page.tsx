import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "zh" ? "隐私政策" : "Privacy Policy",
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const isZh = locale === "zh";

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">
          {isZh ? "隐私政策" : "Privacy Policy"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {isZh ? "最后更新：2026年3月29日" : "Last updated: March 29, 2026"}
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "1. 信息收集" : "1. Information We Collect"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "当您使用本平台时，我们可能收集以下信息：您与AI顾问的对话内容（用于提供服务）、基本使用分析数据（页面访问、功能使用频率）以及您的浏览器类型和语言偏好。我们不要求注册账户，也不收集个人身份信息（如姓名、邮箱、电话号码），除非您主动提供。"
                : "When you use the Platform, we may collect: conversation content with the AI consultant (to provide the service), basic usage analytics (page visits, feature usage), and your browser type and language preferences. We do not require account registration and do not collect personally identifiable information (such as name, email, or phone number) unless you voluntarily provide it."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "2. 信息使用" : "2. How We Use Information"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "收集的信息用于：提供和改善AI咨询服务、分析平台使用模式以优化用户体验、以及维护平台安全和稳定。我们不会将您的对话内容出售给第三方。"
                : "Information collected is used to: provide and improve AI consulting services, analyze usage patterns to optimize user experience, and maintain platform security and stability. We do not sell your conversation data to third parties."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "3. AI数据处理" : "3. AI Data Processing"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "您与AI顾问的对话可能通过第三方AI服务提供商处理。这些提供商有各自的数据处理政策。我们建议不要在对话中分享敏感商业机密或个人隐私信息。"
                : "Your conversations with the AI consultant may be processed through third-party AI service providers. These providers have their own data processing policies. We recommend not sharing sensitive business secrets or personal private information in conversations."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "4. Cookie和分析" : "4. Cookies & Analytics"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "本平台可能使用必要的Cookie来维持基本功能（如语言偏好）。我们可能使用匿名分析工具来了解平台使用情况。您可以通过浏览器设置管理Cookie。"
                : "The Platform may use essential cookies to maintain basic functionality (such as language preferences). We may use anonymous analytics tools to understand platform usage. You can manage cookies through your browser settings."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "5. 数据安全" : "5. Data Security"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "我们采取合理的技术和组织措施来保护您的数据安全。但请注意，没有任何互联网传输方式是完全安全的，我们无法保证绝对安全性。"
                : "We take reasonable technical and organizational measures to protect your data. However, please note that no method of internet transmission is completely secure, and we cannot guarantee absolute security."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "6. 您的权利" : "6. Your Rights"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "您有权请求访问、更正或删除我们持有的与您相关的数据。如有此类请求，请通过以下方式联系我们。"
                : "You have the right to request access to, correction of, or deletion of data we hold about you. For such requests, please contact us at the address below."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "7. 政策更新" : "7. Changes to This Policy"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "我们可能会不时更新本隐私政策。更新后的版本将在平台上发布，并注明最后更新日期。"
                : "We may update this Privacy Policy from time to time. The updated version will be posted on the Platform with the last updated date noted."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">
              {isZh ? "8. 联系方式" : "8. Contact"}
            </h2>
            <p className="mt-2">
              {isZh
                ? "如有任何隐私相关问题，请联系我们："
                : "For any privacy-related questions, please contact us at:"}{" "}
              <a
                href="mailto:contact@jytech.us"
                className="text-accent-light underline"
              >
                contact@jytech.us
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
