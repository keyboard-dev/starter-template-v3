import { useEffect, useRef, useState } from 'react';

export function useWebSocket(
  connectCallback: () => WebSocket | null
) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;

  useEffect(() => {
    const connect = () => {
      if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
        console.error('Max reconnection attempts reached');
        return;
      }

      const socket = connectCallback();
      if (!socket) return;

      socket.onopen = () => {
        console.log('Connected to WebSocket');
        setWs(socket);
        reconnectAttemptsRef.current = 0;
      };

      socket.onclose = (event) => {
        setWs(null);
        // Don't reconnect on authentication failures
        if (event.code !== 1008) {
          console.log('WebSocket disconnected, attempting to reconnect...');
          reconnectAttemptsRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(connect, 3000);
        }
      };
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws) {
        ws.close();
      }
    };
  }, [connectCallback]);

  return ws;
} 