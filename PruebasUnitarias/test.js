const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const url= 'http://172.18.72.214:5000';

const { expect } = chai;
describe("Pruebas Unitarias", () => {
  it("Prueba Login", done => {
    chai
      .request(url)
      .post("/login/user")
      .send({id:2013048835, contra: "vic.arhz"})
      .end((err, res) => {
        expect(res.body.existe).to.equals(1);
        done();
      });
  });

  it("Prueba Registro", done => {
    chai
      .request(url)
      .post("/registro/user")
      .send({id:111, nombre: "Saruman", apellidos: "Mordor", correo: "sarumor@gmail.com", 
        telefono: 89451235, provincia: "Cartago", preferencias: "Carne, Ensaladas"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Ya existe un usuario asociado a la identificación");
        done();
      });
  });

  it("Prueba perfil", done => {
    chai
      .request(url)
      .post("/perfil/cliente")
      .send({id:111})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });

  it("Prueba modificar perfil", done => {
    chai
      .request(url)
      .post("/perfil/modPerfilCliente")
      .send({id:111, nombre: "Saruman", apellidos: "Mordor", correo: "sarumor@gmail.com", 
      telefono: 89451235, provincia: "Cartago", preferencias: "Carne, Ensaladas"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Modificado");
        done();
      });
  });

  it("Dar cuenta de baja", done => {
    chai
      .request(url)
      .post("/perfil/cuentaBaja")
      .send({id:111})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Baja");
        done();
      });
  });

  it("Configuraciones administrador: Relación puntos-platillo", done => {
    chai
      .request(url)
      .post("/configuraciones/puntosPlatillo")
      .send({tipo:"Carne", puntos:300})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Modificado");
        done();
      });
  });

  it("Configuraciones administrador: Relación puntos-descuento", done => {
    chai
      .request(url)
      .post("/configuraciones/puntosDescuento")
      .send({colones:500, puntos:50})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Modificado");
        done();
      });
  });

  it("Gestión de cuentas administrador: Dar una cuenta de baja", done => {
    chai
      .request(url)
      .post("/configuraciones/cuentaBaja")
      .send({id: 111, motivo:"Uso indebido de la aplicación"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Baja");
        done();
      });
  });


  it("Gestión de cuentas administrador: Reactivar una cuenta", done => {
    chai
      .request(url)
      .post("/configuraciones/reactivarCuenta")
      .send({id: 111, motivo:"Uso indebido de la aplicación"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.mensaje).to.equals("Activa");
        done();
      });
  });
});