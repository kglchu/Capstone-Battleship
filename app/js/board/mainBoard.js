function mainBoard(rows, cols, size, spacing)
{
	this.colCount = cols;
	this.rowCount = rows;
	this.innerCellSize = size;
	this.cellSpacing = spacing;
	this.cellSize = this.innerCellSize + this.cellSpacing;
}