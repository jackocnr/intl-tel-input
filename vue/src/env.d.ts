// Ambient declaration to satisfy TypeScript when using Vite's `define` to inject process.env.VERSION
declare const process: {
  env?: {
    VERSION?: string;
  };
};
