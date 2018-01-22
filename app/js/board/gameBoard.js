function gameBoard(rows, cols, size, spacing, gameState)
{
	this.colCount = cols;
	this.rowCount = rows;
	this.innerCellSize = size;
	this.cellSpacing = spacing;
	this.cellSize = this.innerCellSize + this.cellSpacing;
	
	this.state = gameState;
}

gameBoard.prototype.setupBoard = function(board)
	{
		for (var Col = 0; Col < this.colCount; Col++) {
			for (var Row = 0; Row < this.rowCount; Row++) {
				var pCell = this.state.playerCells.create((Col * this.cellSize) + this.cellSize/2 + 2, (Row * this.cellSize + this.innerCellSize/2 + 64), 'cell', 0);
				pCell.anchor.setTo(0.5, 0.5);
				pCell.enemyContact = 0; // var used to represent successful hit
				pCell.marker = board.matrix[Row][Col];
				this.state.shipPlacement(this.state.playerShips, pCell, pCell.marker, false, board.index);
				pCell.posX = pCell.x;
				pCell.posY = pCell.y;
				// check to see if there is a marker in cell
				pCell.hasEnemy = pCell.marker > 0;
				pCell.isHit = false;
			}
		}
	};