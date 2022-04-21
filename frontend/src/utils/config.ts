const { VITE_BASE_URL, VITE_NODE_ENV } = import.meta.env;

type IEnv = "development" | "test" | "production";

const NODE_ENV: IEnv = (VITE_NODE_ENV as IEnv) || "development";
const config = {
  NAME: "improveet",
  BASE_URL: VITE_BASE_URL as string,
  IS_DEV: NODE_ENV === "development",
  NODE_ENV,
};

export default config;
