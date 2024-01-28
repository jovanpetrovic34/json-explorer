import JSONExplorer from './components/JSONExplorer';
import './App.css';
import React, {ChangeEvent, useState} from "react";
import {JSONValue} from "./components/JSONExplorer/resource";

const JSONData = {
  "date": "2021-10-27T07:49:14.896Z",
  "hasError": false,
  props: {
    gender: 'M',
    age: 30,
    skills: [
      {
        web: ['react', 'angular', 'mongodb'],
        DevOps: ['CI/CD', 'Github'],
      },
    ],
  },
  "favorite": null,
  "fields": [
    {
      "id": "4c212130",
      "prop": "iban",
      "value": "DE81200505501265402568",
      "hasError": false
    },
    {
      "id": "4c212131",
      "prop": "bob",
      "value": "DE81200505501263495834",
      "hasError": true,
      "names": [23, 34, 34, 44],
      "user": {
        "id": 23,
        "name": "Toms"
      }
    }
  ]
};
const App = () => {
  const [jsonData, setJsonData] = useState<JSONValue>(JSONData);
  const [loading, setLoading] = useState(false);

  const readJsonFile = (file: Blob) =>
    new Promise<JSONValue>((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.onload = event => {
        if (event.target) {
          resolve(JSON.parse(event.target.result as string))
        }
      }

      fileReader.onerror = error => reject(error)
      fileReader.readAsText(file)
    })

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setLoading(true);
      const parsedData = await readJsonFile(event.target.files[0])
      setLoading(false);
      setJsonData(parsedData);
    }
  };

  const handleReset = () => {
    setJsonData(JSONData);
  };

  return (
    <div className="p-16">
      <div className="flex items-center justify-end gap-2">
        <button
          className="border border-primary rounded py-1 px-4"
          disabled={loading}
          onClick={handleReset}>
          Reset
        </button>
        <input
          type="file"
          accept="application/JSON"
          onChange={handleFileChange}
        />
      </div>
      <JSONExplorer jsonData={jsonData} />
    </div>
  )
};

export default App;
