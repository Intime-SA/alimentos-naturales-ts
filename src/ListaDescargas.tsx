import React, { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface DeviceInfo {
  deviceInfo: {
    deviceType: string;
    language: string;
    screenResolution: string;
    userAgent: string;
  };
  email: string;
  ipAddress: string;
  location: string;
  name: string;
  telefono: string;
  timestamp: Timestamp; // Mantiene Timestamp para conversión
}

const TrakeoAlimentosNaturales: React.FC = () => {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const querySnapshot = await getDocs(
        collection(db, "trakeoAlimentosNaturales")
      );
      const deviceData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          deviceInfo: {
            deviceType: data.deviceInfo.deviceType,
            language: data.deviceInfo.language,
            screenResolution: data.deviceInfo.screenResolution,
            userAgent: data.deviceInfo.userAgent,
          },
          email: data.email,
          ipAddress: data.ipAddress,
          location: data.location,
          name: data.name,
          telefono: data.telefono,
          timestamp: data.timestamp, // Asegúrate de que sea del tipo correcto
        } as DeviceInfo;
      });
      setDevices(deviceData);
    };

    fetchDevices();
  }, []);

  // Convertir el timestamp a una fecha legible
  const convertTimestampToDate = (timestamp: Timestamp): string => {
    return timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "";
  };

  // Función para generar un color aleatorio
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="bg-[#2E2E2E] p-4 min-h-screen">
      <h2 className="text-lg font-semibold mb-4 text-white">
        {" "}
        {/* Cambié a blanco para resaltar */}
        Seguimiento de Dispositivos
      </h2>
      <img
        style={{ width: "30vw" }}
        src="https://firebasestorage.googleapis.com/v0/b/mayoristakaurymdp.appspot.com/o/Pesta%C3%B1aLogo%2FSinFondoLogo.png?alt=media&token=8a59df40-df50-4c65-8677-43a9fee55622"
        alt="logo atlantics"
      />
      <p className="text-sm text-gray-300 mb-4">
        {" "}
        {/* Cambié a un gris claro para mejor contraste */}
        Aquí puedes ver un registro de los dispositivos que han accedido a
        descargar el catalogo, incluyendo información sobre su tipo, ubicación y
        horario.
      </p>
      <ul role="list" className="divide-y divide-gray-600">
        {" "}
        {/* Cambié el color del divisor */}
        {devices.map((device, index) => (
          <li
            key={index}
            className="flex flex-col sm:flex-row justify-between gap-x-6 py-5"
          >
            <div className="flex min-w-0 gap-x-4">
              <div
                className="h-12 w-12 flex-none rounded-full flex items-center justify-center"
                style={{ backgroundColor: getRandomColor() }}
              >
                <span className="text-white font-bold">
                  {device.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-white">
                  {" "}
                  {/* Cambié a blanco para resaltar */}
                  {device.name}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                  {" "}
                  {/* Cambié a gris claro */}
                  {device.email}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                  {device.ipAddress}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-400">
                  {device.location}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  <br />
                  <time dateTime={device.timestamp?.toDate().toISOString()}>
                    {convertTimestampToDate(device.timestamp)}
                  </time>
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end mt-2 sm:mt-0">
              <p className="text-sm leading-6 text-gray-300">
                {" "}
                {/* Cambié a gris claro */}
                {device.deviceInfo.deviceType}
              </p>
              <p className="text-sm leading-6 text-gray-300">
                {device.deviceInfo.language}
              </p>
              <p className="text-sm leading-6 text-gray-300">
                {device.deviceInfo.screenResolution}
              </p>
              <p className="text-sm leading-6 text-gray-300">
                {device.deviceInfo.userAgent}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrakeoAlimentosNaturales;
