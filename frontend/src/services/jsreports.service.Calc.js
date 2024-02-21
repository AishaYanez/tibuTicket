import jsreports from '@jsreport/browser-client';

jsreports.serverUrl = 'http://http://localhost:5488/';

async function ReportsCalc() {
    try {
        const report = await jsreports.render({
            template: {
                shortid: 'ZWQR_BxAk',
            }
        });

        report.openInWindow({ tittle: "Reporte con campo calculado"}, '_blank');
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

export default ReportsCalc;