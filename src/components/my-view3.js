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
      #informacion{
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 60%;
        margin: auto;
      }

      #infodiv{
        height:100px;
        width: 80%;
      }

      .titulos{
        text-align: right;
        
      }

      #chart1{
        width:80%;
        margin: auto;
        text-aling: center;
      }
      `
    ];
  }

  

  render() {
    
    return html`
      <div id="infodiv">
        
      </div>

      <div id="chart1">
        
      </div>
    `;
  }

  


  firstUpdated(){
    window.divMemoria2 = this.shadowRoot.querySelector("#infodiv");
    window.divChart12 = this.shadowRoot.querySelector("#chart1");
    
    window.funcGraficarCPU = (function(){
       
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['RAM', 'MB'],
            ['Memoria libre', window.freeRamVal],
            ['Memoria en uso', window.usoRamVal]
        ]);
        var options = {
          title: 'Porcentaje de RAM usada'
        };
        const pie_1_chart = new GoogleCharts.api.visualization.PieChart(window.divChart12);
        pie_1_chart.draw(data,options);
    });
    
    window.funcp = (async function(){
      try {
        var miInit = { 
          method: 'GET',
          mode: 'cors'
        };  
        const response = await fetch('http://146.148.68.89:3000/memoria',miInit);
          if (response.status === 200) {
              const myJson = await response.json(); 
              window.totalRamVal = myJson.Total_mem;
              window.freeRamVal = myJson.Free_mem;
              window.usoRamVal = window.totalRamVal - window.freeRamVal;
              window.porcentRamVal = Number(( (window.totalRamVal - window.freeRamVal)/ window.totalRamVal ) * 100).toFixed(2);
              window.divMemoria2.innerHTML = `<table id="informacion">
                <tr>
                  <td class="titulos">Memoria Total :</td>
                  <td>${window.totalRamVal}</td>
                </tr>
                <tr>
                  <td class="titulos">Memoria Usada :</td>
                  <td>${window.totalRamVal - window.freeRamVal}</td>
                </tr>
                <tr>
                  <td class="titulos">Memoria Libre :</td>
                  <td>${window.freeRamVal}</td>
                </tr>
                <tr>
                  <td class="titulos">Porcentaje :</td>
                  <td>${window.porcentRamVal}</td>
                </tr>
              </table> `;        
              window.funcGraficarCPU();
          } 
      } catch (err) {
          console.log(err);
      } 
      setTimeout(window.funcp, 1000);
    });
    window.funcp();
    GoogleCharts.load(window.funcGraficarCPU);
  }


}

window.customElements.define('my-view3', MyView3);
