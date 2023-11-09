import type { Watermark, WatermarkOptionsPartial } from "../types/watermark";
import { guardIsUndef, guardIsNotNum } from "../utils";

const currentPositions = {
  ce: true,
  no: true,
  so: true,
  ea: true,
  we: true,
  noea: true,
  nowe: true,
  soea: true,
  sowe: true,
  re: true,
};

const getOpt = (options: WatermarkOptionsPartial): Watermark | undefined =>
  options.watermark || options.wm;

const test = (options: WatermarkOptionsPartial): boolean =>
  Boolean(getOpt(options));

const build = (options: WatermarkOptionsPartial): string => {
  const watermarkOpts = getOpt(options);

  guardIsUndef(watermarkOpts, "watermark");
  const { opacity, position, x_offset, y_offset, scale } = watermarkOpts;

  // watermarkOpts.opacity
  guardIsUndef(opacity, "watermark.opacity");
  guardIsNotNum(opacity, "watermark.opacity", { addParam: { min: 0, max: 1 } });

  // watermarkOpts.position
  if (position) {
    if (typeof position !== "string") {
      throw new Error("watermark.position is not a string");
    }
    if (!currentPositions[position]) {
      throw new Error(
        `watermark.position is not correct. Set the value from ${Object.keys(
          currentPositions
        ).join(", ")}`
      );
    }
  }

  if (x_offset) guardIsNotNum(x_offset, "watermark.x_offset");
  if (y_offset) guardIsNotNum(y_offset, "watermark.y_offset");
  if (scale) guardIsNotNum(scale, "watermark.scale");

  const pos = position || "";
  const xOffset = x_offset || "";
  const yOffset = y_offset || "";
  const sc = scale || "";

  return `wm:${opacity}:${pos}:${xOffset}:${yOffset}:${sc}`.replace(/:+$/, "");
};

export { test, build };
