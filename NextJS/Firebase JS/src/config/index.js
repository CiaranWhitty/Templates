const dev = process.env.NEXT_PUBLIC_DevOrProd !== "production";

export const server = dev ? "" : "http://localhost:3000";
