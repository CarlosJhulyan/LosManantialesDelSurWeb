import React, { useContext, useEffect, useState } from "react";
import { Input, Form, Row, Button, message } from 'antd'

import DashboardClient from "../../Layout/DashboardClient";
import PaymentMethod from "../../components/Client/PaymentMethod";
import { Context } from "../../context";
import { updateCode, createDestinatario, createPassage, getPassagesByIdVehicule, updateIdVehiculePassage } from "../../services/Services";
import { getVehicules, updateVehicule } from "../../services/VehiculeServices";
import { createPackage, createStatusTracking, createTracking } from "../../services/TrackingServices";
import formatDateToDatetime from '../../utils/formatDateToDatetime';
import generateNumberGuide from "../../utils/generateNumberGuide";
import { getAvailableSeats } from "../../services/VehiculeServices";

import Yape from '../../images/yape.png';
import Lukita from '../../images/lukita.jpg';
import Bim from '../../images/bim.png';
import Tunki from '../../images/tunki.jpg';
import Bbva from '../../images/bbva.jpg';
import Bcp from '../../images/bcp.jpg';
import Interbank from '../../images/interbank.png';
import Scotiabank from '../../images/scotiabank.png';

const RegisterPayment = ({ history }) => {
  const { globalData, setData } = useContext(Context);
  const [state, setState] = useState({
    code: "",
    loading: false
  })

  const handleSubmit = () => {
    if (state.code === null || state.code === "" || state.code.length > 6) {
      message.warning("Campo no valido");
      return;
    }
    setState({ ...state, loading: true });
    updateCode(state.code).then(res => {
      if (res.statusCode === 200)
        if (globalData.paquete)
          handleSubmitPackage();
        else
          handleSubmitPassage();
      else if (res.statusCode === 404) message.warning(res.message);
      else message.warning(res.title);
      setState({ ...state, loading: false });
    }).catch(error => message.error(error.message));
  }

  const handleSubmitPackage = () => {
    getVehicules(globalData.origen, globalData.destino).then(vehicule => {
      const idVehicule = vehicule[0].id;
      createTracking({ 
        fechEnvio: formatDateToDatetime(new Date())
      }).then(responseTracking => {
        if (responseTracking.message)
          createStatusTracking({
            seguimiento: responseTracking.data.uuid,
            descripcion: "Salio de la sucursal de origen",
            fecha: formatDateToDatetime(new Date())
          }).then(responseStatus => {
            if (responseStatus.message)
              createDestinatario(globalData.destinatario).then(responseDestinatario => {
                if (responseDestinatario.message)
                  createPackage({
                    ...globalData.paquete,
                    remitente: globalData.data.uuid,
                    destinatario: responseDestinatario.data.uuid,
                    seguimiento: responseTracking.data.uuid,
                    vehiculo: idVehicule,
                    origenPaquete: globalData.origen,
                    destinoPaquete: globalData.destino,
                    montoTotal: globalData.total,
                    codigoValidacion: state.code,
                    numeroGuia: generateNumberGuide()
                  }).then(success => {
                    if (success.statusCode == 201) {
                      message.success(success.message);
                      setData({
                        ...globalData,
                        ticket: {
                          numeroGuia: success.data.numeroGuia,
                          numeroSeguimiento: responseTracking.data.numeroSeguimiento,
                          fechaEnvio: responseTracking.data.fechaEnvio,
                          codigo: state.code,
                          destinatario: responseDestinatario.data,
                          remitente: globalData.data,
                          montoTotal: success.data.montoTotal,
                          origen: success.data.origenPaquete,
                          destino: success.data.destinoPaquete,
                          fecha: success.data.createdAt
                        }
                      });
                      history.push("/cliente");
                    }
                  }).catch(error => message.error(error.message));;
              }).catch(error => message.error(error.message));;
          }).catch(error => message.error(error.message));;
      }).catch(error => message.error(error.message));;
    }).catch(error => message.error(error.message));
  }

  const handleSubmitPassage = () => {
    createPassage({
      ...globalData.pasaje,
      pasajero: globalData.data.uuid,
      codigoValidacion: state.code,
      origenSucursal: globalData.origen,
      destinoSucursal: globalData.destino,
      montoTotal: globalData.total,
      numeroGuia: generateNumberGuide()
    }).then(res => {
      if (res.statusCode == 201) {
        message.success(res.message);
        getAvailableSeats(globalData.pasaje.vehiculoPasaje).then(asientos => {
          const asientosFilter = asientos.asientos.filter(asiento => asiento === 0);
          if (asientosFilter.length === 0) {
            updateVehicule({
              id: globalData.pasaje.vehiculoPasaje,
              sucursalActual: globalData.destino,
              sucursalFinal: globalData.origen
            }).then(update => {
              if (update.statusCode == 200) {
                getPassagesByIdVehicule(globalData.pasaje.vehiculoPasaje).then(res => {
                  if (res)
                    res.map(passage => {
                      updateIdVehiculePassage(passage).then(res => {
                        if (res.statusCode === 200) {
                          console.log(res.message);
                        }
                      });
                    });
                });
              }
            }).catch(error => message.error(error.message));
          }
        });
        setData({
          ...globalData,
          ticket: {
            numeroGuia: res.data.numeroGuia,
            codigo: state.code,
            pasajero: globalData.data,
            montoTotal: res.data.montoTotal,
            origen: res.data.origenSucursal,
            destino: res.data.destinoSucursal,
            fecha: res.data.createdAt,
            numeroAsiento: res.data.numeroAsiento
          }
        });
        history.push("/cliente");
      }
    }).catch(error => message.error(error.message));
  }

  const handleChange = e => setState({ ...state, code: e.target.value.toUpperCase() });

  return (
    <DashboardClient title="PAGO" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, sunt, ea tempore ratione quod voluptates quibusdam quidem non veniam debitis itaque molestias illo nulla impedit voluptatibus accusamus, nam similique facere.
    Necessitatibus exercitationem nihil ea voluptatem esse nobis recusandae alias! Totam architecto fugit incidunt iusto. Modi pariatur consequatur dolor officiis aperiam commodi architecto assumenda nihil, nobis quia.">
      <Row>
        <PaymentMethod images={[ Yape, Lukita, Bim, Tunki ]} numbers={[ 'Tunki: 935 990 471', 'Lukita: 935 990 471', 'Bim: 935 990 471', 'Tunki: 935 990 471' ]} />
        <PaymentMethod images={[ Bcp, Bbva, Scotiabank, Interbank ]} numbers={[ 'BCP: 193-1121663-0-28', 'Bbva: 0011-0814-0207578008-16', 'Scotiabank: 009-8894052', 'Interbank: 200-3079473367' ]} />
      </Row>
      <Row style={{ marginTop: 10 }}>
        Total a pagar es: S/ {globalData.total}
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <small>
          <b>Nota:</b> para obtener su código de validación de su pago, enviar el vaucher al número en WhatsApp (+51) 935 990 471
        </small>
      </Row>
      <Form onSubmitCapture={handleSubmit}>
        <Row justify="center">
          <Form.Item label="Código de Validación">
            <Input onChange={handleChange}
                    placeholder="Ejemplo: B7Y3D0"
                    value={state.code} />
          </Form.Item>
        </Row>
        <Row justify="center">
          <Form.Item>
            <Button size="large"
                    type="primary"
                    htmlType="button"
                    onClick={() => history.goBack()}
                    danger>
              Atrás
            </Button>
          </Form.Item>
          <Form.Item>
            <Button size="large"
                    style={{ marginLeft: 10 }}
                    type="primary"
                    loading={state.loading}
                    htmlType="submit">
              Confirmar
            </Button>
          </Form.Item>
				</Row>
      </Form>
    </DashboardClient>
  )
}

export default RegisterPayment;
