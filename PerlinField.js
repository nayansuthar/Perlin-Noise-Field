class PerlinField {
  constructor (xPos, yPos, w, h, cS, nS) {
    this.x = xPos;
    this.y = yPos;
    this.width = w;
    this.height = h;
    this.cellSize = cS;
    this.noiseScale = nS;
    this.xSize = Math.ceil (w / cS);
    this.ySize = Math.ceil (h / cS);

    this.cells = [];
    for (var xi = 0; xi < this.xSize; xi++) {
      let _column = [];
      for (var yi = 0; yi < this.ySize; yi++) {

        let _cellX = this.x + xi * cS;
        let _cellY = this.y + yi * cS;
        let _cellCenterX = _cellX + cS/2;
        let _cellCenterY = _cellY + cS/2;
        let _cellValue = noise (xi * nS, yi * nS);
        let _cellAngle = _cellValue * Math.PI * 4;
        let _cellVector = p5.Vector.fromAngle(_cellAngle, cS/2);
        _column.push ({
          x: _cellX,
          y: _cellY,
          centerX: _cellCenterX,
          centerY: _cellCenterY,
          value: _cellValue,
          angle: _cellAngle,
          vector: _cellVector
        });
      }
      this.cells.push (_column);
    }
  }

  getCellAt (xPos, yPos) {
    return this.cells [Math.floor (xPos/this.cellSize)][Math.floor (yPos/this.cellSize)];
  }

  render () {
    for (var xi = 0; xi < this.xSize; xi++) {
      for (var yi = 0; yi < this.ySize; yi++) {
        let _cell = this.cells[xi][yi];
        fill (0,0,0,20);
        noStroke ();
        ellipse (_cell.centerX, _cell.centerY, this.cellSize, this.cellSize);
        fill (0,0,0,100);
        arc (
          _cell.centerX,
          _cell.centerY,
          this.cellSize,
          this.cellSize,
          _cell.angle - QUARTER_PI/3 + PI,
          _cell.angle + QUARTER_PI/3 + PI
        );
      }
    }
  }
}
