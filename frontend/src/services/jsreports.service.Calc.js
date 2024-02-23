import jsreports from '@jsreport/browser-client';
jsreports.serverUrl = 'http://http://localhost:5488/';

async function ReportsCalc(email) {
    try {
        const data = { email };
        const report = await jsreports.render({
            template: {
                shortid: 'ZWQR_BxAk',
            }, 
            data: JSON.stringify(data)
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