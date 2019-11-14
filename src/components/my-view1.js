
/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView1 extends PageViewElement {

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

      #contenedor{
        width: 90%;
        height: 500px;
        margin: auto;
      }

      #infodiv{
        height: 40%;
        width: 100%;
        margin: auto;
      }

      #tabladiv{
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


  matarProceso(){
    var data = JSON.stringify({Proceso_a_Matar : parseInt(this.shadowRoot.querySelector("#inputProcess").value,10) });

    console.log(data);

    var miInit = { 
      method: 'POST',
      mode: 'no-cors',
      headers:{
        'Content-Type': 'application/json'
      },
      body: data
    };

    fetch('http://35.193.165.96:3000/kill',miInit)
    .then(response => this.obtenerDatos()
    );

  }

  obtenerDatos(){

    
    window.actualizarPaginaPrincipal = (async function(){
      var miInit = { 
        method: 'GET',
        mode: 'cors'
      };
  

      fetch('http://104.154.225.229:5000/informacion',miInit)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => this.setContent(myJson)
      );


      fetch('http://104.154.225.229:5000/mensajes',miInit)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => this.setMensajes(myJson)
      );

      setTimeout(window.actualizarPaginaPrincipal(), 5000);
    });
  }

  setContent(myJson){

    this.shadowRoot.querySelector("#infodiv").innerHTML = `
      <table id="informacion">
      <tr>
        <td class="titulos">Total de Usuarios :</td>
        <td>${myJson.item1}</td>
      </tr>
      <tr>
        <td class="titulos">Total de Tweets :</td>
        <td>${myJson.item2}</td>
      </tr>
      <tr>
        <td class="titulos">Total de Categorias :</td>
        <td>${myJson.item3}</td>
      </tr>
      <tr>
        <td class="titulos">Usuario con mas Tweets :</td>
        <td>${myJson.item4}</td>
      </tr>
      <tr>
        <td class="titulos">Categoria con mas Tweets :</td>
        <td>${myJson.item5}</td>
      </tr>
      </table>
      `;


    //this.shadowRoot.querySelector("#tabladiv").innerHTML = myJson.Procesos_tabla;
  }


  setMensajes(myJson){
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
      this.shadowRoot.querySelector("#tabladiv").innerHTML = aux;
    }

  }

  render() {
    
    return html`
      <div id= "contenedor">
        <div id="infodiv">
        </div>
        <div id="tabladiv">
        </div>
      </div>
    `;
  }

  firstUpdated(){
    window.actualizarPaginaPrincipal();
  }

}

window.customElements.define('my-view1', MyView1);
