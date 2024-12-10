import React, { useState } from "react";
import initialData from "./data/data.json";
import FolderStructure from "./Folder";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";

const App = () => {
  const [data, setData] = useState(initialData);

  const promptInput = (message) => {
    const input = prompt(message);
    return input && input.trim() ? input : null;
  };

  const addFolder = () => {
    const folderName = promptInput("Enter the name of the new folder:");
    if (folderName) {
      if (folderName.includes(".")) {
        alert("Folder names cannot include file extensions.");
      } else {
        setData((prevData) => ({ ...prevData, [folderName]: {} }));
      }
    }
  };

  const addFile = () => {
    const fileName = promptInput("Enter the name of the new file (with extension):");
    if (fileName) {
      setData((prevData) => {
        const updatedData = { ...prevData };
        updatedData.RootFiles = [...(updatedData.RootFiles || []), fileName];
        return updatedData;
      });
    }
  };

  const addFileToFolder = (folderPath) => {
    const fileName = promptInput(`Enter the name of the file to add in "${folderPath}":`);
    if (fileName) {
      const updatedData = { ...data };
      const keys = folderPath.split("/");

      const traverse = (obj, keysArr) => {
        const key = keysArr[0];
        if (keysArr.length === 1) {
          if (!obj[key]) obj[key] = [];
          if (Array.isArray(obj[key])) {
            obj[key].push(fileName);
          } else {
            alert("Cannot add a file to a non-folder structure!");
          }
        } else {
          traverse(obj[key], keysArr.slice(1));
        }
      };

      traverse(updatedData, keys);
      setData(updatedData);
    }
  };

  const deleteItem = (parentKey, itemKey) => {
    const updatedData = { ...data };

    if (parentKey) {
      delete updatedData[parentKey][itemKey];
    } else {
      delete updatedData[itemKey];
    }

    setData(updatedData);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" , gap:"15px" }}>
        <h4>Folder Structure</h4>
        <div style={{ display: "flex", alignItems:"center" }}>
          <AiOutlineFolderAdd onClick={addFolder} style={{ cursor: "pointer", fontSize: "20px", gap: "5px" }} />
          <AiOutlineFileAdd onClick={addFile} style={{ cursor: "pointer", fontSize: "15px" }} />
        </div>
      </div>
      {Object.keys(data).map((key) => (
        <FolderStructure
          key={key}
          name={key}
          data={data[key]}
          parentKey={null}
          onDelete={deleteItem}
          onAddFileToFolder={addFileToFolder}
        />
      ))}
    </div>
  );
};

export default App;
