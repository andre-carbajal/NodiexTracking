const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const rawShipmentStats = await prisma.despacho.findMany({ select: { estadoActual: true, fechaRegistro: true } });
    
    const statusCounts = {};
    const timelineCounts = {};
    
    rawShipmentStats.forEach(s => {
      const estado = s.estadoActual === "registrado" ? "Registrado" : s.estadoActual === "transito" ? "En tránsito" : "Entregado";
      statusCounts[estado] = (statusCounts[estado] || 0) + 1;
      
      if (s.fechaRegistro) {
        const date = new Date(s.fechaRegistro);
        const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        timelineCounts[month] = (timelineCounts[month] || 0) + 1;
      }
    });
    
    const chartsData = {
      statusData: Object.entries(statusCounts).map(([name, value]) => ({ name, value })),
      timelineData: Object.entries(timelineCounts).sort((a,b) => a[0].localeCompare(b[0])).map(([month, despachos]) => ({ month, despachos }))
    };
    
    console.log("Success:", chartsData);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
