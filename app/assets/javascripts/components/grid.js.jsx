var Cell = React.createClass({
    render: function() {
        return (
            <td className={this.props.symbol} id={this.props.cell_id} />
        )
    }
});

var Row = React.createClass({
    render: function() {
        var cells = this.props.cells;
        var reactCells = [];
        for (var cell in cells) {
            if (cells.hasOwnProperty(cell)) {
                var cell_id = cells[cell]['cell_id'];
                var symbol = cells[cell]['symbol'];
                reactCells.push(<Cell symbol={symbol} cell_id={cell_id} key={cell_id} />);
            }
        }
        return (
            <tr>
                {reactCells}
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
    getRows: function() {
        var rawRows = this.state.rows;
        var rows = [];
        for (var row in rawRows) {
            if (rawRows.hasOwnProperty(row)) {
                var cells = rawRows[row];
                rows.push(<Row cells={cells} key={row} />);
            }
        }
        return (
            <tbody>
                {rows}
            </tbody>
        )
    },
    render: function() {
        var rows = this.getRows();
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

ReactDOM.render(
    <Grid getGrid="/grid" />,
    document.getElementById('grid-container')
);