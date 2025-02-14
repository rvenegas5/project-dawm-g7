
import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios'
import { useHistory } from 'react-router-dom'
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
  Container,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";





function Dashboard(props) {
  let history = useHistory()
  const [bigChartData, setbigChartData] = useState("data1");
  const [labels, setlabels] = useState([]);
  const [datas, setdatas] = useState([]);
  const [labelsCantidad, setlabelsCantidad] = useState([]);
  const [datasCantidad, setdatasCantidad] = useState([]);
  function preloadFunc()
  { 
    
    axios.post("http://localhost:3001/comments/verificar", {}, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
      }
      ).then((response)=>{
        if (response.data.err) {
          history.push('/login-page')
        } else {
          if (response.data.admin) {history.push('/admin/dashboard')}
          else if (response.data.client){
            history.push('/')
            alert("No tiene permisos")
          }
        }
      })
    }
  window.onload = preloadFunc()

  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  var listBackgroundColor = [ '#f2e259', '#0DABF1', '#d61620', '#EA1779', '#000000', '#f2e3598f', '#aeadb3', '#ffb35a',
    'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)'
  ]

  

  useEffect(() => {
    var url = new URL("http://localhost:3001/compra");
    var url2 = new URL("http://localhost:3001/compra/mermeladas");
    const controller = new AbortController();
    const signal = controller.signal;

    fetch (url, {
      method: "GET",
      signal: signal,
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
      },
    }).then(function(response) {
        if(response.ok) {
            return response.json().then(function(jsonText) {
              setlabels(jsonText.labels);
              setdatas(jsonText.data);
            });
        } else{
            console.log("Error en la llamada fetch");
        }
    })
    fetch (url2, {
      method: "GET",
      signal: signal,
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
      },
    }).then(function(response) {
        if(response.ok) {
            return response.json().then(function(jsonText) {
              setlabelsCantidad(jsonText.labels);
              setdatasCantidad(jsonText.data);
            });
        } else{
            console.log("Error en la llamada fetch");
        }
    })
  }, [])

  var chartDataSales = {
      labels: labels,
      datasets:[
          {
              label:'Venta',
              data: datas,
              backgroundColor: listBackgroundColor
          }
      ]
  };

  var chartDataCantidad = {
    labels: labelsCantidad,
    datasets:[
        {
            label:'Venta',
            data: datasCantidad,
            backgroundColor: listBackgroundColor
        }
    ]
};

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <Container>
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Ventas de los ultimos 3 meses</h5>
                      <CardTitle tag="h2">Monto</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data1",
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => setBgChartData("data1")}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Ingreso de Usuarios 
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: bigChartData === "data2",
                          })}
                          onClick={() => setBgChartData("data2")}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Compras
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                    
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
              </Container>
              <Container>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartDataSales}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Container>
            </Card>
          </Col>
        </Row>
        <Row>
          
          <Col lg="4">
            <Card className="card-chart">
              <Container>
                <CardHeader>
                  <h5 className="card-category">Cantidad de Mermeladas vendidas de los ultimos 3 meses</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    Cantidad
                  </CardTitle>
                </CardHeader>
              </Container>
              <Container>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartDataCantidad}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Container>
            </Card>
          </Col>
       
        </Row>
        
      </div>
    </>
  );
}

export default Dashboard;
