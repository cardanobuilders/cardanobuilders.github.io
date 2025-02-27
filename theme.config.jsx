import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import {
  ROOT_URL,
  APP_NAME,
  APP_DESC,
  PROJECT_GITHUB_URL,
} from "./src/configs";

export default {
  head() {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      ROOT_URL + (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    const title = `${frontMatter.title} - ${APP_NAME}` || APP_NAME;

    return (
      <>
        <title>{title} - Cardano Builders</title>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={frontMatter.description || APP_DESC}
        />
      </>
    );
  },
  logo: (
    <>
      {/* <svg
        width="24"
        height="24"
        enableBackground="new 0 0 300 200"
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="m289 127-45-60-45-60c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-37 49.3c-2 2.7-6 2.7-8 0l-37-49.3c-.9-1.3-2.4-2-4-2s-3.1.7-4 2l-45 60-45 60c-1.3 1.8-1.3 4.2 0 6l45 60c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l37-49.3c2-2.7 6-2.7 8 0l37 49.3c.9 1.3 2.4 2 4 2s3.1-.7 4-2l45-60c1.3-1.8 1.3-4.2 0-6zm-90-103.3 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-90 0 32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0l-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0zm-53 152.6-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0zm90 0-32.5-43.3c-1.3-1.8-1.3-4.2 0-6l32.5-43.3c2-2.7 6-2.7 8 0l32.5 43.3c1.3 1.8 1.3 4.2 0 6l-32.5 43.3c-2 2.7-6 2.7-8 0z" />
      </svg> */}
      <span style={{ marginLeft: ".4em", whiteSpace: "nowrap" }}>
        Cardano Builders
      </span>
    </>
  ),
  faviconGlyph: "M",
  project: {
    link: PROJECT_GITHUB_URL,
  },
  footer: {
    component: null,
    content: null,
  },
  feedback: {
    component: null,
    content: null,
  },
  editLink: {
    component: null,
  },
  // chat: {
  //   link: "https://x.com/meshsdk",
  //   icon: (
  //     <svg width="24" height="24" viewBox="0 0 248 204">
  //       <path
  //         fill="currentColor"
  //         d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
  //       />
  //     </svg>
  //   ),
  // },
  i18n: [
    { locale: "en", name: "English" },
    { locale: "vn", name: "Tiếng Việt" },
    { locale: "jp", name: "日本語" },
  ],
};
