import jsreports from '@jsreport/browser-client';

jsreports.serverUrl = 'http://http://localhost:5488/';

async function ReportsGraphic() {
    try {
        const report = await jsreports.render({
            template: {
                shortid: 'gCY8vQOVx',
            }
        });

        report.openInWindow({ tittle: "Reporte con grafico"}, '_blank');
        return report;
    }
    catch (error){
        if (error && error.reponse && error.reponse.data){
            console.error("Error al crear el informe",error.response.data);
        } else{
            console.error("Error inesperado", error);
            throw error;
        }
    }
}

export default ReportsGraphic;