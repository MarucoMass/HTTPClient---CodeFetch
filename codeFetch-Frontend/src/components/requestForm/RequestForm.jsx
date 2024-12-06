import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Label from "../label/Label";
import BodyField from "../formComponents/bodyField/BodyField";
import HeaderOptions from "../formComponents/headerOptions/HeaderOptions";
import InputField from "../formComponents/inputField/InputField";

const RequestForm = ({ setLoader, onSave, setResponse, data }) => {
  const [url, setUrl] = useState(data.url ?? "");
  const [param, setParam] = useState("");
  const [method, setMethod] = useState(data.method ?? "GET");
  const [authToken, setAuthToken] = useState("");
  const [body, setBody] = useState(data.body ?? "");
  const [selectedHeaders, setSelectedHeaders] = useState(data.headers ?? []);
  const [activeOption, setActiveOption] = useState("");

  // const toggleHeader = (headerKey) => {
  //   setSelectedHeaders((prev) =>
  //     prev.includes(headerKey.toLowerCase()) // Compara en minúsculas
  //       ? prev.filter((key) => key !== headerKey.toLowerCase())
  //       : [...prev, headerKey.toLowerCase()]
  //   );
  // };

  const toggleHeader = (headerKey) => {
    setSelectedHeaders((prev) => {
      // Si la cabecera ya existe, elimínala
      if (prev[headerKey]) {
        const { [headerKey]: _, ...rest } = prev; // Usamos desestructuración para eliminar la clave
        return rest;
      }
      // Si no existe, agrégala con un valor predeterminado
      return { ...prev, [headerKey]: headerOptions[headerKey] };
    });
  };
  
  const headerOptions = {
    "content-type": "application/json",
    accept: "application/json",
    "user-agent": "MyApp/1.0",
    "cache-control": "no-cache",
  };
  // const headerOptions = [
  //   { key: "Content-Type", value: "application/json" },
  //   { key: "Accept", value: "application/json" },
  //   { key: "User-Agent", value: "MyApp/1.0" },
  //   { key: "Cache-Control", value: "no-cache" },
  // ];


  const selectedOption = () => {
    switch (activeOption) {
      case "headers":
        return (
          <HeaderOptions
            headerOptions={headerOptions}
            selectedHeaders={selectedHeaders}
            toggleHeader={toggleHeader}
          />
        );
      case "param":
        return (
          <InputField
            value={param}
            onChange={setParam}
            label="Parámetro (si necesitas algún recurso específico)"
            placeholder="?=blanco"
          />
        );
      case "authToken":
        return (
          <InputField
            value={authToken}
            onChange={setAuthToken}
            label="Token de autenticación"
            placeholder="Bearer Token"
          />
        );
      case "body":
        return <BodyField value={body} onChange={setBody} />;
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
          activeOption === option ? "bg-gray-300" : ""
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
        "Error: Debe ingresar un endpoint para poder hacer una consulta"
      );
      return;
    }

    try {
      setLoader(true);
      // const parsedHeaders = {};

      // // Solo incluimos las cabeceras seleccionadas
      // selectedHeaders.forEach((headerKey) => {
      //   // Busca el valor correspondiente a la clave en el objeto headerOptions
      //   if (headerOptions[headerKey]) {
      //     parsedHeaders[headerKey] = headerOptions[headerKey];
      //   }
      // });

      const parsedHeaders = { ...selectedHeaders };

      if (authToken) {
        parsedHeaders["Authorization"] = `Bearer ${authToken}`;
      }

      const config = {
        method: method,
        url: param ? `${url}/${param}` : url,
        headers: parsedHeaders,
        data: body ? body : undefined,
      };

      const res = await axios(config);

      if (res.status === 200) {
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
    <form onSubmit={handleRequest} className="mb-4 h-fit">
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

        {activeOption !== "" && selectedOption()}
      </div>
    </form>
  );
};

export default RequestForm;
