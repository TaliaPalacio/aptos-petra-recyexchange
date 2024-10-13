// pages/api/chats/[recyclingId].ts

import { NextApiRequest, NextApiResponse } from 'next';

// Simulando una base de datos en memoria (puedes reemplazar esto por una conexión real a tu base de datos)
const chatsDB: { [key: string]: { topic: string; message: string }[] } = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { recyclingId }, // Obtener el recyclingId de la URL
        body,
        method,
    } = req;

    // Manejar la solicitud POST
    if (method === 'POST') {
        const { topic, message } = body;

        // Verificar si hay un recyclingId válido
        if (!recyclingId || typeof recyclingId !== 'string') {
            return res.status(400).json({ success: false, message: 'Invalid recycling ID' });
        }

        // Agregar el chat a la base de datos simulada
        if (!chatsDB[recyclingId]) {
            chatsDB[recyclingId] = []; // Inicializar el array si no existe
        }
        
        chatsDB[recyclingId].push({ topic, message }); // Guardar el mensaje

        return res.status(200).json({
            success: true,
            recyclingId,
            topic,
            message,
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
}
