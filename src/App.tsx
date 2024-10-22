import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import "./App.css"
const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "",
  dotsOptions: {
    color: "#111",
    type: "rounded"
  }
});

export default function App() {

  const [url, setUrl] = useState("Ronit");
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef();

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  return (
    <div className="h-dvh w-full flex flex-col gap-10 justify-center items-center">
      <div className="flex gap-10">
        <input
          onChange={onUrlChange}
          value={url}
          type="text"
          placeholder="Write here..."
          className="bg-gray-300 outline outline-3 outline-offset-2 outline-yellow-400 rounded-lg p-3" />
        <select
          className="bg-gray-300 outline outline-3 outline-offset-2 outline-yellow-400 rounded-lg px-3"
          onChange={onExtensionChange}>
          <option className="" value="png">PNG</option>
          <option className="" value="jpeg">JPEG</option>
          <option className="" value="webp">WEBP</option>
        </select>
        <button
          className="bg-gray-300 outline outline-3 outline-offset-2 outline-yellow-400 rounded-lg px-3"
          onClick={onDownloadClick}>Download</button>
      </div>
      <div ref={ref} />
    </div>
  );
}

