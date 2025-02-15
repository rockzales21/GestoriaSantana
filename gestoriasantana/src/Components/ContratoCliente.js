// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Paper, Typography, Box, Button } from '@mui/material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import html2pdf from 'html2pdf.js';

// import '../styles/print.css'; // Importa el archivo CSS de impresión


// const commonStyles = {
//   bgcolor: 'background.paper',
//   m: 1,
//   border: 'none',
//   width: 'auto',
//   height: 'auto',
//   boxShadow: 'none',
// };

// const buttonStyles = {
//   minWidth: '100px',
//   marginRight: '8px',
// };
// const ContratoCliente = ({ cliente }) => {
// //   const { id } = useParams(); // Obtienes el id del asesor desde la URL
// //   const [asesor, setAsesor] = useState(null);
// //   const [pdfGenerated, setPdfGenerated] = useState(false); // Estado para controlar la generación del PDF

// //   useEffect(() => {
// //     const fetchAsesor = async () => {
// //       try {
// //         const response = await fetch(`https://gestoriasantana-production.up.railway.app/clientes/cliente/${id}`);
// //         const data = await response.json();
// //         if (response.ok) {
// //           setAsesor(data);
// //           console.log('Datos del asesor:', data);
// //         } else {
// //           console.error('Error al cargar los datos del asesor');
// //         }
// //       } catch (error) {
// //         console.error('Error:', error);
// //       }
// //     };

// //     fetchAsesor();
// //   }, [id]);

// //   useEffect(() => {
// //     if (asesor && !pdfGenerated) {
// //       generatePDF();
// //       setPdfGenerated(true); // Marcar que el PDF ya ha sido generado
// //     }
// //   }, [asesor, pdfGenerated]);

// //   if (!asesor) {
// //     return <div>Cargando...</div>;
// //   }

// //   const generatePDF = () => {
// //     const nombreCompleto = `${asesor.nombre}`;
// //     const input = document.getElementById('printableArea');

// //     const options = {
// //       margin: [10, 10, 10, 10],
// //       filename: `contrato_${nombreCompleto}.pdf`,
// //       image: { type: 'jpeg', quality: 1 },
// //       html2canvas: { scale: 3, letterRendering: false, useCORS: true },
// //       jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
// //       pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
// //     };

// //     html2pdf().set(options).from(input).toPdf().get('pdf').then((pdf) => {
// //       const totalPages = pdf.internal.getNumberOfPages();
// //       const pageWidth = pdf.internal.pageSize.getWidth();
// //       const footerText = 'C. CUERNAVACA NO. 47 COND CUAHUNAHUAC  CUERNAVACA MORELOS 7772167527';

// //       for (let i = 1; i <= totalPages; i++) {
// //         pdf.setPage(i);
// //         pdf.setFontSize(10);
// //         const textWidth = pdf.getTextDimensions(footerText).w;
// //         const xPosition = (pageWidth - textWidth) / 2;
// //         pdf.text(footerText, xPosition, pdf.internal.pageSize.getHeight() - 10);
// //       }
// //     }).save();
// //   };
// //     // Concatenar los datos del nombre completo
// //     const nombreCompleto = `${asesor.nombre}`;

    
  
  
// //     return (
// //       <div style={{ padding: '0px' }}>
// //         <div id="printableArea">
// //         <Paper sx={{ padding: '0px' }}>
// //           {/* <Typography variant="h6" gutterBottom> */}
// //           <div  style={{ width: '700px', margin: '0 auto' }}>

// //           <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES</strong>
// //           </Typography>
          
// //           {/* <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}> */}
// //           <p style={{ textAlign: 'justify' }}>
// //             Que celebran, por una parte, el consultor financiero y de seguridad social <strong>Martha Margarita Santana Ceja</strong> quien en lo sucesivo se le denominara “El Profesionista”, y por otra parte <strong>{nombreCompleto}</strong> la quien e n lo sucesivo se le denominara como “El Cliente” y de manera conjunta como “Las Partes”, de conformidad con las declaraciones y clausulas.
// //             </p>
// //           {/* </Typography> */}

// //           <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>DECLARACIONES</strong>
// //           </Typography>

// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           <strong>I.-</strong> DEL PROFESIONISTA
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>1.1.-</strong> Llamarse tal y como ha quedado asentado en el proemio del presente contrato.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>1.2.-</strong> Ser persona física, mayor de edad y contar con capacidad legal plena para obligarse a nombre y por cuenta propia a lo establecido en el presente contrato.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>1.3.-</strong> Que tiene su domicilio para el ejercicio profesional de asesoría y gestoría financiera y legal en Calle Cuernavaca no. 47 condominios Cuauhnáhuac en Cuernavaca Morelos.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>1.4.-</strong> Que está facultado para prestar los servicios financieros y legales en materia del presente Contrato y que, por lo mismo, cuenta con la capacidad técnica y operativa suficiente para llevar a cabo el cumplimiento del objeto de este Contrato.
// //           </Typography>


// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           <strong>II.-</strong> DEL CLIENTE
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>2.1.-</strong> Llamarse tal y como ha quedado asentado en el proemio del presente contrato.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>2.2.-</strong> Ser persona física, mayor de edad y contar con capacidad legal plena para obligarse a nombre y por cuenta propia a lo establecido en el presente contrato.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>2.3.-</strong> Contar con numero de seguridad social (NSS): {asesor.nss}
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>2.4.-</strong> Contar con número de CURP: {asesor.curp}
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>2.5.-</strong> Tener su domicilio ubicado en {asesor.direccion_completa}, CP {asesor.codigo_postal}
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>2.6.-</strong> Que es su libre voluntad la celebración de este contrato y que no tiene impedimento alguno para ello, aceptando que el servicio de asesoría financiera y materia legal del mismo está sujeto a la legislación aplicable.
// //           </Typography>

// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           <strong>III.-</strong> DE LAS PARTES
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>3.1.-</strong> Que es su libre voluntad la celebración de este contrato y que no tienen impedimento alguno para ello, aceptando que el servicio de asesoría financiera y legal materia de este, está sujeto a la legislación aplicable.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>3.2.-</strong> Que se reconocen con capacidad jurídica suficiente para obligarse recíprocamente en virtud de lo anterior se someten a lo establecido en la siguientes clausulas.
// //           </Typography>
// //           <br/>
// //           <br/>
// //           <br/><br/>
// //           <br/>
// //           <br/>

// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           <strong>CLAUSULAS</strong>
// //           </Typography>


// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>PRIMERA.–</strong> en TERMINOS DEL SERVICIO En virtud del presente contrato EL PROFESIONISTA se obliga a prestar a EL CLIENTE, los siguientes servicios profesionales independientes: ASESORIA Y CONSULTORIA DE SERVICIOS ADMINISTRATIVOS. Los trabajos resultantes de la prestación de servicios profesionales independientes antes referidos serán entregados por EL PROFESIONISTA de acuerdo con el plan de actividades y entregas que para tal efecto acuerdan las partes. 
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>SEGUNDA.–</strong> DISPOSICIÓN DEL SERVICIO EL PROFESIONISTA desarrollará las actividades que por el presente instrumento se le encomiendan en la forma, términos y con los materiales y/o herramientas que estime convenientes, de acuerdo con los conocimientos que, como profesional de la materia, ha adquirido y posee. 
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>TERCERA.–</strong> HONORARIOS DE SERVICIO EL CLIENTE se obliga a pagar a EL PROFESIONISTA sus servicios de Honorarios por:
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             ASESORIA Y CONSULTORIA:        $ _____________
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             +SERVICIOS ADMINISTRATIVOS: $ _____________     
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             Total, a recibir por servicios de Honorarios la cantidad de $ ___________
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             (___________________________________________________________ 00/100 M.N). 
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           Que será cubierta en una exhibición al término de los servicios prestados. El lugar para la recepción del cobro será Calle Cuernavaca no. 47 Cond. Cuauhnáhuac C.P. 62430 Cuernavaca Morelos O DONDE LAS PARTES ACUERDEN.
// //           </Typography>

// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>CUARTA.–</strong> VIGENCIA DEL SERVICIO Se estipula que la vigencia del presente contrato será a partir de la fecha de firma del presente documento y hasta que se concluya los servicios a realizarse; no más de un promedio máximo de 70 días naturales una vez firmado el contrato de servicios, plazo que podrá prorrogarse, previo acuerdo entre las partes siempre y cuando se presente la información completa y correcta.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             EL PROFESIONISTA se obliga a informar periódicamente al CLIENTE el resultado de sus gestiones, lo que podrá hacer de manera personal, o a través de cualquier medio de comunicación que las partes acuerden, siempre que quede un registro del cumplimiento de esta obligación.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>QUINTA.-</strong> EL CLIENTE acepta recibir exclusivamente del PROFESIONISTA los servicios profesionales contratados en el presente escrito.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             EL CLIENTE podrá pedir dentro de la vigencia del contrato y cuantas veces lo requiera, la asesoría a que se refiere la presente clausula.
// //           </Typography>

// //           <br/>
// //           <br/>
// //           <br/>
// //           <br/>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>SEXTA.–</strong> Son causal de terminación del presente contrato las siguientes: 
// //           </Typography>


// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           a.- Por haberse cumplido el OBJETO del contrato, 
// //           </Typography>

          

// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           b.- Por muerte o incapacidad física permanente de cualquiera de las PARTES.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           c.- Por que el cliente se active antes de la terminación del contrato al IMSS como trabajador 
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           Cuando cualquiera de las PARTES lo solicite a la otra sin mayores requisitos que el aviso se realice por escrito y notifique a la otra parte con 15 días de anticipación y siempre y cuando no existan obligaciones pendientes de cumplimiento.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>SEPTIMA.–</strong> Son causales de recisión de contrato las siguientes:
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           a.- El incumplimiento de las obligaciones de cualquiera de las PARTES conforme a lo establecido en el presente contrato.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           b. – Para el caso de rescisión, la parte cliente se obliga a pagar a la parte afectada la cantidad de $2,000.00 (DOS Mil Pesos 00/100 M.N.) por concepto de pena convencional.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>OCTAVA.–</strong> Ambas partes manifiestan que, para el caso de interpretación, cumplimiento y resolución del presente contrato se someten a la competencia de los Tribunales de la Ciudad de Cuernavaca, Morelos, renunciando a la que pudiera corresponderles con motivo del domicilio presente o futuro.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //             <strong>NOVENA.–</strong> Política de Privacidad y Confidencialidad. 
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           Los datos, documentos e información personal que el “CLIENTE” proporcione al “PROFESIONISTA” serán utilizados única y exclusivamente para lo estipulado en el presente contrato y serán resguardados en calidad de confidencial.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           El CLIENTE se compromete a no divulgar los datos del proceso realizado por EL PROFESIONISTA mientras este en curso ni al finalizar el mismo, así como los costos y la información interna que se le proporcione a EL CLIENTE.
// //           </Typography>
// //           <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
// //           En señal de expresa conformidad y aceptación de los términos del presente contrato, y enteradas LAS PARTES de su contenido y alcances, lo firman por duplicado en Cuernavaca, Morelos el día ____   de diciembre    del 202_.
// //           </Typography>



// //           <div className="grid grid-cols-2 gap-4 mt-5">
// //                 <div className="text-left">
// //                 <Typography variant="body1">
// //                         _____________________________
// //                     </Typography>
// //                     <br/><br/>
// //                     <Typography variant="body1">
// //                     {nombreCompleto}
// //                     </Typography>
// //                 </div>
// //                 <div className="text-right">
// //                 <Typography variant="body1">
// //                 _____________________________
// //                     </Typography>
// //                     <br/><br/>
// //                     <Typography variant="body1">
// //                         Lic. Martha Margarita Santana Ceja
// //                     </Typography>
                    
// //                 </div>
// //             </div>

// //           {/* Continua con las siguientes cláusulas */}
// // <br/><br/>
          
// //           </div>
// //           </Paper>
// //       </div>
      
// //     </div>
      
// //     );
// //   };

// export default ContratoCliente;
