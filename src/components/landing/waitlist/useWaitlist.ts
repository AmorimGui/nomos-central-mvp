export function useWaitlist() {
  return {
    submit: async (_email: string) => {
      throw new Error("useWaitlist not implemented yet");
    },
    isLoading: false as boolean,
    error: null as string | null,
    success: false as boolean,
  };
}
