export async function initMocks() {
  if (process.env.NODE_ENV !== "development") return;

  const { worker } = await import("./browser");

  if (worker.state === "activated") return;

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}
