import { useEffect, useState } from "react";
import "./App.css";
import RequestForm from "./components/requestForm/RequestForm";
import ResponseViewer from "./components/responseViewer/ResponseViewer";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import Aside from "./components/aside/Aside";

function App() {
  const [requests, setRequests] = useState([
    { id: Date.now(), response: null, loading: false },
  ]);

  const [savedRequests, setSavedRequests] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedRequests")) || {};
    setSavedRequests(saved);
  }, [])
  

  const saveRequest = (requestData) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedRequests = {...savedRequests};

    if(!updatedRequests[today])
    {
        updatedRequests[today] = [];
    }

    console.log(
      requestData.id,
      requestData.response.config.url,
      requestData.response.config.method
    );

    const finder = updatedRequests[today].find(
      (e) =>
        e.response.config.url == requestData.response.config.url &&
        e.response.config.method == requestData.response.config.method
    );
    if(!finder){
      updatedRequests[today].push(requestData);
      localStorage.setItem("savedRequests", JSON.stringify(updatedRequests));
    }

  }

  const addRequest = () => {
    setRequests((prevRequests) => [
      ...prevRequests,
      { id: Date.now(), response: null, loading: false },
    ]);
  };

  const removeRequest = (id) => {
    setRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== id)
    );
    console.log(requests)
    // if (requests.length > 1) {
    // } else {
    //   toast.error("Debe haber al menos 1 solicitud");
    // }
  };

  const updateRequest = (id, updatedData) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, ...updatedData } : req
      )
    );
  };

  const loadSavedRequest = (requestData) => {
    setRequests((prevRequests) => [
      ...prevRequests,
      { id: Date.now(), ...requestData },
    ]);
  };

  const reqContent = requests.map(({ id, response, loading }) => (
    <div key={id} className="p-8">
      <RequestForm
        setResponse={(res) => {
          updateRequest(id, { response: res });
          saveRequest({
            ...requests.find((req) => req.id === id),
            response: res,
          });
        }}
        setLoader={(load) => updateRequest(id, { loading: load })}
        // removeRequest={() => removeRequest(id)}
        // requests={requests}
      />
      {loading ? (
        <div className="flex justify-center items-center gap-4 mt-4">
          <p className="text-black dark:text-white">Cargando...</p>
          <div className="w-10 h-10 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <ResponseViewer response={response} />
      )}
    </div>
  ));

  return (
    <>
      <Aside 
        savedRequests={savedRequests} 
        onRequestSelect={loadSavedRequest} 
        // requests={requests}
        removeRequest={removeRequest}
      />
      <div className="min-h-screen bg-gray-100/20 pl-96">
        <h1 className="text-2xl font-bold text-center py-4">
          Cliente HTTP - CodeFetch
        </h1>
        <div className="text-center mb-4">
          <button
            onClick={addRequest}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Nueva Solicitud
          </button>

          {reqContent}

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
