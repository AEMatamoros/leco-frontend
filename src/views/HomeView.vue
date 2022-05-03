<template>
  <div class="home">
    <div  id ="drawflow" ref="drawflow" class="drawflow-container"></div>
    
  </div>
</template>

<script>
//DRAWFLOW
import Drawflow from 'drawflow'
import styleDrawflow from 'drawflow/dist/drawflow.min.css'

//INSTANCE
import { h, getCurrentInstance, render, onMounted } from 'vue'

export default {
  name: 'HomeView',
  components: {
  },
  data(){
    return{
      editor:null
    }
  },
  mounted() {
    const Vue = { version: 3, h, render };
    
    this.id = this.$refs.drawflow;
    this.editor = new Drawflow(this.id, Vue);
    // Pass render Vue 3 Instance
    const internalInstance = getCurrentInstance()
    
    this.editor.value = new Drawflow(this.id, Vue, internalInstance.appContext.app._context);
    
    this.editor.start()
    var html = `
    <label>Node</label>
    <div><input type="text" df-name></div>
    `;
    var data = { "name": '' };
    this.editor.addNode('Value1', 0, 1, 0, 0, 'node-element-value', data, html);
    this.editor.addNode('Value2', 0, 1, 0, 200, 'node-element-value', data, html);

    this.editor.addNode('Sum', 0, 1, 300, 0, 'node-element', data, html);
    this.editor.addNode('Mul', 0, 1, 300, 200, 'node-element', data, html);
    this.editor.addNode('Sub', 0, 1, 300, 400, 'node-element', data, html);
    this.editor.addNode('Div', 0, 1, 300, 600, 'node-element', data, html);

    this.editor.addNode('if', 0, 1, 600, 0, 'node-element-structure', data, html);
    this.editor.addNode('Else', 0, 1, 600, 200, 'node-element-structure', data, html);


  },
  setup() {
    
  }
}
</script>

<style>
  .drawflow-container {
    margin: 0;
    padding: 20px;
    width: 50%;
    height: 100vh;
    text-align: initial;
    background: #e3e9ff;
    background-size: 20px 20px;
    background-image: radial-gradient(#494949 1px, transparent 1px);
  }

  .node-element{
    width: 200px !important;
    min-height: 100px !important;
    height: auto !important;
    background-color: rgb(217, 176, 255) !important;
  }

  .node-element-value{
    width: 200px !important;
    min-height: 100px !important;
    height: auto !important;
    background-color: rgb(176, 255, 180) !important;
  }

  .node-element-structure{
    width: 200px !important;
    min-height: 100px !important;
    height: auto !important;
    background-color: rgb(255, 254, 176) !important;
  }
  
</style>
