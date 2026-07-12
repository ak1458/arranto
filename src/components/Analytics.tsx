import Script from "next/script";

const GA = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM = process.env.NEXT_PUBLIC_GTM_ID;
const valid = (id?: string) => !!id && /^[A-Z0-9-]+$/i.test(id);

// GA4 + GTM with Consent Mode v2. Ad signals permanently denied — the site
// runs no ad pixels (privacy rule, arranto-rules.md). A consent banner for
// EU analytics consent is a UI-phase task (MASTER-CONTEXT D7).
export function Analytics() {
  const ga = valid(GA) ? GA : undefined;
  const gtm = valid(GTM) ? GTM : undefined;
  if (!ga && !gtm) return null;

  const init = [
    `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}`,
    `gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});`,
    gtm
      ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`
      : "",
    ga ? `gtag('js',new Date());gtag('config','${ga}');` : "",
  ].join("");

  return (
    <>
      <Script id="analytics-init" strategy="afterInteractive">{init}</Script>
      {ga && <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />}
    </>
  );
}
