import React from "react";
import { FaFile, FaMusic, FaImage } from "react-icons/fa";

const getFileIcon = (fileName) => {
  if (fileName.endsWith(".dmg")) return <FaFile />;
  if (fileName.endsWith(".mp4")) return <FaMusic />;
  if (fileName.endsWith(".jpg")) return <FaImage />;
  return null;
};

const FolderStructure = ({ data, name, parentKey, onDelete, onAddFileToFolder }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleDelete = (e, key) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete "${key}"?`)) {
      onDelete(parentKey, key);
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      {name && (
        <div
          onClick={handleToggle}
          onContextMenu={(e) => handleDelete(e, name)}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <strong>{name}</strong>
        </div>
      )}
      {isOpen && (
        <div>
          {typeof data === "object" && !Array.isArray(data)
            ? Object.keys(data).map((key) => (
                <FolderStructure
                  key={key}
                  name={key}
                  data={data[key]}
                  parentKey={name}
                  onDelete={onDelete}
                  onAddFileToFolder={onAddFileToFolder}
                />
              ))
            : Array.isArray(data) &&
              data.map((file, idx) => (
                <div
                  key={idx}
                  onContextMenu={(e) => handleDelete(e, idx)}
                  style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
                >
                  {getFileIcon(file)}
                  <span style={{ marginLeft: "10px" }}>{file}</span>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default FolderStructure;
