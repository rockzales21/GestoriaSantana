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


  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Contrato de Comisión Mercantil
      </Typography>
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          CON TRATO DE COMISIÓN MERCANTIL, QUE CELEBRAN, POR UNA PARTE: LA NEGOCIACIÓN “M SANTANA ASESORIAS” REPRESENTADA POR: MARTHA MARGARITA SANTANA CEJA, LA CUAL SERÁ DESIGNADA EN EL CURSO DE ESTE CONTRATO COMO “LA COMITENTE” Y POR LA OTRA PARTE {nombreCompleto} A QUIEN SE LE DESIGNARÁ COMO “LA COMISIONISTA”, QUIENES HACEN LAS SIGUIENTES:
        </Typography>

        <Typography variant="body1" gutterBottom>
          I.- Declara LA COMITENTE “M SANTANA ASESORIAS” representada por la M en A. Martha Margarita Santana Ceja, ser un nombre para efectos comerciales, dedicada a las actividades de servicios de consultoría en administración, dada de alta ante el SAT con REGISTRO FEDERAL DE CONTRIBUYENTES SACM710414QL1 y tener su domicilio en Calle Cuernavaca #47 Condominios Cuauhnáhuac CP 62430, Cuernavaca Morelos.
        </Typography>
        <Typography variant="body1" gutterBottom>
          II.- Declara LA COMISIONISTA {asesor.nombres} y tener su domicilio en {asesor.direccion}, CP {asesor.codigo_postal}.
        </Typography>
        <Typography variant="body1" gutterBottom>
          III.- Ambas partes declaran estar de acuerdo en que para realizar con éxito el presente contrato, se sujetan a las siguientes:
        </Typography>
        <Typography variant="body1" gutterBottom>
          CLAUSULAS
        </Typography>
        <Typography variant="body1" gutterBottom>
          PRIMERA. - LA COMISIONISTA conviene en hacerse cargo de la venta de servicios, promoción y servicios que se enlistan anexas a éste, en la inteligencia de que las ventas, promociones o servicios que lleve a cabo LA COMISIONISTA serán realizadas de acuerdo con los precios, términos y condiciones de pago que LA COMITENTE señaló en la lista anexa a este contrato y que estará vigente hasta que otra lista la sustituya expresamente.
        </Typography>
        <Typography variant="body1" gutterBottom>
          SEGUNDA. - Ambas partes convienen, que LA COMISIONISTA sólo tendrá a su cargo las ventas, promociones y servicios a que se refiere la cláusula anterior, en el territorio que comprende y en consecuencia no podrá realizar la venta, contratación o promoción de los artículos o servicios objeto de este contrato, en cualquier otro lugar de la República o fuera de ella, a menos que medie consentimiento de LA COMITENTE.
        </Typography>
        <Typography variant="body1" gutterBottom>
          TERCERA. - La COMISIONISTA queda en libertad para vender, promocionar o colocar servicios por su cuenta o por cuenta de terceros otros productos o servicios, que no sean de la naturaleza de los que venda, promocione o brinde servicios LA COMITENTE.
        </Typography>
        <Typography variant="body1" gutterBottom>
          CUARTA. - La COMISIONISTA manifiesta que cuenta con recursos y personal adecuado para realizar la venta y promoción de los servicios de LA COMITENTE, pudiendo la COMISIONISTA presentarse o ausentarse cuando así lo desee, debido a que no está obligado a cumplir personalmente la comisión; asimismo, éste contrato no confiere exclusividad para ninguna de las partes, por lo cual la COMISIONISTA tiene plena libertad para contratar con otros comisionistas o comitentes y por tanto, la COMISIONISTA está en libertad de realizar su actividad en forma independiente.
        </Typography>
        <Typography variant="body1" gutterBottom>
          QUINTA. - La liquidación de las comisiones y gastos que le correspondan a la comisionista se harán cada SEMANA un porcentaje de un 5% sobre el precio de sus operaciones. Si por alguna razón debe darse a LA COMISIONISTA porcentajes diferentes según se trate del tipo o el origen de los productos o servicios que venda, entonces en lista anexa se especificarán las comisiones que correspondan a todos los diversos tipos, marcas, orígenes o clases de productos o servicios que venda.
        </Typography>
        {/* Aquí puedes continuar con el resto de las cláusulas */}
        <Typography variant="body1" gutterBottom>
          SEXTA. - Si LA COMISIONISTA recibe para su resguardo productos, dinero o documentos, propiedad de LA COMITENTE, actuará en todo momento con honradez garantizando su buen manejo.
        </Typography>
        <Typography variant="body1" gutterBottom>
          SEPTIMA. - LA COMISIONISTA, conviene en regirse por principios de honradez, diligencia y profesionalismo en su encargo. Buscará con todos los medios legales a su alcance la expansión de las ventas, contratación o colocación de los servicios de La COMITENTE. No desviará el dinero o productos que por su representación llegará a tener por la confianza que le otorga LA COMITENTE. Por lo que, si LA COMISIONISTA se llegara a exceder en su representación y faltara a esos principios de rectitud y lealtad para con LA COMITENTE, este contrato será rescindido, respondiendo LA COMISIONISTA por todos los daños que haya causado a La COMITENTE.
        </Typography>

        {/* Continua con las siguientes cláusulas */}
        
        <Box display="flex" justifyContent="center" mt={3}>
        {/* <Button
  variant="contained"
  color="primary"
  onClick={() => navigate(`/asesores`)} // Redirige al usuario a la ruta '/asesores'
>
  Regresar a Asesores
</Button> */}

        </Box>
      </Paper>
    </div>
  );
};

export default Contrato;
