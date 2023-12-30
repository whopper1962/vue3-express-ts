declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly API_BASE_URL: string;
      }
    }
  }
}
