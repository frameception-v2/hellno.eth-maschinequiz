"use client";

import dynamic from "next/dynamic";
import { PROJECT_TITLE } from "~/lib/constants";

const Frame = dynamic(() => import("~/components/Frame"), {
  ssr: false,
});

interface AppProps {
  title?: string;
}

export default function App({ title = PROJECT_TITLE }: AppProps) {
  return <Frame title={title} />;
}
