export const normalizeBoolean = (value: 1 | string | boolean): string => {
  if (value === true || value === "t" || value === 1) {
    return "t";
  }
  return "f";
};

const getParamName = (name: string): string => {
  return `${name}${name.includes(".") ? "" : " option"}`;
};

export function guardIsUndef<T>(
  param: T | undefined,
  paramName: string,
  addInfo?: string
): asserts param is T {
  if (param === undefined) {
    throw new Error(
      `${getParamName(paramName)} is undefined${addInfo ? `. ${addInfo}` : ""}`
    );
  }
}

interface IAddParam {
  max?: number;
  min?: number;
  isInt?: boolean;
  minEqual?: boolean;
}

interface AddParams {
  addInfo?: string;
  addParam?: IAddParam;
}

function getMinNumText(
  paramName: string,
  value: number,
  addInfo?: string,
  isEqual?: boolean
): string {
  return `${getParamName(paramName)} value can't be less${
    isEqual ? " or equal" : ""
  } then ${value}${addInfo ? `. ${addInfo}` : ""}`;
}

export function guardIsNotNum(
  param: number | undefined,
  paramName: string,
  additional?: AddParams
): asserts param is number {
  if (typeof param !== "number") {
    throw new Error(
      `${getParamName(paramName)} is not a number${
        additional?.addInfo ? `. ${additional?.addInfo}` : ""
      }`
    );
  }

  if (!additional?.addParam) return;

  const addParam = additional.addParam;
  const addInfo = additional?.addInfo;
  if (addParam.min !== undefined) {
    if (addParam.minEqual && param <= addParam.min)
      throw new Error(getMinNumText(paramName, addParam.min, addInfo, true));
    if (param < addParam.min)
      throw new Error(getMinNumText(paramName, addParam.min, addInfo));
    if (addParam.max !== undefined && param > addParam.max) {
      throw new Error(
        `${getParamName(paramName)} value can't be more than ${addParam.max}${
          addInfo ? `. ${addInfo}` : ""
        }`
      );
    }
  }

  if (addParam.isInt && !Number.isInteger(param))
    throw new Error(`${getParamName(paramName)} is must be an integer`);
}

interface IValidValues {
  [string | number]: boolean;
}

export function guardIsValidVal(valObj, value: string | number, name: string) {
  const text = `Valid values are: ${Object.keys(valObj).join(", ")}`;

  if (!valObj[value]) {
    throw new Error(`${getParamName(name)} is invalid. ${text}`);
  }
}
