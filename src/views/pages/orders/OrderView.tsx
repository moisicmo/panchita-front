import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import { ExpandMore } from "@mui/icons-material";
import io from 'socket.io-client';
import { SyntheticEvent, useEffect, useState } from "react";
import { OrderByBranchOffice } from "."
import { useBranchOfficeStore, useOrderStore } from "@/hooks";
import { BranchOfficeModel } from "@/models";
import { getEnvVariables } from "@/helpers";


export const OrderView = () => {
  const { branchOffices = [], getBranchOffices } = useBranchOfficeStore();
  const [expanded, setExpanded] = useState<string | false>(false);
  const { addOrder,removeOrderSocket } = useOrderStore();
  const { VITE_HOST_BACKEND } = getEnvVariables();

  useEffect(() => {
    getBranchOffices();
  }, [])
  
  useEffect(() => {
    // Conectar al servidor Socket.IO
    const socket = io(VITE_HOST_BACKEND);

    // Manejar eventos del socket aquí
    socket.on('connect', () => {
      console.log('Conectado al servidor de Socket.IO');
    });

    // Manejar eventos de desconexión
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de Socket.IO');
    });

    // Escuchar el mensaje enviado desde el servidor
    socket.on('newOrder', (message) => {
      const newOrder = JSON.parse(message);
      addOrder(newOrder);
    });

    socket.on('dispatchOrder', (orderId) => {
      console.log('dispatch',orderId)
      removeOrderSocket(orderId);
    });

    return () => {
      socket.disconnect();
    };
    
  }, []);


  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Typography variant="h6">Entregas</Typography>
      {
        branchOffices.map((branchOffice: BranchOfficeModel) => {
          return (
            <Accordion
              key={`${branchOffice.id}`}
              expanded={branchOffices.length == 1 ? true : expanded === `${branchOffice.id}`}
              onChange={handleChange(`${branchOffice.id}`)}
              defaultExpanded={branchOffices.length > 0}
            >
              <AccordionSummary expandIcon={<ExpandMore />} >
                <Typography>{`${branchOffice.name}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
              {
                (expanded === `${branchOffice.id}`) &&
                <OrderByBranchOffice
                  branchOfficeId={branchOffice.id}
                />
              }
              </AccordionDetails>
            </Accordion>)
        })
      }
    </>
  )
}
