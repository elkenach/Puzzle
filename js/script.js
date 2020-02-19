//optener elementos principales del HTML
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var selectedPiece = null;


//llamar la funcion
createBoard();
createPieces();

//definicion de la funcion            declarar parametro position al objeto
function createCell(width, height, position){

	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.style.border = "1px solid black";
	cellElement.style.backgroundColor = "##EB5E00";
	cellElement.dataset.position = position;
	cellElement.dataset.fill = false;
	cellElement.onclick = clickCell;

	return cellElement;
}

//definicion de la funcion
function createPiece(width, height, piece){

	var cellElement = document.createElement("div"); //objeto - aqui guardamoa la pieza
	var pieceElement = document.createElement("img");

	//configurando la celda para la pieza, dentro del contenedor de piezas
	cellElement.style.width = width;
	cellElement.style.height =height;
	//configurando la pieza, dentro del contenedor piezas
	pieceElement.width = width;
	pieceElement.height = height;
	pieceElement.border = "1px solid black";
	pieceElement.src = piece.image;

	pieceElement.dataset.position = piece.position;
	pieceElement.dataset.moved = false;

	pieceElement.onclick = clickPiece;
	//mandar la pieza a la celda - agregar elementos al documento
	cellElement.appendChild(pieceElement);
	return cellElement;
}


//definicion de la funcion
function createBoard(){
	var width = containerCell.offsetWidth;
	var height =containerCell.offsetHeight;

	width /= 4;
	height /= 4;

	for(var i=0; i<16; i++){
		let cellElement = createCell(width, height, i);
		addCell(cellElement);

	}
}

function createPieces(){
	var width = containerPiece.offsetWidth;
	var height = containerPiece.offsetHeight;
	width /= 4;
	height /= 4;
	var pieces = generatePieceData();
	for(let i=0; i<16; i++){
		let pieceElement = createPiece(width, height, pieces[i]);
		addPiece(pieceElement);
	}

}

//definicion de la funcion
function addCell(element){

	containerCell.appendChild(element);
}

//para ver si la celda esta llena o no, para hacer el swap
function verifyCell(element){
	var fill = element.dataset.fill == "true";   //si es verdadero el element.dataset.fill, se va a guardaren fill
	if(fill){
		let piece = element.children[0];         //sacar el elemento de la celda
		element.appendChild(selectedPiece);
		addPieceByPosition(piece);
	}else{
		element.dataset.fill = true;
		element.appendChild(selectedPiece);
	}
}

function addPiece(element){
	containerPiece.appendChild(element);
}

function addPieceByPosition(element){
	var position = element.dataset.position;
	containerPiece.children[position].appendChild(element);
}


function generatePieceData(){
	//generamos una lista de piezas
	var pieces = [];
	
	for(let i = 0; i<16; i++){
		let piece ={image:"img/" + (i+1) + ".jpg", position:i};
		pieces.push(piece);
	}
	return pieces;
}	

function clickPiece(e){
	var piece = e.target;  //a qui optengo mi img
	
	if(piece.dataset.moved == "true"){     //verificamos si la pieza se movio
		verifyCell(piece.parentElement);
	}
	selectedPiece = piece;
}

function clickCell(e){

	if (e.target.parentElement.dataset.fill == "true"){
		if(selectedPiece){
			let cell = e.target.parentElement;
			verifyCell(cell);    //llamas a la función
			selectedPiece = null;
		}else {
		console.log("selecciona una pieza");
		}
	}else{
		e.target.dataset.fill = true;
		selectedPiece.dataset.moved = true;
		e.target.appendChild(selectedPiece);
		selectedPiece = null;
	}
}










