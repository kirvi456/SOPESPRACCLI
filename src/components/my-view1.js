
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

      #informacion td{
        width:50%;
      }

      #btndiv{
        height:100px;
        padding:20px;
        margin: auto;
        width: 80%;
        text-align: center;
      }

      #btn, #btnKill {
        background-color: #4CAF50; 
        border: none;
        color: white;
        padding: 5px 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
      }

      .titulos{
        text-align: right;
        
      }

      #total{
        background-color: #f2f2f2;
      }

      #informacion{
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 60%;
        margin: auto;
      }

      #infodiv{
        height:200px;
      }

      #tabladiv{
        height:200px;

        overflow:scroll;
        overflow-x:hidden;
      }

      

      #procesos {
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        table-layout: fixed;
        width: 100%;
      }
      
      #procesos td, #customers th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      
      #procesos tr:nth-child(even){background-color: #f2f2f2;}
      
      #procesos tr:hover {background-color: #ddd;}
      
      #procesos th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
      }`
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

    var miInit = { 
      method: 'GET',
      mode: 'cors'
    };

    fetch('http://35.193.165.96:3000/principal',miInit)
    .then(function(response) {
      return response.json();
    })
    .then(myJson => this.setContent(myJson)
    );

  }

  setContent(myJson){

    this.shadowRoot.querySelector("#infodiv").innerHTML = `
      <table id="informacion">
      <tr>
        <td class="titulos">Ejecutandose :</td>
        <td>${myJson.Procesos_ejecutandose}</td>
      </tr>
      <tr>
        <td class="titulos">Suspendidos :</td>
        <td>${myJson.Procesos_suspendidos}</td>
      </tr>
      <tr>
        <td class="titulos">Detenidos :</td>
        <td>${myJson.Procesos_detenidos}</td>
      </tr>
      <tr>
        <td class="titulos">Desocupados :</td>
        <td>${myJson.Procesos_desocupados}</td>
      </tr>
      <tr>
        <td class="titulos">Zombie :</td>
        <td>${myJson.Procesos_zombie}</td>
      </tr>
      <tr>
        <td class="titulos">Otros :</td>
        <td>${myJson.Procesos_otros}</td>
      </tr>
      <tr id="total" >
        <td class="titulos">Total:</td>
        <td>${myJson.Procesos_total}</td>
      </tr>
      </table>
      `;
    this.shadowRoot.querySelector("#tabladiv").innerHTML = myJson.Procesos_tabla;
  }

  render() {
    
    return html`
      
      <div id="infodiv">
        <p>jujujuju</p>
      </div>
      <div id="tabladiv">
        <p>jujujuju</p>
      </div>
      <div id="btndiv">
        <input type="" id="inputProcess">
        <button id="btnKill" @click="${this.matarProceso}">Kill</button>
        <button id="btn" @click="${this.obtenerDatos}">Actualizar</button>
      </div>
    `;
  }

  firstUpdated(){
    this.obtenerDatos();
  }

}

window.customElements.define('my-view1', MyView1);
