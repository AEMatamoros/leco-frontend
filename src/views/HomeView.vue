<template>
  <div class="home">
    <div class="drawflow-container-father">
      <div id="drawflow" ref="drawflow" class="drawflow-container"></div>
      <div class="w-100 p-0 mt-1">
        <textarea
          rows="11"
          cols=""
          disabled
          ref="terminal"
          class="form-control bg-dark text-success"
          style="font-weight: bold; font-size: 2rem; height:50vh;"
        ></textarea>
      </div>
    </div>
    <div class="terminal">
      <div class="options w-100">
        <div class="w-100 p-1">
          <label for="custom-input" class="btn btn-success form-control">
            Importar
          </label>
          <input
            id="custom-input"
            class="btn btn-success form-control"
            accept="aplication/json"
            placeholder="Importar"
            type="file"
            ref="customInput"
            @change="importNodes()"
            hidden
          />
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success form-control" @click="exportNodes()">
            Exportar
          </div>
        </div>
        <div class="w-100 p-1">
          <div class="btn btn-success w-100 form-control" @click="saveNodes()">
            <span v-if="$route.params.id">Actualizar</span>
            <span v-else>Guardar</span>
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
      <h2>Terminal</h2>
      <div class="w-100 p-1">
        <div class="btn btn-success w-100 form-control" @click="showCode()">
          Mostrar Codigo
        </div>
      </div>
      <div class="w-100 p-1">
        <div class="btn btn-success w-100 form-control" @click="executeCode()">
          Ejecutar Codigo
        </div>
      </div>
      <h2>Nombre</h2>
      <div class="w-100 p-1">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="drawname"
            ref="drawname"
          />
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
//FETCH
import { fetchAPI } from '../helpers/fetch.js'
//CODE GENERATOR
import { transFormDrawflow } from '../helpers/pythonCodeGenerator.js'

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      editor: null,
      objectId: undefined,
    }
  },
  methods: {
    exportNodes() {
      let exportedNodes = this.editor.export()
      var a = document.createElement('a')
      var file = new Blob([JSON.stringify(exportedNodes)], {
        type: 'text/plain',
      })
      a.href = URL.createObjectURL(file)
      a.download = 'Nodes.json'
      a.click()
    },
    saveNodes() {
      let exportedNodes = this.editor.export()
      let drawflowObject = {
        name: this.$refs.drawname.value,
        exportedNodes: JSON.stringify(exportedNodes),
      }
      
      if (!!drawflowObject.name && !!drawflowObject.exportedNodes) {
        if(!!this.objectId){
          this.saveObject(drawflowObject);
          // this.updateObject(drawflowObject);
        }else{
          this.saveObject(drawflowObject);
        }
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            'Verifica que tu diagrama tenga un nombre y minimo un nodo agregado',
        })
      }
    },
    importNodes() {
      let referenci = this.$refs.customInput.files[0]
      let content
      const reader = new FileReader()
      reader.onload = (res) => {
        this.editor.import(JSON.parse(res.target.result))
      }
      reader.onerror = (err) => console.error(err)
      reader.readAsText(referenci)
    },
    addValueNode() {
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
          <p>Salida:Un valor entero.</p>
        </div>
      `
      var data = { value: 1 }
      this.editor.addNode(
        'Value',
        0,
        1,
        0,
        0,
        'child-node node-element',
        data,
        html,
      )
    },
    addSumNode() {
      var html = `
        <h3>Suma</h3>
        <p>Numero 1</p>
        <p>Numero 2</p>
      `
      var data = { value: 0 }
      this.editor.addNode(
        'Suma',
        2,
        0,
        0,
        0,
        'child-node node-element-operation',
        {},
        html,
      )
    },
    addSubNode() {
      var html = `
        <h3 >Resta</h3>
        <p>Numero 1</p>
        <p>Numero 2</p>
      `
      var data = { value: 0 }
      this.editor.addNode(
        'Restar',
        2,
        0,
        0,
        0,
        'child-node node-element-operation',
        {},
        html,
      )
    },
    addMulNode() {
      var html = `
        <h3 >Muliplicación</h3>
        <p>Numero 1</p>
        <p>Numero 2</p>
      `
      var data = { value: 0 }
      this.editor.addNode(
        'Multiplicar',
        2,
        0,
        0,
        0,
        'child-node node-element-operation',
        {},
        html,
      )
    },
    addDivNode() {
      var html = `
        <h3 >División</h3>
        <p>Numero 1</p>
        <p>Numero 2</p>
      `
      var data = { value: 0 }
      this.editor.addNode(
        'Dividir',
        2,
        0,
        0,
        0,
        'child-node node-element-operation',
        {},
        html,
      )
    },
    addCondNode() {
      var html = `
        <h3 >Condición</h3>
        <div>
          <select type="text" df-value class="form-control">
            <option value="" selected disabled>Selecciona una opción</option>
            <option value="==">==</option>
            <option value=">=">>=</option>
            <option value="<="><=</option>
            <option value="<"><</option>
            <option value=">">></option>
            <option value="!=">!=</option>
          </select>
        </div>
        <p>Numero 1</p>
        <p>Numero 2</p>
      `
      var data = { value: '' }
      this.editor.addNode(
        'Condicional',
        2,
        0,
        0,
        0,
        'child-node node-element-structure',
        data,
        html,
      )
    },
    addBucleNode() {
      var html = `
        <h3 >Bucle</h3>
        <p>Numero 1:Numero de Iteraciones</p>
        <p>Numero 2:Numero a Imprimir</p>
      `
      var data = { value: 0 }
      this.editor.addNode(
        'Bucle',
        2,
        0,
        0,
        0,
        'child-node node-element-structure',
        {},
        html,
      )
    },
    showCode() {
      this.$refs.terminal.value = transFormDrawflow(this.editor.export())
    },
    async executeCode() {
      let response = await fetchAPI(
        `execute`,
        { code: transFormDrawflow(this.editor.export()) },
        `POST`,
      )
      let data = await response.text()
      if (!!data) {
        this.$refs.terminal.value = data
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error al ejecutar el codigo',
        })
      }
    },
    async getDrawById(id) {
      let response = await fetchAPI(`${id}`, {})
      let data = await response.json()
      data.drawflow[0].exportedNodes = JSON.parse(
        data.drawflow[0].exportedNodes,
      )
      this.editor.import(data.drawflow[0].exportedNodes)
      this.$refs.drawname.value = data.drawflow[0].name
    },
    async saveObject(drawflowExport) {
      let response = await fetchAPI(``, drawflowExport, `POST`)
      if (response.status == 200) {
        this.$swal.fire({
          icon: 'success',
          title: 'Diagrama salvado correctamente',
          showConfirmButton: false,
        })
        this.$router.push({ name: 'list' })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error al guardar el diagrama',
        })
      }
    },
    async updateObject(drawflowExport) {
      let response = await fetchAPI(`${this.objectId}`, drawflowExport, `PUT`)
      if (response.status == 200) {
        this.$swal.fire({
          icon: 'success',
          title: 'Diagrama salvado correctamente',
          showConfirmButton: false,
        })
        this.$router.push({ name: 'list' })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrio un error al guardar el diagrama',
        })
      }
    },
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

    if (!!this.$route.params.id) {
      this.objectId = this.$route.params.id
      this.getDrawById(this.$route.params.id)
    } else {
      this.editor.clear()
    }
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
  height: 50vh !important;
  width: 30%;
  padding: 0 20px;
}
.drawflow-container-father {
  width: 70%;
  height: 95vh;
}
.drawflow-container {
  margin: 0;
  padding: 20px;
  width: 100%;
  height: 50vh;
  text-align: initial;
  background: #42b983;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}

.child-node {
  width: 300px !important;
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
    margin-top: 50px;
    width: 100%;
    padding: 0 20px;
  }
  .drawflow-container-father {
    width: 100%;
  }
}
</style>
