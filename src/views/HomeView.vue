<template>
  <div class="home">
    <div id="drawflow" ref="drawflow" class="drawflow-container"></div>
    <div class="terminal">
      <div class="options w-100">
        <div class="w-50 p-1">
          <div class="btn btn-success form-control" @click="importNodes()">
            Importar
          </div>
        </div>
        <div class="w-50 p-1">
          <div class="btn btn-success form-control" @click="saveNodes()">
            Exportar
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="saveNodes()">
            Guardar
          </div>
        </div>
      </div>
      <h2>Agregar Nodos</h2>
      <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addValueNode()">
            Valor
          </div>
      </div>
      <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addSumNode()">
            Suma
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addSubNode()">
            Resta
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addMulNode()">
            Multiplicación
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addDivNode()">
            División
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addCondNode()">
            Condicional
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="addBucleNode()">
            Bucle
          </div>
        </div>
    </div>
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
  components: {},
  data() {
    return {
      editor: null,
    }
  },
  methods: {
    saveNodes() {
      let exportedNodes = this.editor.export()
      console.log(exportedNodes)
    },
    importNodes() {
      this.editor.import()
    },
    addValueNode(){
      var html = `
        <h3 >Valor</h3>
        <div>
          <select type="text" df-value class="form-control">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
        </div>
      `;
      var data = { "value": 1 };
      this.editor.addNode("Value", 0, 1, 0, 0, "child-node node-element",data,html );
      
    },
    addSumNode(){
      var html = `
        <h3 >Suma</h3>
      `;
      var data = { "value": 0 };
      this.editor.addNode("Suma", 2, 0, 0, 0, "child-node node-element-operation", {},html );
    },
    addSubNode(){
      var html = `
        <h3 >Resta</h3>
      `;
      var data = { "value": 0 };
      this.editor.addNode("Restar", 2, 0, 0, 0, "child-node node-element-operation", {},html );
    },
    addMulNode(){
      var html = `
        <h3 >Muliplicación</h3>
      `;
      var data = { "value": 0 };
      this.editor.addNode("Multiplicar", 2, 0, 0, 0, "child-node node-element-operation", {},html );
    },
    addDivNode(){
      var html = `
        <h3 >División</h3>
      `;
      var data = { "value": 0 };
      this.editor.addNode("Dividir", 2, 0, 0, 0, "child-node node-element-operation", {},html );
    },
    addCondNode(){
      var html = `
        <h3 >Condición</h3>
        <div>
          <select type="text" df-value class="form-control">
            <option>==</option>
            <option>=></option>
            <option>=<</option>
            <option><</option>
            <option>></option>
            <option>!=</option>
          </select>
        </div>
      `;
      var data = { "value": 0 };
      this.editor.addNode("Condicional", 2, 0, 0, 0, "child-node node-element-structure", {},html );
    },
    addBucleNode(){
      var html = `
        <h3 >Bucle</h3>
        <div>
          <textarea type="text" df-value class="form-control">
          </textarea>
        </div>
      `;
      var data = { "value": 0 };
      this.editor.addNode("Bucle", 2, 0, 0, 0, "child-node node-element-structure", {},html );
    },
    sum(e){console.log(e)},
    sub(e){console.log(e)},
    mul(e){console.log(e)},
    div(e){console.log(e)},

        
  },
  mounted() {
    const Vue = { version: 3, h, render }

    this.id = this.$refs.drawflow
    this.editor = new Drawflow(this.id, Vue)
    // Pass render Vue 3 Instance
    const internalInstance = getCurrentInstance()

    this.editor.value = new Drawflow(
      this.id,
      Vue,
      internalInstance.appContext.app._context,
    )

    this.editor.start()


  },
  setup() {},
}
</script>

<style>
.home {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.terminal {
  width: 30%;
  padding: 0 20px;
}
.drawflow-container {
  margin: 0;
  padding: 20px;
  width: 70%;
  height: 100vh;
  text-align: initial;
  background: #42b983;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}

.child-node {
  width: 250px !important;
  min-height: 100px !important;
  height: auto !important;
  border-radius: 10px;
}

.node-element {
  background-color: rgb(217, 176, 255) !important;
}

.node-element-operation {
  background-color: rgb(176, 255, 180) !important;
}

.node-element-structure {
  background-color: rgb(255, 254, 176) !important;
}

.custom-input {
  width: 100%;
}
.options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

@media (max-width: 792px) {
  .terminal {
    margin-top: 20px;
    width: 100%;
    padding: 0 20px;
  }
  .drawflow-container {
    width: 100%;
  }
}
</style>
