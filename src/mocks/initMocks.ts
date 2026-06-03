export async function initMocks() {
  const { worker } = await import("./browser");

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}
