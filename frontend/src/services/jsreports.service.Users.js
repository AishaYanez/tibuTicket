import jsreports from '@jsreport/browser-client';

jsreports.serverUrl = 'http://http://localhost:5488/';

async function ReportsUsers(email) {
    try {
        const data = { email };
        const report = await jsreports.render({
            template: {
                shortid: 'bOBx5cukr',
            }, 
            data: JSON.stringify(data)
        });
        report.openInWindow({ tittle: "Reporte de Usuarios"}, '_blank');
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

export default ReportsUsers;