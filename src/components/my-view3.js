import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import {GoogleCharts} from 'google-charts';
// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView3 extends PageViewElement {


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

      #contenedor3{
        width: 90%;
        height: 500px;
        margin: auto;
      }

      #infodiv3{
        height: 40%;
        width: 100%;
        margin: auto;
      }

      #tabladiv3{
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
      <div id= "contenedor3">
      <div>
        <input type="text" value="nintendo" id = "buscador3">
      </div>
      <div id="infodiv3">
      </div>
      <div id="tabladiv3">
      </div>
      </div>
    `;
  }

  


  firstUpdated(){
    window.InformacionDivPag3 = this.shadowRoot.querySelector("#infodiv3");
    window.MensajesDivPag3 = this.shadowRoot.querySelector("#tabladiv3");
    window.CajaParaCategoria = this.shadowRoot.querySelector("#buscador3");

    //PRIMERA FUNCION PARA DESPLEGAR LOS TITULOS
    window.setearTitulosPag3 = ( function(myJson){
      
      console.log(myJson);
      let categoriaNoTweets = "0";
      
      console.log(myJson);


      if(myJson.length > 0){
        categoriaNoTweets = myJson.length;
      }

      window.InformacionDivPag3.innerHTML = `
        <table id="informacion">
        <tr>
          <td class="titulos">No. Tweets :</td>
          <td>${categoriaNoTweets}</td>
        </tr>
        </table>
        `;
    });

    //SEGUNDA FUNCION
    window.setearMensajesPag3 = (function(myJson){
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
        
      }
      window.MensajesDivPag3.innerHTML = aux;
  
    });

    //LA MERA MERA
    window.actualizarPagina3 = (async function(){
      let data = JSON.stringify({categoria : window.CajaParaCategoria.value});
      var miInit = { 
        method: 'POST',
        //mode: 'cors',
        headers:{
          'Content-Type': 'application/json'
        },
        body: data
      };
  

      fetch('http://104.154.225.229:5000/buscarCategoria',miInit)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => window.setearTitulosPag3(myJson)
      );


      fetch('http://104.154.225.229:5000/buscarCategoria',miInit)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => window.setearMensajesPag3(myJson)
      );

      console.log("Actualizado pag 2.");
      setTimeout(window.actualizarPagina3, 5000);
    });
    
    window.actualizarPagina3();
  }


}

window.customElements.define('my-view3', MyView3);
