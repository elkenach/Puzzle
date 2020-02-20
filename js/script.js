//optener elementos principales del HTML
var containerCell = document.getElementById("container-cell");
var containerPiece = document.getElementById("container-piece");
var dialogElement = document.getElementById("dialog");
var selectedPiece = null;

document.onkeypress = keypress;

//llamar la funcion
createBoard();
createPieces();

//definicion de la funcion
function createCell(width, height, position){

	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.style.border = "1px solid black";
	cellElement.style.backgroundColor = "##EB5E00";
	cellElement.dataset.position = position;
	cellElement.onclick = clickCell;
	return cellElement;
}

//definicion de la funcion          parametros en la funcion
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

function addPiece(element){
	containerPiece.appendChild(element);
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
	var piece = e.target;
	selectedPiece = piece;
}

function clickCell(e){
	if(selectedPiece){
		let cell = e.target;
		cell.appendChild(selectedPiece);
	}else {
		console.log("selecciona una pieza");
	}
}

function keypress(ke){
	if(ke.keyCode == 101 || ke.keyCode == 69){
		let result = evaluateBoard();
		showDialog(result);
	}

}
                  //parametro
function showDialog(result){
	var imgElement =  dialogElement.children[0];
	var textContent = dialogElement.children[1];
	if(result){
		imgElement.src ="";  //poner la url de la imagen para ganar
		imgElement.width ="100";
		imgElement.height = "500";
		textContent.innerText ="Ganaste";
	} else {
		imgElement.src ="https://i.pinimg.com/736x/f4/4a/3e/f44a3ec3be36b1f2b0df3d232353d4c9.jpg"; // imagen de perdiste
		imgElement.width ="500";
		imgElement.height = "500";
		textContent.innerText = "Perdiste";
		returnPieces();
	}
	dialogElement.style.display = "block";
}

function evaluateBoard(){
	var cells = containerCell.children;         // se optendran los hijos  para guardarlos en cells
	for(cell of cells){
		let piece = cell.children[0];
		if(piece.dataset.position != cell.dataset.position){
			return false;
		}
	}
	return true;
}

function returnPieces(){
	let cells = containerCell.children;
	let cellPieces = containerPiece.children;

	for(cell of cells){
		let position = cell.dataset.position;
		let piece = cell.children[0];
		cellPieces[position].appendChild(piece);
	}           //[piece.dataset.position]   te regresa las fichas acomodadas
}






