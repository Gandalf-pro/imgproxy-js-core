import type { DPI, DPIOptionsPartial } from "../types/dpi";
import { guardIsUndef } from "../utils";

const getOpt = (options: DPIOptionsPartial): DPI | undefined => options.dpi;

const test = (options: DPIOptionsPartial): boolean => Boolean(getOpt(options));

const build = (options: DPIOptionsPartial): string => {
  const dpiOpts = getOpt(options);

  guardIsUndef(dpiOpts, "dpi");
  if (typeof dpiOpts !== "number") {
    throw new Error("dpi option must be a number");
  }

  return `dpi:${dpiOpts}`;
};

export { test, build };
