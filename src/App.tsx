import { ChangeEvent, useEffect, useRef, useState } from "react";
import QRCodeStyling, { FileExtension } from "qr-code-styling";
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
  const [fileExt, setFileExt] = useState("jpeg");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  const onUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt as FileExtension
    });
  };

  return (
    <div className="h-dvh w-full flex flex-col gap-10 justify-center items-center">
      <div className="flex sm:flex-row flex-col gap-10 items-center">
        <input
          onChange={onUrlChange}
          value={url}
          type="text"
          placeholder="Write here..."
          className="bg-gray-300 outline outline-3 outline-offset-2 outline-yellow-400 rounded-lg p-3" />
        <select
          className="bg-gray-300 outline outline-3 outline-offset-2 outline-yellow-400 rounded-lg px-3 sm:py-0 py-2"
          onChange={onExtensionChange}>
          <option className="" value="jpeg">JPEG</option>
          <option className="" value="png">PNG</option>
          <option className="" value="webp">WEBP</option>
        </select>
        <button
          className="bg-gray-300 outline outline-3 outline-offset-2 outline-yellow-400 rounded-lg px-3 sm:py-0 py-2"
          onClick={onDownloadClick}>Download</button>
      </div>
      <div ref={ref} />
    </div>
  );
}

