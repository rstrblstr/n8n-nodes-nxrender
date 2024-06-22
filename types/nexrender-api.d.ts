// types/nexrender-api.d.ts
declare module '@nexrender/api' {
    export function createClient(config: {
      host: string;
      secret: string;
      polling: number;
      headers?: Record<string, string | (() => Promise<string>)>;
      name?: string;
    }): {
      listJobs: () => Promise<unknown>,
      fetchJob: (uid: string) => Promise<unknown>,
      addJob: (job: unknown) => Promise<unknown>,
      removeJob: (uid: string) => Promise<unknown>,
      pickupJob: () => Promise<unknown>,
      health: () => Promise<unknown>
    };
  }
