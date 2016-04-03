//= require components/tools
//= require components/grid

var Canvas = React.createClass({
    getInitialState: function() {
        return {
            current_symbol: 'square',
			current_color: '#8DFF62',
			current_tool: 'color'
        }
    },
	/*
	handleCellClick: function(e) {
		console.log("cell clicked");
	},
	*/
	handleToolChange: function(e) {
		var tool = $(e.target).attr('class');
		if (tool === 'symbol') {
			var new_symbol = e.target.value;
			this.setState({ current_symbol: new_symbol });
		} else if (tool === 'color') {
			var new_color = $(e.target).css('backgroundColor');
			this.setState({ current_color: new_color })
		}
		this.setState({ current_tool: tool });
	},
	/*
    handleSymbolChange: function(e) {
        var new_symbol = e.target.value;
        this.setState({ current_symbol: new_symbol });
    },
	handleColorChange: function(e) {
		var new_color = $(e.target).css('backgroundColor');
		this.setState({ current_color: new_color });
	},
	*/
    addRow: function() {
        this.refs.grid.handleAddRow();
    },
    addCol: function() {
        this.refs.grid.handleAddCol();
    },
    removeRow: function() {
        this.refs.grid.handleRemoveRow();
    },
    removeCol: function() {
        this.refs.grid.handleRemoveCol();
    },
    save: function() {
        this.refs.grid.handleSave();
    },
    getGrid: function() {
        return (
            <Grid
                getGrid="/grid"
                saveGrid="/save"
                ref="grid"
                currentSymbol={this.state.current_symbol}
				currentColor={this.state.current_color}
				currentTool={this.state.current_tool}
            />
        )
    },
    getTools: function() {
        return (
            <Tools
                currentSymbol={this.state.current_symbol}
				currentColor={this.state.current_color}
				onToolChange={this.handleToolChange}
                addRow={this.addRow}
                addCol={this.addCol}
                removeRow={this.removeRow}
                removeCol={this.removeCol}
                save={this.save}
            />
        )
    },
    render: function() {
        var tools = this.getTools();
        var grid = this.getGrid();
        return (
            <div id="canvas">
                {tools}
                {grid}
            </div>
        )
    }
});

ReactDOM.render(
    <Canvas />,
    document.getElementById('main')
);