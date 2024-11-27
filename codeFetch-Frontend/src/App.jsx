// import { useState } from 'react'
// import './App.css'
// import RequestForm from './components/RequestForm';
// import ResponseViewer from './components/ResponseViewer';
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from 'react-toastify';

// function App() {
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const responseContent = loading ? (
//     <div className="flex justify-center items-center gap-4 mt-10">
//       <p className="text-black dark:text-white">Cargando...</p>
//       <div className="w-10 h-10 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
//     </div>
//   ) : (
//     <ResponseViewer response={response} />
//   )

//   return (
    
//       <div className="min-h-screen p-4 bg-gray-100">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl font-bold text-center mb-4">
//             Cliente HTTP - CodeFetch
//           </h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <RequestForm setResponse={setResponse} setLoader={setLoading} />
//             {responseContent}
//           </div>
//           <ToastContainer />
//         </div>
//       </div>
    
//   );
// }

// export default App
import { useState } from "react";
import "./App.css";
import RequestForm from "./components/RequestForm";
import ResponseViewer from "./components/ResponseViewer";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [requests, setRequests] = useState([
    { id: Date.now(), response: null, loading: false },
  ]);

  const addRequest = () => {
    setRequests((prevRequests) => [
      ...prevRequests,
      { id: Date.now(), response: null, loading: false },
    ]);
  };

  const removeRequest = (id) => {
    if (requests.length > 1) {
      setRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
    } else {
      toast.error("Debe haber al menos 1 solicitud");
    }
  };

  const updateRequest = (id, updatedData) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, ...updatedData } : req
      )
    );
  };

  const reqContent = requests.map(({ id, response, loading }) => (
    <div key={id} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <RequestForm
        setResponse={(res) => updateRequest(id, { response: res })}
        setLoader={(load) => updateRequest(id, { loading: load })}
        removeRequest={() => removeRequest(id)}
        requests={requests}
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
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">
          Cliente HTTP - CodeFetch
        </h1>
        <div className="text-center mb-4">
          <button
            onClick={addRequest}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar Nueva Solicitud
          </button>
        </div>
        <div className="">
          {reqContent}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
