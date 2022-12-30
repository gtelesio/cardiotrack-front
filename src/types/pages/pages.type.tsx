import { NextPage } from "next";
import { Props } from "next/script";

export type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: React.ReactElement) => React.ReactNode;
};
