/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "../label/Label";
import BodyField from "../formComponents/bodyField/BodyField";
import HeaderOptions from "../formComponents/headerOptions/HeaderOptions";
import InputField from "../formComponents/inputField/InputField";

function RequestForm({ setLoader, onSave, setResponse, data}) {
  const [url, setUrl] = useState(data.url ?? "");
  const [param, setParam] = useState("");
  const [method, setMethod] = useState(data.method ?? "GET");
  const [headers, setHeaders] = useState(JSON.stringify(data.headers) ? JSON.stringify(data.headers) : "");
  const [authToken, setAuthToken] = useState("");
  const [body, setBody] = useState("");
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [activeOption, setActiveOption] = useState("");

  const toggleHeader = (headerKey) => {
    setSelectedHeaders((prev) =>
      prev.includes(headerKey)
        ? prev.filter((key) => key !== headerKey)
        : [...prev, headerKey]
    );
  };

  const headerOptions = [
    { key: "Content-Type", value: "application/json" },
    { key: "Accept", value: "application/json" },
    { key: "User-Agent", value: "MyApp/1.0" },
    { key: "Cache-Control", value: "no-cache" },
  ];

  const selectedOption = () => {
    switch (activeOption) {
      case "headers":
        return (
          <HeaderOptions
            headerOptions={headerOptions}
            selectedHeaders={selectedHeaders}
            toggleHeader={toggleHeader}
            headers={headers}
            setHeaders={setHeaders}
          />
        );
      case "param":
        return (
          <InputField
            value={param}
            onChange={(e) => setParam(e.target.value)}
            label="Parámetro (si necesitas algún recurso específico)"
            placeholder="?=blanco"
          />
        );
      case "authToken":
        return (
          <InputField
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            label="Token de autenticación"
            placeholder="Bearer Token"
          />
        );
      case "body":
        return (
          <BodyField
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        );
      default:
        return null;
    }
  };
  
  const options = ["headers", "param", "authToken", "body"];

  const renderOptions = options.map((option, index) => (
    <div key={index} className="shadow-sm border">
      <button
        type="button"
        onClick={() => setActiveOption(option)}
        className={`w-full hover:bg-gray-200 transition-colors py-2 ${
          activeOption == option ? "bg-gray-300" : ""
        }`}
      >
        {option}
      </button>
    </div>
  ));

  const handleRequest = async (e) => {
    e.preventDefault();
    if (url === "") {
      toast.error(
        `Error: Debe ingresar un endpoint para poder hacer una consulta`
      );
      return;
    }

    try {
      setLoader(true);
      const parsedHeaders = JSON.parse(headers || "{}");
      selectedHeaders.forEach((headerKey) => {
        const headerOption = headerOptions.find((h) => h.key === headerKey);
        if (headerOption) {
          parsedHeaders[headerKey] = headerOption.value;
        }
      });
      if (authToken) {
        parsedHeaders["Authorization"] = `Bearer ${authToken}`;
      }

      const config = {
        method,
        url: param ? `${url}/${param}` : url,
        headers: parsedHeaders,
        data: body ? JSON.parse(body) : undefined,
      };

      const res = await axios(config);

  
      if (res.headers.get("Content-Type") === "application/json") {
        onSave(res);
        setResponse(res);
        setActiveOption("");
        toast.success("Petición exitosa");
      }

    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form onSubmit={handleRequest} className="mb-4 h-fit ">
      <div className="grid grid-cols-12">
        <div className="mb-2 col-span-1">
          <Label>Método</Label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border rounded uppercase"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>
        <div className="mb-2 col-span-10">
          <Label>URL</Label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://api.example.com"
          />
        </div>
        <div className="mb-2 flex items-end col-span-1">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 w-full"
          >
            Enviar
          </button>
        </div>
      </div>

      <div className="mt-2">
        <div className="grid grid-cols-4 mb-6">{renderOptions}</div>

        {activeOption != "" && selectedOption()}
      </div>

      {/* <div className="mb-2">
          <Label>Parámetro (sólo si necesitas un recurso en específico)</Label>
          <input
            type="text"
            value={param}
            onChange={(e) => setParam(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="1, zapato, etc"
          />
        </div>

        <div className="mb-2">
          <Label>Token de Autenticación (opcional)</Label>
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Bearer Token"
          />
        </div>

        <div className="mb-2">
          <Label>Cabeceras estándar</Label>
          <div className="grid grid-cols-2 gap-2">
            {headerOptions.map((header) => (
              <label key={header.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedHeaders.includes(header.key)}
                  onChange={() => toggleHeader(header.key)}
                  className="mr-2"
                />
                {header.key} ({header.value})
              </label>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <Label>Cabeceras personalizadas (JSON)</Label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full p-2 border rounded  min-h-20"
            placeholder='{ "" }'
          ></textarea>
        </div>

        {["POST", "PUT"].includes(method) && (
          <div className="mb-2">
            <Label>Cuerpo (JSON)</Label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border rounded min-h-20"
              placeholder='{ "key": "value" }'
            ></textarea>
          </div>
        )} */}
    </form>
  );
}

export default RequestForm;
