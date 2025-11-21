export const mockFetch = <T>(mockData: T) => {
  return new Promise<{ ok: boolean; json: () => Promise<T> }>((res) => {
    setTimeout(() => {
      res({
        ok: true,
        json: () => Promise.resolve(mockData),
      });
    }, 1000);
  });
};
