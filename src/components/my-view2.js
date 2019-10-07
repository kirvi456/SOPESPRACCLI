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
      #informacion{
        font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 50%;
        margin: auto;
      }

      #infodiv{
        height:90px;
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
    window.valoresCPU = [0,0,0,0,0,0,0,0,0,0];
    window.divMemoria = this.shadowRoot.querySelector("#infodiv");
    window.divChart1 = this.shadowRoot.querySelector("#chart1");
    
    window.funcGraficarCPU = (function(){
      for(var i = 0; i <= 8; i++){
        window.valoresCPU[i] = window.valoresCPU[i+1];
      }
      window.valoresCPU[9] = typeof window.cpuVal == 'string' ? parseFloat(window.cpuVal):window.cpuVal;
       console.log(window.valoresCPU);
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['Tiempo', 'Porcentaje'],
            ['-9', window.valoresCPU[0]],
            ['-8', window.valoresCPU[1]],
            ['-7', window.valoresCPU[2]],
            ['-6', window.valoresCPU[3]],
            ['-5', window.valoresCPU[4]],
            ['-4', window.valoresCPU[5]],
            ['-3', window.valoresCPU[6]],
            ['-2', window.valoresCPU[7]],
            ['-1', window.valoresCPU[8]],
            ['0', window.valoresCPU[9]]
        ]);
        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };
        const pie_1_chart = new GoogleCharts.api.visualization.LineChart(window.divChart1);
        pie_1_chart.draw(data,options);
    });
    
    window.funcp = (async function(){
      try {
        var miInit = { 
          method: 'GET',
          mode: 'cors'
        };  
        const response = await fetch('http://localhost:3000/cpu',miInit);
          if (response.status === 200) {
              const myJson = await response.json(); 
              window.cpuVal = Number(myJson.Uso_cpu).toFixed(2);
              if(window.cpuVal >=  100){
                 window.cpuVal = 99.9;
              } 
              window.divMemoria.innerHTML = `<table id="informacion">
                <tr>
                  <td class="titulos">Cpu en uso :</td>
                  <td>${window.cpuVal}</td>
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

window.customElements.define('my-view2', MyView2);