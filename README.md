# FlowChart

La biblioteca se encuentra construida con Angular7. El tag HTML del componente es **lib-flowchart**

#### Ejemplo:
`<lib-flowchart></lib-flowchart>`

## Objetos
### Setting
Éste objeto sirve para inicializar el grafo, tiene las siguientes propiedades
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|width           |numérico                       |Ancho del canvas (valor mínimo: 2230)             |
|height          |numérico                       |Alto del canvas (valor mínimo: 1245)             |
|allowStyle      |booleano                       |Indica si se permite editar el color e ícono de los elementos|
|elements        |Element[]                      |Arreglo de elementos que se pueden dibujar en el grafo. Si no se indica valor, por defecto se dibujan los 4 tipos de elementos permitidos: Nodo de inicio, fin, normal y condicional.

### Element
Éste objeto sirve para definir un elemento que se puede dibujar en el grafo, tiene las siguientes propiedades
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|type			 |string, 4 valores posibles. 	 |Este indica el tipo de elemento en el grafo, dependiendo del tipo es el comportamiento que tendrá. Los 4 tipos son:<br>**N**: Normal. Tiene una salida y puede recibir entradas desde otros nodos. Es el nodo normal genérico de un grafo<br>**S**: Inicio. Tiene una salida, pero no puede recibir entradas de otros nodos. Se considera el punto de inicio del grafo<br>**E**: Fin. No tiene ninguna salida y puede recibir entradas de otros nodos. Se considera el punto de fin del grafo<br>**C**: Condicional. No tiene una salida única y puede recibir entradas desde otros nodos. Tiene un botón para agregar nodos de evaluación, podría considerarse como un switch dentro de un grafo
|typeId			 |string						 |Se utiliza como identificador interno para el desarrollador identificar los distintos tipos
|title			 |string						 |Título del nodo
|icon			 |string					     |Nombre del ícono
|style           |Style							 |Estilo del nodo

### Style
Éste objeto sirve para definir el estilo de un elemento, tiene las siguientes propiedades.
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|boxBackgroundColor|string						 |Color de fondo del elemento (código hex #FFFFFF)
|fontColor         |string						 |Color de las letras del elemento (código hex #FFFFFF)
Los valores por defecto dependerán del tipo de nodo, por defecto los nodos de Inicio son verdes, los nodos de Fin son rojos y los demás nodos son blancos.

## Ejemplo de configuración de componente

    {
        
    	width: 2230,
        height: 1245,
        allowStyle: false,
        elements: [
    		{
    			type: "S",
    			typeID: "S1",
    			icon: "play",
    			title: "Punto entrada",
    			style: {
    				boxBackgroundColor:  "#1DE9B6",
    				fontColor:  "#ffffff"
    			}
    		},
    		{
    			type: "N",
    			typeID: "N1",
    			icon: "arrow-right",
    			title: "Envía mensaje",
    			style:  {
    				boxBackgroundColor:  "#FFFFFF",
    				fontColor:  "#000000"				
    			}
    		}
    	]
    }

Adicionalmente existen otros objetos que se requieren para importar o exportar un grafo completo.
### Graph
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|nodes           |Node[]                         |Arreglo de nodos del grafo
|relationship    |Relationship[]                 |Arreglo de las relaciones entre nodos del grafo

### Node
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|id              |string                         |Identificador del nodo (valor autogenerado)
|width           |numérico                       |Ancho del nodo 
|height          |numérico                       |Alto del nodo 
|type            |string                         |Tipo de nodo
|typeID          |string                         |Identificador del elemento
|title           |string                         |Título del nodo
|description     |string                         |Descripción del nodo
|icon            |string                         |Ícono del nodo
|style			 |Style                          |Estilo del nodo
|point			 |Point                          |Posición del nodo en el grafo

### Point
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|x               |numérico                       |Posición X en el grafo
|y               |numérico                       |Posición Y en el grafo

### Relationship
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|id              |string                         |Identificador del nodo (valor autogenerado)
|fromId          |string                         |Identificador del nodo de inicio de la relación (desde)
|tiId            |string                         |Identificador del nodo de fin de la relación (hasta)
|points          |integer[]                      |Arreglo de puntos para trazar la relación entre 2 nodos
|relationship    |Relationship[]                 |Arreglo de las relaciones entre nodos del grafo

### Ejemplo de grafo

    {"nodes":[{"id":"N1","width":150,"height":35,"type":"N","typeID":"N","title":"Envía mensaje","description":"","icon":"arrow-right","style":{"boxBackgroundColor":"#FFFFFF","boxBorderWidth":1,"boxBorderColor":"#80bdff","fontColor":"#212529"},"point":{"x":76.03819274902344,"y":103.85417556762695}},{"id":"N2","width":150,"height":35,"type":"N","typeID":"N","title":"Envía mensaje","description":"","icon":"arrow-right","style":{"boxBackgroundColor":"#FFFFFF","boxBorderWidth":1,"boxBorderColor":"#80bdff","fontColor":"#212529"},"point":{"x":265.03819274902344,"y":239.85417556762695}}],"relationship":[{"id":"N3","fromId":"N1","toId":"N2","points":[151.03819274902344,103.85417556762695,151.03819274902344,257.35417556762695,265.03819274902344,257.35417556762695]}]}

## Métodos:
El componente cuenta con 2 métodos que cumplen los fines de exportar y cargar datos en el grafo.

### export:
Exporta los nodos del componente a un objeto **Graph**
#### Entrada:
No recibe parámetros. 
#### Salida: 
Objeto de tipo **Graph**

### load:
Realiza la carga un objeto grafo en el componente
#### Entrada:
Objeto de tipo **Graph**
#### Salida:
No tiene salida

## Eventos:

### onClickConfig
Este evento se dispara cuando se hace click en el botón de configuración de un nodo. Consta de los siguientes parámetros
|                |Tipo de dato                   |Descripción                  |
|----------------|-------------------------------|-----------------------------|
|node            |Node                           |Nodo sobre el que se realizó el click