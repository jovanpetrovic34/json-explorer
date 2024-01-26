export type JSONPrimaryValue = string | number | boolean | null | undefined;
export type JSONValue = JSONPrimaryValue | JSONObject | JSONValue[];
export type JSONObject = { [key: string]: JSONValue };

export enum Parenthesis {
  ObjectOpened = '{',
  ObjectClosed = '}',
  ArrayOpened = '[',
  ArrayClosed = ']',
}


export const KeyCheckRegex = {
  ArrayIndex: /\[(\d+)\]$/,
  ObjectKeyWithIndex: /^(.+)\[(\d+)\]$/,
};

export const formatValue = (value: JSONPrimaryValue) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `"${value?.toString()}"`;
  return value?.toString();
};

export const formatValueStyle = (value: JSONPrimaryValue) => {
  if (value === null || typeof value === "boolean") return 'text-orange-600';
  if (typeof value === "number") return 'text-black';
  if (typeof value === "string") return 'text-green-700';
};

export const getValueByPath = (path: string, data: JSONValue): JSONPrimaryValue => {
  const keys = path.split('.');
  let value: any = data;
  if (value === undefined) {
    return undefined;
  } else {
    for (let key of keys) {
      const match = key.match(KeyCheckRegex.ObjectKeyWithIndex);
      if (match) {
        const arrKey = match[1];
        const index = parseInt(match[2]);
        const arrayMap: JSONValue[] | undefined = value[arrKey];
        if (arrayMap === undefined || !Array.isArray(arrayMap)) {
          return undefined;
        }
        if (arrayMap[index] !== undefined) {
          value = arrayMap[index];
        }
      } else if (value[key] === undefined) {
        return undefined;
      } else if (typeof value === 'object' && key in value) {
        value = value[key];
      }
    }
    if (value && typeof value === 'object') {
      return undefined;
    }
    return value as JSONPrimaryValue;
  }
};


