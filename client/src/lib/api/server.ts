interface Body<TVarables> {
  query: string;
  variables?: TVarables;
}

interface Error {
  message: string;
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

    if(!res.ok) {
      throw new Error("Failed to fetch from server ... ")
    }

    return res.json() as Promise<{ data: TData; errors: Error[] }>;
  },
};
