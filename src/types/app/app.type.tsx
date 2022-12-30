import { EmotionCache } from "@emotion/cache";
import { AppProps } from "next/app";
import { NextPageWithLayout } from "../pages/pages.type";

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache: EmotionCache;
};