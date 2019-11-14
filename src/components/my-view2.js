import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import {GoogleCharts} from 'google-charts';
// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView2 extends PageViewElement {


  static get styles() {
    return [
      SharedStyles,
      css`
      

      hr { 
        display: block;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        border-style: inset;
        border-width: 1px;
      } 

      #contenedor2{
        width: 90%;
        height: 500px;
        margin: auto;
      }

      #infodiv2{
        height: 40%;
        width: 100%;
        margin: auto;
      }

      #tabladiv2{
        height: 60%;
        width: 70%;
        overflow:scroll;
        overflow-x:hidden;
        margin: auto;
        
      }

      #informacion td{
        width:50%;
      }

      .titulos{
        text-align: right;        
      }

      #informacion{
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 60%;
        margin: auto;
      }

     

      .mensaje{
        height: 100px;
        width: 95%;
        margin: auto;
      }

      .caja_de_texto{
        display: inline-block;
        width: 100%;
        height: 66%; 
      }

      .titulomensaje{
        display: inline-block;
        width: 100%;
        height: 25%;
      }

      .usuariop{
        float: left;
        margin-top: 0;
        margin-bottom: 0;        
        color: #a8a7a3;
      }

      .nombrep{
        float: left;
        margin-top: 0;
        margin-bottom: 0;
        
        font-weight: bold;
        color: #E91E63;
      }

      .textop{
        margin-top: 0;
        margin-bottom: 0;
      }
      `
    ];
  }

  

  render() {
    return html`
      <div id= "contenedor2">
        <div>
          <input type="text" value="kirvi456" id = "buscador1">
        </div>
        <div id="infodiv2">
        </div>
        <div id="tabladiv2">
        </div>
      </div>
    `;
  }

  


  firstUpdated(){
    window.InformacionDivPag2 = this.shadowRoot.querySelector("#infodiv2");
    window.MensajesDivPag2 = this.shadowRoot.querySelector("#tabladiv2");
    window.CajaParaUsuario = this.shadowRoot.querySelector("#buscador1");

    //PRIMERA FUNCION PARA DESPLEGAR LOS TITULOS
    window.setearTitulosPag2 = ( function(myJson){
      
      let usuarioUser = "--";
      let usuarioName = "--";
      let usuarioNoTweets = "0";
      console.log(myJson);
      if(myJson.length > 0){
        usuarioUser = myJson[0]["usuario"];
        usuarioName = myJson[0]["nombre"];
        usuarioNoTweets = myJson.length;
      }

      window.InformacionDivPag2.innerHTML = `
        <table id="informacion">
        <tr>
          <td class="titulos">Usuario :</td>
          <td>${usuarioUser}</td>
        </tr>
        <tr>
          <td class="titulos">Nombre :</td>
          <td>${usuarioName}</td>
        </tr>
        <tr>
          <td class="titulos">No. Tweets :</td>
          <td>${usuarioNoTweets}</td>
        </tr>
        </table>
        `;
    });

    //SEGUNDA FUNCION
    window.setearMensajesPag2 = (function(myJson){
      let aux = ``;
      for(var k in myJson){
        aux +=  `
        <div class = "mensaje">
  
          <div class = "titulomensaje">
            <p class = "nombrep">
              &nbsp;&nbsp;&nbsp;${myJson[k].nombre}
            </p>
            <p class = "usuariop">
              &nbsp; @${myJson[k].usuario}
            </p>          
          </div>
  
          <div class = "caja_de_texto">
            <p class = "textop">
              ${myJson[k].txt}
            </p>     
          </div>
        </div>   
        <hr>
        <br>
        `;
        window.MensajesDivPag2.innerHTML = aux;
      }
  
    });

    //LA MERA MERA
    window.actualizarPagina2 = (async function(){
      let data = JSON.stringify({usuario : window.CajaParaUsuario.value});
      var miInit = { 
        method: 'POST',
        mode: 'no-cors',
        headers:{
          'Content-Type': 'application/json'
        },
        body: data
      };
  

      fetch('http://104.154.225.229:5000/buscarUsuario',miInit)
      .then(function(response) {
        return response;
      })
      .then(myJson => window.setearTitulosPag2(myJson)
      );


      fetch('http://104.154.225.229:5000/buscarUsuario',miInit)
      .then(function(response) {
        return response;
      })
      .then(myJson => window.setearMensajesPag2(myJson)
      );

      console.log("Actualizado pag 2.");
      setTimeout(window.actualizarPagina2, 5000);
    });
    
    window.actualizarPagina2();
  }


}

window.customElements.define('my-view2', MyView2);
