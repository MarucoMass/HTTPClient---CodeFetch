import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function RequestForm({ setResponse, setLoader, removeRequest, requests = []}) {
  const [url, setUrl] = useState("");
  const [param, setParam] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [body, setBody] = useState("");
  const [selectedHeaders, setSelectedHeaders] = useState([]);

  const headerOptions = [
    { key: "Content-Type", value: "application/json" },
    { key: "Accept", value: "application/json" },
    { key: "User-Agent", value: "MyApp/1.0" },
    { key: "Cache-Control", value: "no-cache" },
  ];

  const toggleHeader = (headerKey) => {
    setSelectedHeaders((prev) =>
      prev.includes(headerKey)
        ? prev.filter((key) => key !== headerKey)
        : [...prev, headerKey]
    );
  };

  const handleRequest = async (e) => {
    e.preventDefault();

    if (url === "") {
      toast.error(`Error: Debe ingresar un endpoint para poder hacer una consulta`);
      return;
    }

    try {
      setLoader(true);
      const parsedHeaders =  JSON.parse(headers || "{}");
      selectedHeaders.forEach((headerKey) => {
        const headerOption = headerOptions.find((h) => h.key === headerKey);
        if (headerOption) {
          parsedHeaders[headerKey] = headerOption.value;
        }
      });
      if (authToken)
      {
        parsedHeaders["Authorization"] = `Bearer ${authToken}`;
      }

      const config = {
        method,
        url: param ? `${url}/${param}` : url,
        headers: parsedHeaders,
        data: body ? JSON.parse(body) : undefined,
      };
      console.log(config);
      const res = await axios(config);
    
      setResponse(res);
      toast.success("Petición exitosa");
    } catch (err) {
      setResponse(err.response);
      toast.error(`Error: ${err.message}`);
    } finally {
        setLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleRequest}
      className="bg-white p-4 rounded shadow-md mb-4 h-fit flex flex-col"
    >
      <fieldset>
        <legend>aca va la url</legend>
        {requests.length > 1 && (
          <button
            onClick={removeRequest}
            className="self-end bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            X
          </button>
        )}
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="https://api.example.com"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Parámetro (sólo si necesitas un recurso en específico)
          </label>
          <input
            type="text"
            value={param}
            onChange={(e) => setParam(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="1, zapato, etc"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Método</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Token de Autenticación (opcional)
          </label>
          <input
            type="text"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Bearer Token"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Cabeceras estándar
          </label>
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
          <label className="block text-sm font-medium mb-1">
            Cabeceras personalizadas (JSON)
          </label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full p-2 border rounded  min-h-20"
            placeholder='{ "" }'
          ></textarea>
        </div>

        {["POST", "PUT"].includes(method) && (
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Cuerpo (JSON)
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border rounded min-h-20"
              placeholder='{ "key": "value" }'
            ></textarea>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </fieldset>
    </form>
  );
}

export default RequestForm;
