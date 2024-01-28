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
  path: string;
  value: JSONPrimaryValue;
};

export type JSONExplorerProps = {
  jsonData: JSONValue;
};

const JSONExplorer = ({ jsonData }: JSONExplorerProps) => {
  const [selectedField, setSelectedField] = useState<SelectedField | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [collapsedList, setCollapsedList] = useState<Record<string, boolean>>({});

  const handleKeyClick = (path: string, value: JSONPrimaryValue) => {
    setSelectedField({ path, value });
    setInputValue(`${path}`);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const path = event.target.value;
    const value = getValueByPath(path, jsonData);
    setSelectedField({ path, value });
    setInputValue(path);
  };

  const handleToggle = (path: string, expanded: boolean) => {
    setCollapsedList({
      ...collapsedList,
      [path]: !expanded,
    })
  };

  const renderJSONNode = (data: JSONValue, label = '', path = '') => {
    if (Array.isArray(data)) {
      return (
        <div key={path}>
          {label && (
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-300"
              onClick={() => handleToggle(path, collapsedList[path])}
            >
              <div
                className=""
              >
                {/*{expandedList[path] ? '-' : '+'}*/}
              </div>
              <span>
                {label}:&nbsp;
                {collapsedList[path] && `${Parenthesis.ArrayOpened} ... ${Parenthesis.ArrayClosed}`}
              </span>
            </div>
          )}
          {!collapsedList[path] && (
            <>
              {Parenthesis.ArrayOpened}
              <div className="border-l border-gray-400 pl-8">
                {data.map((item, index) => (
                  renderJSONNode(item, `[${index}]`, `${path}[${index}]`)
                ))}
              </div>
              {Parenthesis.ArrayClosed},
            </>
          )}
        </div>
      );
    } else if (typeof data === 'object' && data !== null) {
      return (
        <div key={path}>
          {label && !label.match(KeyCheckRegex.ArrayIndex) && (
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-300"
              onClick={() => handleToggle(path, collapsedList[path])}
            >
              <div
                className=""
              >
                {/*{expandedList[path] ? '-' : '+'}*/}
              </div>
              <span>
                {label}:&nbsp;
                {collapsedList[path] && `${Parenthesis.ObjectOpened} ... ${Parenthesis.ObjectClosed}`}
              </span>
            </div>
          )}
          {!collapsedList[path] && (
            <>
              {Parenthesis.ObjectOpened}
              <div className="border-l border-gray-400 pl-8">
                {Object.keys(data).map((key) => (
                  renderJSONNode(data[key], key, path ? `${path}.${key}` : key)
                ))}
              </div>
              {Parenthesis.ObjectClosed},
            </>
          )}
        </div>
      );
    } else {
      return (
        <div
          key={path}
          className={`node-item group cursor-pointer hover:bg-gray-300 ${selectedField?.path === path && 'bg-gray-300'}`}
          onClick={() => handleKeyClick(path, data)}
        >
          <span className="text-blue-600">{label}:</span>
          <span className={`ml-2 ${formatValueStyle(data)}`}>{formatValue(data)}</span>
          ,
        </div>
      );
    }
  };

  return (
    <div className="json-explorer">
      <div className="mb-8">
        <p className="mb-2">Property</p>
        <input
          className="border rounded outline-none p-2 w-full"
          placeholder="Property"
          value={`${inputValue}`}
          onChange={handleInputChange}
        />
        <p className="mt-1 text-gray-600 text-sm">
          {selectedField?.value === null ? 'null' : selectedField?.value?.toString() ?? 'Undefined'}
        </p>
      </div>
      <p>Response</p>
      <div className="data-panel border border-gray-700 rounded p-6">{renderJSONNode(jsonData)}</div>
    </div>
  );
};

export default JSONExplorer;
