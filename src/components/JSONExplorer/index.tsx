import React, { ChangeEvent, useState } from 'react';
import {
  JSONPrimaryValue,
  JSONValue,
  Parenthesis,
  KeyCheckRegex,
  formatValue,
  formatValueStyle,
  getValueByPath
} from "./resource";

type SelectedField = {
  keyPath: string;
  value: JSONPrimaryValue;
};

export type JSONExplorerProps = {
  jsonData: JSONValue;
};

const JSONExplorer = ({ jsonData }: JSONExplorerProps) => {
  const [selectedField, setSelectedField] = useState<SelectedField | null>(null);
  const [inputValue, setInputValue] = useState('');
  
  const handleKeyClick = (keyPath: string, value: JSONPrimaryValue) => {
    setSelectedField({ keyPath, value });
    setInputValue(`res.${keyPath}`);
  };
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const formattedPath = event.target.value;
    const pathItems = formattedPath.split('.');
    pathItems.shift();
    const path = pathItems.join('.');
    const value = getValueByPath(path, jsonData);
    setSelectedField({ keyPath: path, value });
    setInputValue(formattedPath);
  };
  
  const renderJSONNode = (data: JSONValue, key = '', path = '') => {
    if (Array.isArray(data)) {
      return (
        <div>
          {key && <span>{key}: </span>}
          {Parenthesis.ArrayOpened}
          <div className="ml-8">
            {data.map((item, index) => (
              <div key={`${path}[${index}]`}>
                {renderJSONNode(item, `[${index}]`, `${path}[${index}]`)}
              </div>
            ))}
          </div>
          {Parenthesis.ArrayClosed},
        </div>
      );
    } else if (typeof data === 'object' && data !== null) {
      return (
        <div>
          {key && !key.match(KeyCheckRegex.ArrayIndex) && <span>{key}: </span>}
          {Parenthesis.ObjectOpened}
          <div className="ml-8">
            {Object.keys(data).map((key) => (
              <div key={`${path}.${key}`}>
                {renderJSONNode(data[key], key, path ? `${path}.${key}` : key)}
              </div>
            ))}
          </div>
          {Parenthesis.ObjectClosed},
        </div>
      );
    } else {
      return (
        <div
          onClick={() => handleKeyClick(path, data)}
        >
          <span
            className={`text-blue-600 cursor-pointer hover:underline ${selectedField?.keyPath === path && 'bg-gray-300'}`}>
            {key}:
          </span>
          <span className={`ml-2 ${formatValueStyle(data)}`}>{formatValue(data)}</span>
          ,
        </div>
      );
    }
  };
  
  return (
    <div className="p-16">
      <div className="mb-8 flex gap-4 items-start">
        <div>
          <p className="mb-2">Property</p>
          <input
            className="border rounded outline-none p-2"
            placeholder="Property"
            value={`${inputValue}`}
            onChange={handleInputChange}
          />
          <p className="mt-1 text-gray-600 text-sm">
            {selectedField?.value === null ? 'null' : selectedField?.value?.toString() ?? 'Undefined'}
          </p>
        </div>
      </div>
      <p>Response</p>
      <div className="border border-gray-700 rounded p-4">{renderJSONNode(jsonData)}</div>
    </div>
  );
};

export default JSONExplorer;
