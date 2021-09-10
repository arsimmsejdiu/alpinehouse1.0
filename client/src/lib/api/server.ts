interface Body<TVarables> {
  query: string;
  variables?: TVarables;
}

export const server = {
  fetch: async <TData = any, TVarables = any>(body: Body<TVarables>) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.json() as Promise<{ data: TData }>;
  },
};
