Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var Cell = React.createClass({
    render: function() {
        return (
            <td
				style={{backgroundColor: this.props.color}}
                id={this.props.cell_id}
				onClick={this.props.onCellClick}>{this.props.symbol}</td>
        )
    }
});

var Row = React.createClass({
    render: function() {
        var cells = this.props.cells;
        var react_cells = [];
        for (var cell in cells) {
            if (cells.hasOwnProperty(cell)) {
                var cell_id = cells[cell]['cell_id'];
                var symbol = cells[cell]['symbol'];
				var color = cells[cell]['color'];
                react_cells.push(<Cell
                    symbol={symbol}
					color={color}
                    cell_id={cell_id}
                    key={cell_id}
					onCellClick={this.props.onCellClick}
                    currentSymbol={this.props.currentSymbol}
					currentColor={this.props.currentColor}
                />);
            }
        }
        return (
            <tr>
                {react_cells}
            </tr>
        )
    }
});

var Grid = React.createClass({
    getInitialState: function() {
        return {
            rows: {}
        }
    },
    handleSave: function() {
        $.ajax({
            url: this.props.saveGrid,
            type: 'POST',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            data: {rows: this.state.rows},
            cache: false,
            success: function() {

            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.saveGrid, status, err.toString());
            }.bind(this)
        });
    },
    loadGridFromServer: function() {
        $.ajax({
            url: this.props.getGrid,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(data) {
                this.setState({rows: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.getGrid, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadGridFromServer();
    },
    getTableBody: function() {
        var rows = this.state.rows;
        var react_rows = [];
        for (var row in rows) {
            if (rows.hasOwnProperty(row)) {
                var cells = rows[row];
                react_rows.push(<Row
                    cells={cells}
                    key={row}
                    ref={'row'}
                    onCellClick={this.handleCellClick}
                    currentSymbol={this.props.currentSymbol}
					currentColor={this.props.currentColor}
                />);
            }
        }
        return (
            <tbody>
                {react_rows}
            </tbody>
        )
    },
    handleCellClick: function(e) {
		var current_tool = this.props.currentTool;
        var target_cell_id = e.target.id;
        var rows = this.state.rows;
        var row_keys = Object.keys(rows);
        var found = false;
        for (i in row_keys) {
            var row = rows[row_keys[i]];
            for (var k = 0; k < Object.keys(row).length; k++) {
                var cell_id = rows[row_keys[i]][k].cell_id;
                if (cell_id == target_cell_id) {
					if (current_tool === 'symbol')
                    	rows[row_keys[i]][k].symbol = this.props.currentSymbol;
					else if (current_tool === 'color')
						rows[row_keys[i]][k].color = this.props.currentColor;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        this.setState({rows: rows});
    },
    getGridDetails: function() {
        var rows = this.state.rows;
        var row_keys = Object.keys(rows);
        var row_count = row_keys.length;
        var cell_count = Object.size(rows[row_keys.length-1]);
        var next_cell_id = rows[row_count-1][cell_count-1].cell_id+2;
        return {
            row_keys: row_keys,
            row_count: row_count,
            cell_count: cell_count,
            next_cell_id: next_cell_id
        };
    },
    handleAddRow: function() {
        var rows = this.state.rows;
        var grid = this.getGridDetails();
        if (grid['row_count'] < 200) {
            var new_row = {};
            for (var x = 0; x < grid['cell_count']; x++) {
                new_row[x] = {
                    cell_id: grid['next_cell_id'],
                    symbol: this.props.currentSymbol
                };
                grid['next_cell_id']++;
            }
            rows[grid['row_count']] = new_row;
            this.setState({rows: rows});
        }
    },
    handleAddCol: function() {
        var rows = this.state.rows;
        var grid = this.getGridDetails();
        if (grid['cell_count'] < 200) {
            for (var x = 0; x < grid['row_count']; x++) {
                rows[x][grid['cell_count']] = {
                    cell_id: grid['next_cell_id'],
                    symbol: this.props.currentSymbol
                };
                grid['next_cell_id']++;
            }
            this.setState({rows: rows});
        }
    },
    handleRemoveRow: function() {
        var rows = this.state.rows;
        var grid = this.getGridDetails(rows);
        if (grid['row_count'] > 1) {
            delete rows[grid['row_count']-1];
            this.setState({rows: rows});
        }
    },
    handleRemoveCol: function() {
        var rows = this.state.rows;
        var grid = this.getGridDetails();
        if (grid['cell_count'] > 1 ) {
            for (var x = 0; x < grid['row_count']; x++) {
                delete rows[x][grid['cell_count']-1];
                grid['next_cell_id']++;
            }
            this.setState({rows: rows});
        }
    },
    render: function() {
        var body = this.getTableBody();
        return (
            <div className="col-xs-9" id="grid-container">
                <h1>Grid</h1>
                <table>
                    {body}
                </table>
            </div>
        )
    }
});