import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, Typography, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import html2pdf from 'html2pdf.js';

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: "none", // Elimina los bordes
  width: 'auto',
  height: 'auto',
  boxShadow: "none", // Elimina las sombras
};

const buttonStyles = {
  minWidth: '100px',  // Establece un ancho mínimo para todos los botones
  marginRight: '8px', // Añade un margen entre los botones
};

const Asesores = () => {
  const [asesores, setAsesores] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentIdUsuario, setCurrentIdUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://gestoriasantana-production.up.railway.app/usuarios')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los asesores');
        }
        return response.json();
      })
      .then((data) => {
        setAsesores(data);
      })
      .catch((error) => {
        console.error('Error al obtener los asesores:', error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/asesores/editar/${id}`);
  };

  const openModal = (id_usuario) => {
    setCurrentIdUsuario(id_usuario);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setUsername('');
    setPassword('');
  };

  const handleCreateUser = async () => {
    if (username && password) {
      try {
        const response = await fetch('https://gestoriasantana-production.up.railway.app/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, id_usuario: currentIdUsuario }),
        });

        if (response.ok) {
          toast.success('Usuario creado con éxito', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'bg-green-500 text-white',
          });
          closeModal();
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: 'bg-red-500 text-white',
          });
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        toast.error('Error al crear el usuario', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'bg-red-500 text-white',
        });
      }
    } else {
      toast.warn('Nombre de usuario y contraseña son requeridos', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-yellow-500 text-white',
      });
    }
  };


  const handleContratoClick = async (asesor) => {
    try {
      const response = await axios.get(`https://gestoriasantana-production.up.railway.app/usuarios/${asesor.id_usuario}`);
      const asesorData = response.data;
      generatePDF(asesorData);
      generateSecondPDF(asesorData);
    } catch (error) {
      console.error("Error al cargar los detalles del cliente:", error);
    }
  };

  const generatePDF = (asesor) => {
    const nombreCompleto = `${asesor.nombres} ${asesor.apellido_p} ${asesor.apellido_m}`;
    const nombreCompletoMayus = `${nombreCompleto}`.toUpperCase();
    const domicilioCompleto = `${asesor.calle || ''}${asesor.numeroExterior ? ' #' + asesor.numeroExterior : ''}${
      asesor.numeroInterior ? ' #' + asesor.numeroInterior : ''
    }, ${asesor.ciudad || ''}, ${asesor.estado || ''}`.trim();

      const input = document.createElement('div');
      input.innerHTML = `
        <div style="width: 700px; margin: 0 auto; font-size: 15px;">
          <h6 style="text-align: justify; margin-bottom: 16px;">
            <strong>CONTRATO DE COMISIÓN MERCANTIL, QUE CELEBRAN, POR UNA PARTE: LA NEGOCIACIÓN “M SANTANA ASESORIAS” REPRESENTADA POR: MARTHA MARGARITA SANTANA CEJA, LA CUAL SERÁ DESIGNADA EN EL CURSO DE ESTE CONTRATO COMO “LA COMITENTE” Y POR LA OTRA PARTE {nombreCompletoMayus} A QUIEN SE LE DESIGNARÁ COMO “LA COMISIONISTA”, QUIENES HACEN LAS SIGUIENTES:</strong>
          </h6>
          <h6 style="text-align: justify; margin-bottom: 16px;">
            <strong>DECLARACIONES</strong>
          </h6>

          <p style="text-align: justify; margin-bottom: 16px;">
            <strong>I.-</strong> Declara <strong>LA COMITENTE “M SANTANA ASESORIAS” representada por la M en A. Martha Margarita Santana Ceja</strong>, ser un nombre para efectos comerciales, dedicada a las actividades de servicios de consultoría en administración, dada de alta ante el SAT con REGISTRO FEDERAL DE CONTRIBUYENTES SACM710414QL1 y tener su domicilio en Calle Cuernavaca #47 Condominios Cuauhnáhuac CP 62430, Cuernavaca Morelos.
          </p>
          <p style="text-align: justify; margin-bottom: 16px;">
            <strong>II.-</strong> Declara <strong>LA COMISIONISTA ${nombreCompleto}</strong> y tener su domicilio en <strong>C. ${domicilioCompleto}, CP ${asesor.codigo_postal}</strong>.
          </p>
          
          <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>III.-</strong> Ambas partes declaran estar de acuerdo en que para realizar con éxito el presente contrato, se sujetan a las siguientes:
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>CLAUSULAS</strong>
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                        <strong>PRIMERA.</strong> - La <strong>COMISIONISTA</strong> conviene en hacerse cargo de la venta de servicios, promoción y servicios que se enlistan anexas a éste, en la inteligencia de que las ventas, promociones o servicios que lleve a cabo <strong>LA COMISIONISTA</strong> serán realizadas de acuerdo con los precios, términos y condiciones de pago que <strong>LA COMITENTE</strong> señaló en la lista anexa a este contrato y que estará vigente hasta que otra lista la sustituya expresamente.
                        </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>SEGUNDA.</strong> - Ambas partes convienen, que la <strong>COMISIONISTA</strong> sólo tendrá a su cargo las ventas, promociones y servicios a que se refiere la cláusula anterior, en el territorio que comprende y en consecuencia no podrá realizar la venta, contratación o promoción de los artículos o servicios objeto de este contrato, en cualquier otro lugar de la República o fuera de ella, a menos que medie consentimiento de <strong>LA COMITENTE</strong>.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>TERCERA.</strong> - La <strong>COMISIONISTA</strong> queda en libertad para vender, promocionar o colocar servicios por su cuenta o por cuenta de terceros otros productos o servicios, que no sean de la naturaleza de los que venda, promocione o brinde servicios <strong>LA COMITENTE</strong>.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>CUARTA.</strong> - La <strong>COMISIONISTA</strong> manifiesta que cuenta con recursos y personal adecuado para realizar la venta y promoción de los servicios de la <strong>COMITENTE</strong>, pudiendo la <strong>COMISIONISTA</strong> presentarse o ausentarse cuando así lo desee, debido a que no está obligado a cumplir personalmente la comisión; asimismo, éste contrato no confiere exclusividad para ninguna de las partes, por lo cual la <strong>COMISIONISTA</strong> tiene plena libertad para contratar con otros comisionistas o comitentes y por tanto, la <strong>COMISIONISTA</strong> está en libertad de realizar su actividad en forma independiente.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>QUINTA.</strong> - La liquidación de las comisiones y gastos que le correspondan a la comisionista se harán cada <strong>SEMANA</strong> un porcentaje de un 5% sobre el precio de sus operaciones. Si por alguna razón debe darse a <strong>LA COMISIONISTA</strong> porcentajes diferentes según se trate del tipo o el origen de los productos o servicios que venda, entonces en lista anexa se especificarán las comisiones que correspondan a todos los diversos tipos, marcas, orígenes o clases de productos o servicios que venda.
                      </p>
                      {/* Aquí puedes continuar con el resto de las cláusulas */}
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>SEXTA.</strong> - Si <strong>LA COMISIONISTA</strong> recibe para su resguardo productos, dinero o documentos, propiedad de <strong>LA COMITENTE</strong>, actuará en todo momento con honradez garantizando su buen manejo.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>SEPTIMA.</strong> - <strong>LA COMISIONISTA</strong>, conviene en regirse por principios de honradez, diligencia y profesionalismo en su encargo. Buscará con todos los medios legales a su alcance la expansión de las ventas, contratación o colocación de los servicios de <strong>LA COMITENTE</strong>. No desviará el dinero o productos que por su representación llegará a tener por la confianza que le otorga <strong>LA COMITENTE</strong>. Por lo que, si <strong>LA COMISIONISTA</strong> se llegara a exceder en su representación y faltara a esos principios de rectitud y lealtad para con <strong>LA COMITENTE</strong>, este contrato será rescindido, respondiendo <strong>LA COMISIONISTA</strong> por todos los daños que haya causado a <strong>LA COMITENTE</strong>.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>OCTAVA.</strong> - <strong>LA COMITENTE</strong>, conviene en proporcionar en todo momento a <strong>LA COMISIONISTA</strong>, de todos los medios a los que se comprometió en este contrato para facilitarle el desempeño de su representación, sin pena de responder por los daños y perjuicios causados a <strong>LA COMISIONISTA</strong>.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>NOVENA.</strong> - El término del presente contrato de Comisión Mercantil, es por tiempo indeterminado quedando facultadas ambas partes para darlo por terminado y sin ninguna responsabilidad, previo aviso por escrito.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      <strong>DECIMA.</strong> - Para la interpretación y cumplimiento de este contrato, así como para todo lo no previsto en el mismo, las partes se someten a la jurisdicción y competencia de la Jurisdicción de los Tribunales del Estado de Campeche; por lo que renuncian expresamente al fuero que, por razón de su domicilio presente o uturo, pudiera corresponderles.
                      </p>
                      <p style="text-align: justify; margin-bottom: 16px;">
                      Leído el que fue el presente y de conformidad, lo firman el presente documento, por duplicado en la ciudad de ____________________________________________, a los ______ días del mes de __________________ del año 202__; quedando un ejemplar de este en poder de cada parte contratante.
                      </p>

                      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">  
          <div style="text-align: left;">

            <p style="font-size: 16px;">
            <p style="font-size: 16px;">
              <strong>El comitente</strong>
            </p>  
              _____________________________
            </p>
            <p style="font-size: 16px;">
              M en A Martha Margarita Santana Ceja
            </p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 16px;">
              <strong>La comisionista</strong>
            </p>  
            <p style="font-size: 16px;">
              _____________________________
            </p>  
            <p style="font-size: 16px;">
              ${nombreCompleto}
            </p>
          </div>
        </div>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <p style="text-align: justify; margin-bottom: 16px;"> 
          <strong>Testigo</strong>
        </p>
        <p style="text-align: justify; margin-bottom: 16px;"> 
          C. Jose Alfredo  Cuc  Ek
        </p>
        <br/>
        <br/>
        <br/>
        <p style="text-align: justify; margin-bottom: 16px;"> 
          <strong>Testigo</strong>
        </p>
        <p style="text-align: justify; margin-bottom: 16px;"> 
          C. _____________________________
        </p>

          
        </div>
      `;
  
      const options = {
        margin: [15, 10, 20, 10],
        filename: `contratoAsesor_${nombreCompleto}.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, letterRendering: false, useCORS: true },
        jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      };
  
      html2pdf().set(options).from(input).toPdf().get('pdf').then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const headerImage = '/img/logo.png';
        const footerText = 'C. CUERNAVACA NO. 47 COND CUAHUNAHUAC  CUERNAVACA MORELOS 7772167527';
    
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);
          pdf.addImage(headerImage, 'PNG', 0, -5, 40, 30); // Adjust the position and size as needed
          pdf.setFontSize(10);
          const textWidth = pdf.getTextDimensions(footerText).w;
          const xPosition = (pageWidth - textWidth) / 2;
          pdf.text(footerText, xPosition, pageHeight - 10);
        }
      }).save();
    };

    const generateSecondPDF = (asesor) => {
      const nombreCompleto = `${asesor.nombres} ${asesor.apellido_p} ${asesor.apellido_m}`;
      const nombreCompletoMayus = `${nombreCompleto}`.toUpperCase();
      const domicilioCompleto = `${asesor.calle || ''}${asesor.numeroExterior ? ' #' + asesor.numeroExterior : ''}${
        asesor.numeroInterior ? ' #' + asesor.numeroInterior : ''
      }, ${asesor.ciudad || ''}, ${asesor.estado || ''}`.trim();
  
        const input = document.createElement('div');
        input.innerHTML = `
          <div style="width: 700px; margin: 0 auto; font-size: 15px;">
            <h6 style="text-align: justify; margin-bottom: 16px;">
              <strong>CONTRATO DE CONFIDENCIALIDAD</strong>
            </h6>
            <p style="text-align: justify; margin-bottom: 16px;">
              DENOMINADO COMO “EL CONTRATO” QUE CELEBRA POR UNA PARTE LA M en A <strong>Martha Margarita Santana Ceja</strong> DENOMINADO EN LO SUCESIVO COMO “LA PARTE EMISORA”, Y POR LA OTRA PARTE LA C. <strong>${nombreCompleto}</strong>: EN LO SUCESIVO LLAMADO COMO “LA PARTE RECEPTORA”; AL TENOR DE LAS SIGUIENTES DECLARACIONES Y CLÁUSULAS: 
            </p>

            <h6 style="text-align: justify; margin-bottom: 16px;">
              <strong>DECLARACIONES</strong>
            </h6>
  
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>I.-</strong> LA M en A <strong>Martha Margarita Santana Ceja</strong>, denominada en lo adelante como “EL EMISOR”, manifiesta ser mayor de edad, con domicilio en la calle Cuernavaca no.  47 condominios Cuauhnáhuac CP 62430, del municipio de Cuernavaca, Estado de Morelos, identificándose con CURP SACM710414MMNNJR02 y credencial de elector con folio 0045015314261.
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>II.-</strong> La <strong>${nombreCompleto}</strong>, denominado en lo adelante como “LA PARTE RECEPTORA”, manifiesta ser mayor de edad, con domicilio en <strong>C. ${domicilioCompleto}, CP ${asesor.codigo_postal}</strong>. Identificándose con de elector con folio ___________________. CURP: ${asesor.cupr} y credencial.
            </p>
            
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>III.-</strong> Que AMBAS PARTES han decidido transmitirse mutuamente información confidencial, propiedad de LA PARTE EMISORA, relacionada con las tecnologías, planes de negocios internos y otros, a lo que en lo sucesivo se le denominará <strong>“INFORMACIÓN CONFIDENCIAL”</strong>.
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>CLAUSULAS</strong>
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>PRIMERA.</strong> - Las partes se obligan a no divulgar a terceras partes, la “INFORMACIÓN CONFIDENCIAL”, que reciban de la otra. Para efectos del presente convenio, como “INFORMACIÓN CONFIDENCIAL” se entiende a toda la información divulgada por cualquiera de las partes ya sea en forma oral, visual, escrita, grabada en medios magnéticos o en cualquier otra forma tangible y que se encuentre claramente marcada como tal al ser entregada a LA PARTE RECEPTORA. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>SEGUNDA.</strong> - LA PARTE RECEPTORA se obliga a mantener segura la “INFORMACIÓN CONFIDENCIAL” que reciba de LA PARTE EMISORA y a no darla a una tercera parte diferente de sus abogados y asesores, cuando tengan la necesidad de conocer dicha información. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>TERCERA.</strong> - LA PARTE RECEPTORA está obligada a no divulgar la “INFORMACIÓN CONFIDENCIAL” a terceros, sin el previo consentimiento por escrito de LA PARTE EMISORA. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>CUARTA.</strong> - LA PARTE RECEPTORA se obliga a tomar las precauciones necesarias para mantener segura la “INFORMACIÓN CONFIDENCIAL” propiedad de la otra parte, incluyendo al informar a la calle Cuernavaca no.  47 condominios Cuauhnáhuac CP 62430, del municipio de Cuernavaca, Estado de Morelos CP 62430 sus empleados que la manejen de forma confidencial y que no la divulguen a terceros. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>QUINTA.</strong> - LA PARTE RECEPTORA está de acuerdo en que la “INFORMACIÓN CONFIDENCIAL” que reciba de la otra parte es y seguirá siendo propiedad de ésta última, a usar dicha información únicamente de la manera y para los propósitos autorizados; y que este instrumento no otorga, de manera expresa o implícita, derecho intelectual o de propiedad alguna a LA PARTE RECEPTORA. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>SEXTA.</strong> - Las partes convienen que en caso de que LA PARTE RECEPTORA incumpla parcial o totalmente con las obligaciones a su cargo derivadas del presente contrato, LA PARTE RECEPTORA será responsable de los daños y perjuicios que dicho incumplimiento llegase a ocasionar, así como a una PENA CONVENCIONAL por $450,000.00 que serán exigibles de manera inmediata y que generaran intereses del 0.83% diarios por cada día de retraso en el pago de la PENA CONVENCIONAL.
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>SEPTIMA.</strong> - No obstante, lo dispuesto, se podrá romper el carácter de confidencial para cualquier información cuando:
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>•</strong> - Que previa a su divulgación fuese conocida por LA PARTE RECEPTORA, libre de cualquier obligación de mantenerla confidencial, según se evidencie por documentación en su posesión. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>•</strong> - Que sea desarrollada o elaborada de manera independiente por o de parte de LA PARTE RECEPTORA o legalmente recibida, libre de restricciones, de otra fuente con derecho a divulgarla. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>•</strong> - Que sea o llegue a ser del dominio público, sin mediar incumplimiento de este convenio por LA PARTE RECEPTORA. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>•</strong> - Que se reciba de un tercero sin que esa divulgación quebrante o viole una obligación de confidencialidad. 
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>OCTAVA.</strong> - No obstante, lo dispuesto, se podrá romper el carácter de confidencial para cualquier información cuando:
            </p>
            <p style="text-align: justify; margin-bottom: 16px;">
              <strong>NOVENA.</strong> - Las obligaciones establecidas en este convenio para LA PARTE RECEPTORA, respecto a la confidencialidad de la “INFORMACIÓN CONFIDENCIAL” y al uso de esta, prevalecerán vigentes aun a la terminación de este instrumento y de la relación laboral. Leído en su completitud el presente contrato, y enteradas las partes de su contenido y alcances, lo firman en ESTADO DE MORELOS, ESTADO DE MORELOS a ________ de ________________de 2025.
            </p>



                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 20px;">  
            <div style="text-align: left;">
  
              <p style="font-size: 16px;">
              <p style="font-size: 16px;">
                <strong>PARTE EMISORA</strong>
              </p>  
                _____________________________
              </p>
              <p style="font-size: 16px;">
                M en A MARTHA MARGARITA SANTANA CEJA
              </p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 16px;">
                <strong>PARTE RECEPTORA</strong>
              </p>  
              <p style="font-size: 16px;">
                _____________________________
              </p>  
              <p style="font-size: 16px;">
                ${nombreCompleto}
              </p>
            </div>
            <br/>
          </div>
<br/>
          </div>
        `;
    
        const options = {
          margin: [15, 10, 20, 10],
          filename: `contratoAsesorConfidencialidad_${nombreCompleto}.pdf`,
          image: { type: 'jpeg', quality: 1 },
          html2canvas: { scale: 3, letterRendering: false, useCORS: true },
          jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        };
    
        html2pdf().set(options).from(input).toPdf().get('pdf').then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const headerImage = '/img/logo.png';
          const footerText = 'C. CUERNAVACA NO. 47 COND CUAHUNAHUAC  CUERNAVACA MORELOS 7772167527';
      
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.addImage(headerImage, 'PNG', 0, -5, 40, 30); // Adjust the position and size as needed
            pdf.setFontSize(10);
            const textWidth = pdf.getTextDimensions(footerText).w;
            const xPosition = (pageWidth - textWidth) / 2;
            pdf.text(footerText, xPosition, pageHeight - 10);
          }
        }).save();
      };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Asesores
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {asesores.map((asesor) => (
              <React.Fragment key={asesor.id_usuario}>
                <TableRow>
                  <TableCell sx={{ ...commonStyles }}>Asesor:</TableCell>
                  <TableCell sx={{ ...commonStyles }}>{asesor.nombres}</TableCell>
                  <TableCell sx={{ ...commonStyles }}>CURP:</TableCell>
                  <TableCell sx={{ ...commonStyles }}>{asesor.curp}</TableCell>
                  <TableCell sx={{ ...commonStyles }}>NSS:</TableCell>
                  <TableCell sx={{ ...commonStyles }}>{asesor.nss}</TableCell>
                  <TableCell sx={{ ...commonStyles }}>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DescriptionIcon />}
                      sx={buttonStyles}
                      onClick={() => navigate(`/asesores/contrato/${asesor.id_usuario}`)}
                    >
                      Contrato
                    </Button> */}
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DescriptionIcon />}
                      sx={buttonStyles}
                      onClick={() => handleContratoClick(asesor)}
                    >
                      Contrato
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<EditIcon />}
                      sx={buttonStyles}
                      onClick={() => handleEdit(asesor.id_usuario)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={buttonStyles}
                      onClick={() => openModal(asesor.id_usuario)}
                    >
                      Crear Usuario
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Teléfono:</TableCell>
                  <TableCell>{asesor.telefono}</TableCell>
                  <TableCell>Email:</TableCell>
                  <TableCell>{asesor.email}</TableCell>
                  <TableCell>Status:</TableCell>
                  <TableCell>{asesor.status === 1 ? 'Activo' : 'Inactivo'}</TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Crear Usuario"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl mb-4">Crear Usuario</h2>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="secondary"
              onClick={closeModal}
              className="mr-2"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateUser}
            >
              Crear
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Asesores;
