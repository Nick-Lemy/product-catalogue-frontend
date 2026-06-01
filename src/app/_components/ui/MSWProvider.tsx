"use client";

import { useEffect, useState } from "react";
import { initMocks } from "@/mocks/initMocks";

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(process.env.NODE_ENV !== "development");

  useEffect(() => {
    initMocks().then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}
