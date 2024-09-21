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
      const deviceData = querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as DeviceInfo)
      );
      setDevices(deviceData);
    };

    fetchDevices();
  }, []);

  // Convertir el timestamp a una fecha legible
  const convertTimestampToDate = (timestamp: Timestamp): string => {
    return timestamp ? new Date(timestamp.seconds * 1000).toLocaleString() : "";
  };

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {devices.map((device, index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt={device.name}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {device.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {device.email}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">
              {device.deviceInfo.deviceType}
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500">
              Last seen{" "}
              <time dateTime={device.timestamp?.toDate().toISOString()}>
                {convertTimestampToDate(device.timestamp)}
              </time>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TrakeoAlimentosNaturales;
