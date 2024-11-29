import { useEffect, useState } from "react";
import "./App.css";
import RequestForm from "./components/requestForm/RequestForm";
import ResponseViewer from "./components/responseViewer/ResponseViewer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Aside from "./components/aside/Aside";

function App() {

  const [requests, setRequests] = useState([]);
  const [savedRequests, setSavedRequests] = useState({})
  const [loader, setLoader] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem("savedRequests")) || {};
    setSavedRequests(requests);
  }, [])

  const addRequest = () => {
    const newRequest =  {
        id: Date.now()
      }
    setRequests((prev) => [
      ...prev,
      newRequest
    ]);
    setSelectedRequest(newRequest);
  }
  
  const showRequest = (req) => {
    const selectedReq = requests.find(
      (request) => request.id === req.id
    );

    console.log(req)

    if (selectedReq) {
      setSelectedRequest(selectedReq);
    } 
  }

  const handleSaveRequest = (request) => {
    const today = new Date().toISOString().split("T")[0];

    const updateRequests = {...savedRequests};

    if(!updateRequests[today]){
      updateRequests[today] = [];
    }

     const finder = updateRequests[today].find(
       (req) =>
         req.config.url == request.config.url &&
         req.config.method == request.config.method
     );

     if (!finder) {
       updateRequests[today].push({ id: Date.now(), ...request });
       setSavedRequests(updateRequests);
       localStorage.setItem("savedRequests", JSON.stringify(updateRequests));
     }
  }


const saveAndShowSavedReq = (request) => {
  setRequests((prev) => {
    const exists = prev.some((req) => req.id === request.id);
    if (exists) {
      console.log("La solicitud ya existe, solo se seleccionará.");
      return prev;
    }

    console.log("Nueva solicitud agregada:", request);
    return [...prev, request];
  });

  setSelectedRequest(request);
};

const removeFromRequests = (request) => {
   const filteredReq = requests.filter((req) => req.id !== request.id);

   if (selectedRequest?.id === request.id) {
     const lastRequest =
       filteredReq.length > 0 ? filteredReq[filteredReq.length - 1] : null;
     setSelectedRequest(lastRequest);
   }
    setRequests(filteredReq);
}

const deleteRequest = (request) => {

  removeFromRequests(request);

  const updatedRequests = { ...savedRequests };
  let dayOfReq = "";

  for (const day in updatedRequests) {
    if (updatedRequests[day].some((req) => req.id === request.id)) {
      dayOfReq = day;
      break; 
    }
  }

  if (dayOfReq) {
    updatedRequests[dayOfReq] = updatedRequests[dayOfReq].filter(
      (req) => req.id !== request.id
    );

    if (updatedRequests[dayOfReq].length < 1) {
      delete updatedRequests[dayOfReq];
    }

    setSavedRequests(updatedRequests);
    localStorage.setItem("savedRequests", JSON.stringify(updatedRequests));
  }

};



  const requestContent = selectedRequest && (
    <div key={selectedRequest.id} className="p-8">
      <RequestForm setLoader={setLoader} saveRequest={handleSaveRequest}/>
      {loader ? (
        <div className="flex justify-center items-center gap-4 mt-4">
          <p className="text-black dark:text-white">Cargando...</p>
          <div className="w-10 h-10 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <ResponseViewer response={selectedRequest.response} />
      )}
    </div>
  );

  return (
    <>
      <Aside
        savedRequests={savedRequests}
        onSaveAndShow={saveAndShowSavedReq}
        onDelete={deleteRequest}
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
          {requests.map((req) => (
            <button
              key={req.id}
              className={`p-3 mx-4 ${
                selectedRequest && req.id === selectedRequest.id
                  ? "bg-red-600"
                  : "bg-blue-500"
              }`}
              onClick={() => showRequest(req)}
            >
              URL
            </button>
          ))}

          {requestContent}

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default App;
