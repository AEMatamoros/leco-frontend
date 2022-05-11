//FORMAT
let code = {"code":"for i in [1, 2, 3, 4]:print(i, end=' ')\na=5\nb=5\nprint(a+b)"}

export const transFormDrawflow = (drawflowObject)=>{
    let inNodes = [];
    let outNodes = [];

    Object.entries(drawflowObject.drawflow.Home.data).map(item => {
        let input1 = [];
        let input2 = [];
        switch (item[1].name) {
            case "Value":
                inNodes.push({id:item[1].id,value:item[1].data.value})
                break;
            case "Suma":

                item[1].inputs.input_1.connections.forEach(inNode => {
                    input1.push({operation:"Suma", inNode})
                });
                item[1].inputs.input_2.connections.forEach(inNode => {
                    input2.push({operation:"Suma", inNode})
                });

                break;
            case "Restar":
                item[1].inputs.input_1.connections.forEach(inNode => {
                    input1.push({operation:"Restar", inNode})
                });
                item[1].inputs.input_2.connections.forEach(inNode => {
                    input2.push({operation:"Restar", inNode})
                });
                break;
            case "Multiplicar":
                item[1].inputs.input_1.connections.forEach(inNode => {
                    input1.push({operation:"Multiplicar", inNode})
                });
                item[1].inputs.input_2.connections.forEach(inNode => {
                    input2.push({operation:"Multiplicar", inNode})
                });
                break;
            case "Dividir":
                item[1].inputs.input_1.connections.forEach(inNode => {
                    input1.push({operation:"Dividir", inNode})
                });
                item[1].inputs.input_2.connections.forEach(inNode => {
                    input2.push({operation:"Dividir", inNode})
                });
                break;
            case "Condicional":
                item[1].inputs.input_1.connections.forEach(inNode => {
                    input1.push({operation:"Condicional", inNode})
                });
                item[1].inputs.input_2.connections.forEach(inNode => {
                    input2.push({operation:"Condicional", inNode})
                });
                break;
                case "Bucle":
                    item[1].inputs.input_1.connections.forEach(inNode => {
                        input1.push({operation:"Bucle", inNode})
                    });
                    item[1].inputs.input_2.connections.forEach(inNode => {
                        input2.push({operation:"Bucle", inNode})
                    });
                    break;
            default:
                break;
        }

        outNodes.push({type:item[1].name,id:item[0], input1,input2, value:item[1].data.value})
        
    })

    
    return convertToString(inNodes, outNodes)
}

const convertToString = (inNodes, outNodes) =>{
    let code = ""
    inNodes.forEach(node => {
        code += `num${node.id}=${node.value}\n`
    });
    outNodes.forEach(node => {
        switch (node.type) {
            case "Suma":
                code += `print("El Resultado de la suma es: ", num${inNodes.filter(inNode=>inNode.id==node.input1[0].inNode.node)[0].id} + num${inNodes.filter(inNode=>inNode.id==node.input2[0].inNode.node)[0].id})\n`
                break;

            case "Restar":
                code += `print("El Resultado de la resta es: ", num${inNodes.filter(inNode=>inNode.id==node.input1[0].inNode.node)[0].id} - num${inNodes.filter(inNode=>inNode.id==node.input2[0].inNode.node)[0].id})\n`
                break;
            
            case "Multiplicar":
                code += `print("El Resultado de la multiplicacion es: ", num${inNodes.filter(inNode=>inNode.id==node.input1[0].inNode.node)[0].id} * num${inNodes.filter(inNode=>inNode.id==node.input2[0].inNode.node)[0].id})\n`
                break;
            
            case "Dividir":
                code += `print("El Resultado de la division es: ", num${inNodes.filter(inNode=>inNode.id==node.input1[0].inNode.node)[0].id} + num${inNodes.filter(inNode=>inNode.id==node.input2[0].inNode.node)[0].id})\n`
                break;
            case "Condicional":
                code += `print("El Resultado de la comparación es ${node.value} : ", num${inNodes.filter(inNode=>inNode.id==node.input1[0].inNode.node)[0].id} ${node.value} num${inNodes.filter(inNode=>inNode.id==node.input2[0].inNode.node)[0].id})\n`
                break
            case "Bucle":
                code += `print("Imprimiendo en bucle")\nfor i in range(${inNodes.filter(inNode=>inNode.id==node.input1[0].inNode.node)[0].value}):\n\tprint(${inNodes.filter(inNode=>inNode.id==node.input2[0].inNode.node)[0].value})\n`
                break
            default:
                break;
        }
    });

    return code
    
}
