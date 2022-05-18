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
import { h, getCurrentInstance, render } from 'vue'
//FETCH
import { fetchAPI } from '../helpers/fetch.js'
//CODE GENERATOR
import { transFormDrawflow } from '../helpers/pythonCodeGenerator.js'
//NodesHTML
import { nodes } from '../helpers/returnNodesHTML';

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
        
          this.saveObject(drawflowObject);

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
      const reader = new FileReader()
      reader.onload = (res) => {
        this.editor.import(JSON.parse(res.target.result))
      }
      reader.onerror = (err) => console.error(err)
      reader.readAsText(referenci)
    },
    addValueNode() {
      var data = { value: 1 }
      this.editor.addNode( 'Value', 0, 1, 0, 0, 'child-node node-element', data, nodes.valueNodeHtml,)
    },
    addSumNode() {
      this.editor.addNode( 'Suma', 2, 0, 0, 0, 'child-node node-element-operation', {}, nodes.sumNodeHtml,)
    },
    addSubNode() {
      this.editor.addNode( 'Restar', 2, 0, 0, 0, 'child-node node-element-operation', {}, nodes.subNodeHtml,)
    },
    addMulNode() {
      this.editor.addNode( 'Multiplicar', 2, 0, 0, 0, 'child-node node-element-operation', {}, nodes.mulNodeHtml,)
    },
    addDivNode() {
      this.editor.addNode( 'Dividir', 2, 0, 0, 0, 'child-node node-element-operation', {}, nodes.divNodeHtml,)
    },
    addCondNode() {
      this.editor.addNode('Condicional',2,0,0,0,'child-node node-element-structure',{},nodes.conditionNodeHtml,)
    },
    addBucleNode() {
      this.editor.addNode( 'Bucle', 2, 0, 0, 0, 'child-node node-element-structure', {}, nodes.bucleNodeHtml,)
    },
    showCode() {
      console.log(this.editor.export())
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
  @import "./home.scss";
</style>
