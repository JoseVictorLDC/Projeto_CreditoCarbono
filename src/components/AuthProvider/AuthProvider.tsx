import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";
import React from 'react';
import "./AuthProvider.css"

function AuthProvider({ children }: { children: React.ReactNode }) {
    const connectionStatus = useConnectionStatus();
    if (connectionStatus === "unknown") return <p className="CentroLogin"> Aguarde... </p>;
    if (connectionStatus === "connecting") return <p className="CentroLogin"> Conectando... </p>;
    if (connectionStatus === "connected") return <>{children}</>;
    if (connectionStatus === "disconnected") return <p className="CentroLogin"> Você não esta conectado a nenhuma carteira...</p>;

}

export default AuthProvider;