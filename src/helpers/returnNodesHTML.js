//Objeto que contiene el html de los nodos
export const nodes = {
  valueNodeHtml: `
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
          <strong><p>Salida: Un valor entero.</p></strong>
        </div>`,
  sumNodeHtml: `
    <h3>Suma</h3>
    <strong><p>Numero 1</p></strong>
    <strong><p>Numero 2</p></strong>`,
  subNodeHtml: `
    <h3 >Resta</h3>
    <strong><p>Numero 1</p></strong>
    <strong><p>Numero 2</p></strong>`,
  mulNodeHtml: `
    <h3 >Muliplicación</h3>
    <strong><p>Numero 1</p></strong>
    <strong><p>Numero 2</p></strong>`,
  divNodeHtml: `
    <h3 >División</h3>
    <strong><p>Numero 1</p></strong>
    <strong><p>Numero 2</p></strong>`,
  conditionNodeHtml: `
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
    <strong><p>Numero 1</p></strong>
    <strong><p>Numero 2</p></strong>
    <p>== Compara si Ambos valores son iguales</p>
    <p>>= Compara si el primer valor es mayor o igual al segundo</p>
    <p><= Compara si Compara si el primer valor es menor o igual al segundo</p>
    <p>< Compara si el primer valor es menor al segundo</p>
    <p>> Compara si el primer valor es mayor al segundo</p>
    <p>!= Compara si el valor del primero y el segundo son distintos</p>
    </div>
    `,
  bucleNodeHtml: `
    <h3 >Bucle</h3>
    <strong><p>Numero 1: Numero de Iteraciones</strong>
    <strong><p>Numero 2: Numero a Imprimir</strong>`,
}
