import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Box, Button } from '@mui/material';


const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  border: 'none',
  width: 'auto',
  height: 'auto',
  boxShadow: 'none',
};

const buttonStyles = {
  minWidth: '100px',
  marginRight: '8px',
};

// const Contrato = () => {
//   const { id } = useParams();
//   const [asesor, setAsesor] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Cambia esto por tu URL real para obtener los datos del asesor
//     fetch(`https://gestoriasantana-production.up.railway.app/usuarios/${id}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Error al obtener el asesor');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setAsesor(data);
//       })
//       .catch((error) => {
//         console.error('Error al obtener el asesor:', error);
//       });
//   }, [id]);

//   if (!asesor) {
//     return <Typography>Cargando contrato...</Typography>;
//   }


function Contrato() {
  const { id } = useParams(); // Obtienes el id del asesor desde la URL
  const [asesor, setAsesor] = useState(null);

  useEffect(() => {
    const fetchAsesor = async () => {
      try {
        const response = await fetch(`https://gestoriasantana-production.up.railway.app/usuarios/${id}`);
        const data = await response.json();
        if (response.ok) {
          setAsesor(data);
        } else {
          console.error('Error al cargar los datos del asesor');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchAsesor();
  }, [id]);

  if (!asesor) {
    return <div>Cargando...</div>;
  }

  // Concatenar los datos del nombre completo
  const nombreCompleto = `${asesor.nombres} ${asesor.apellido_p} ${asesor.apellido_m}`;
  const nombreCompletoMayus = `${nombreCompleto}`.toUpperCase();


  // const domicilioCompleto = `${asesor.calle} #${asesor.numeroExterior}${asesor.numeroInterior ? ' #' + asesor.numeroInterior : ''}, ${asesor.ciudad}, ${asesor.estado}`;
  const domicilioCompleto = `${asesor.calle || ''}${asesor.numeroExterior ? ' #' + asesor.numeroExterior : ''}${
    asesor.numeroInterior ? ' #' + asesor.numeroInterior : ''
  }, ${asesor.ciudad || ''}, ${asesor.estado || ''}`.trim();

  console.log(domicilioCompleto);

  return (
        <div style={{ padding: '20px' }}>
          <Paper sx={{ padding: '100px' }}>
            {/* <Typography variant="h6" gutterBottom> */}
            <div style={{ width: '800px', margin: '0 auto' }}>
  
            <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>CONTRATO DE COMISIÓN MERCANTIL, QUE CELEBRAN, POR UNA PARTE: LA NEGOCIACIÓN “M SANTANA ASESORIAS” REPRESENTADA POR: MARTHA MARGARITA SANTANA CEJA, LA CUAL SERÁ DESIGNADA EN EL CURSO DE ESTE CONTRATO COMO “LA COMITENTE” Y POR LA OTRA PARTE {nombreCompletoMayus} A QUIEN SE LE DESIGNARÁ COMO “LA COMISIONISTA”, QUIENES HACEN LAS SIGUIENTES:</strong>
            </Typography>
  
            <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
              <strong>DECLARACIONES</strong>
            </Typography>
  
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>I.-</strong> Declara <strong>LA COMITENTE “M SANTANA ASESORIAS” representada por la M en A. Martha Margarita Santana Ceja</strong>, ser un nombre para efectos comerciales, dedicada a las actividades de servicios de consultoría en administración, dada de alta ante el SAT con REGISTRO FEDERAL DE CONTRIBUYENTES SACM710414QL1 y tener su domicilio en Calle Cuernavaca #47 Condominios Cuauhnáhuac CP 62430, Cuernavaca Morelos.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>II.-</strong> Declara <strong>LA COMISIONISTA {nombreCompleto}</strong> y tener su domicilio en <strong>C. {domicilioCompleto}, CP {asesor.codigo_postal}</strong>.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>III.-</strong> Ambas partes declaran estar de acuerdo en que para realizar con éxito el presente contrato, se sujetan a las siguientes:
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>CLAUSULAS</strong>
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
              <strong>PRIMERA.</strong> - La <strong>COMISIONISTA</strong> conviene en hacerse cargo de la venta de servicios, promoción y servicios que se enlistan anexas a éste, en la inteligencia de que las ventas, promociones o servicios que lleve a cabo <strong>LA COMISIONISTA</strong> serán realizadas de acuerdo con los precios, términos y condiciones de pago que <strong>LA COMITENTE</strong> señaló en la lista anexa a este contrato y que estará vigente hasta que otra lista la sustituya expresamente.
              </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>SEGUNDA.</strong> - Ambas partes convienen, que la <strong>COMISIONISTA</strong> sólo tendrá a su cargo las ventas, promociones y servicios a que se refiere la cláusula anterior, en el territorio que comprende y en consecuencia no podrá realizar la venta, contratación o promoción de los artículos o servicios objeto de este contrato, en cualquier otro lugar de la República o fuera de ella, a menos que medie consentimiento de <strong>LA COMITENTE</strong>.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>TERCERA.</strong> - La <strong>COMISIONISTA</strong> queda en libertad para vender, promocionar o colocar servicios por su cuenta o por cuenta de terceros otros productos o servicios, que no sean de la naturaleza de los que venda, promocione o brinde servicios <strong>LA COMITENTE</strong>.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>CUARTA.</strong> - La <strong>COMISIONISTA</strong> manifiesta que cuenta con recursos y personal adecuado para realizar la venta y promoción de los servicios de la <strong>COMITENTE</strong>, pudiendo la <strong>COMISIONISTA</strong> presentarse o ausentarse cuando así lo desee, debido a que no está obligado a cumplir personalmente la comisión; asimismo, éste contrato no confiere exclusividad para ninguna de las partes, por lo cual la <strong>COMISIONISTA</strong> tiene plena libertad para contratar con otros comisionistas o comitentes y por tanto, la <strong>COMISIONISTA</strong> está en libertad de realizar su actividad en forma independiente.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>QUINTA.</strong> - La liquidación de las comisiones y gastos que le correspondan a la comisionista se harán cada <strong>SEMANA</strong> un porcentaje de un 5% sobre el precio de sus operaciones. Si por alguna razón debe darse a <strong>LA COMISIONISTA</strong> porcentajes diferentes según se trate del tipo o el origen de los productos o servicios que venda, entonces en lista anexa se especificarán las comisiones que correspondan a todos los diversos tipos, marcas, orígenes o clases de productos o servicios que venda.
            </Typography>
            {/* Aquí puedes continuar con el resto de las cláusulas */}
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>SEXTA.</strong> - Si <strong>LA COMISIONISTA</strong> recibe para su resguardo productos, dinero o documentos, propiedad de <strong>LA COMITENTE</strong>, actuará en todo momento con honradez garantizando su buen manejo.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>SEPTIMA.</strong> - <strong>LA COMISIONISTA</strong>, conviene en regirse por principios de honradez, diligencia y profesionalismo en su encargo. Buscará con todos los medios legales a su alcance la expansión de las ventas, contratación o colocación de los servicios de <strong>LA COMITENTE</strong>. No desviará el dinero o productos que por su representación llegará a tener por la confianza que le otorga <strong>LA COMITENTE</strong>. Por lo que, si <strong>LA COMISIONISTA</strong> se llegara a exceder en su representación y faltara a esos principios de rectitud y lealtad para con <strong>LA COMITENTE</strong>, este contrato será rescindido, respondiendo <strong>LA COMISIONISTA</strong> por todos los daños que haya causado a <strong>LA COMITENTE</strong>.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>OCTAVA.</strong> - <strong>LA COMITENTE</strong>, conviene en proporcionar en todo momento a <strong>LA COMISIONISTA</strong>, de todos los medios a los que se comprometió en este contrato para facilitarle el desempeño de su representación, sin pena de responder por los daños y perjuicios causados a <strong>LA COMISIONISTA</strong>.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>NOVENA.</strong> - El término del presente contrato de Comisión Mercantil, es por tiempo indeterminado quedando facultadas ambas partes para darlo por terminado y sin ninguna responsabilidad, previo aviso por escrito.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            <strong>DECIMA.</strong> - Para la interpretación y cumplimiento de este contrato, así como para todo lo no previsto en el mismo, las partes se someten a la jurisdicción y competencia de la Jurisdicción de los Tribunales del Estado de Campeche; por lo que renuncian expresamente al fuero que, por razón de su domicilio presente o uturo, pudiera corresponderles.
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
            Leído el que fue el presente y de conformidad, lo firman el presente documento, por duplicado en la ciudad de ____________________________________________, a los ______ días del mes de __________________ del año 202__; quedando un ejemplar de este en poder de cada parte contratante.
            </Typography>
  
            <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="text-left">
                      <Typography variant="body1">
                          El Comitente
                      </Typography>
                      <br/><br/>
                      <Typography variant="body1">
                          M en A Martha Margarita Santana Ceja
                      </Typography>
                  </div>
                  <div className="text-right">
                      <Typography variant="body1">
                          La Comisionista
                      </Typography>
                      <br/><br/>
                      <Typography variant="body1">
                      {nombreCompleto}
                      </Typography>
                  </div>
              </div>
  
            {/* Continua con las siguientes cláusulas */}
  <br/><br/>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
              Testigo
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
              C. Jose Alfredo  Cuc  Ek
            </Typography>
            <br/><br/><br/><br/>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
              Testigo
            </Typography>
            <Typography variant="body1" gutterBottom style={{ textAlign: 'justify' }}>
              C. _____________________________________________
            </Typography>
            
            <Box display="flex" justifyContent="center" mt={3}>
            <Button
                  variant="contained"
                  color="primary"
                  onClick={() => window.print()}
                >
                  Imprimir Contrato
                </Button>
            </Box>
            </div>
          </Paper>
        </div>
      );
    };
  
  export default Contrato;