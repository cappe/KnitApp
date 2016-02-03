var Cell = React.createClass({
    render: function() {
        return (
            <td
                className={this.props.symbol}
                id={this.props.cell_id}
                onClick={this.props.onClick}
            />
        )
    }
});

var Row = React.createClass({
    render: function() {
        var cells = this.props.cells;
        var react_cells = [];
        var object = this;
        for (var cell in cells) {
            if (cells.hasOwnProperty(cell)) {
                var cell_id = cells[cell]['cell_id'];
                var symbol = cells[cell]['symbol'];
                react_cells.push(<Cell
                    symbol={symbol}
                    cell_id={cell_id}
                    key={cell_id}
                    onClick={object.props.onClick}
                    currentTool={object.props.currentTool}
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
    handleCellClick: function(e) {
        var target_cell_id = e.target.id;
        var rows = this.state.rows;
        var row_keys = Object.keys(rows);
        var found = false;
        for (i in row_keys) {
            var row = rows[row_keys[i]];
            for (var k = 0; k < Object.keys(row).length; k++) {
                var cell_id = rows[row_keys[i]][k].cell_id;
                if (cell_id == target_cell_id) {
                    rows[row_keys[i]][k].symbol = this.props.currentTool;
                    found = true;
                    break;
                }
            }
            if (found) break;
        }
        this.setState({rows: rows});
    },
    getTableBody: function() {
        var rows = this.state.rows;
        var react_rows = [];
        var object = this;
        for (var row in rows) {
            if (rows.hasOwnProperty(row)) {
                var cells = rows[row];
                react_rows.push(<Row
                    cells={cells}
                    key={row}
                    onClick={object.handleCellClick}
                    currentTool={object.props.currentTool}
                />);
            }
        }
        return (
            <tbody>
                {react_rows}
            </tbody>
        )
    },
    render: function() {
        var rows = this.getTableBody();
        return (
            <div>
                <h1>Grid</h1>
                <table>
                    {rows}
                </table>
            </div>
        )
    }
});