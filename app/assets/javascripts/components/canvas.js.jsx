//= require components/tools
//= require components/grid

var Canvas = React.createClass({
    getInitialState: function() {
        return {
            current_tool: 'square'
        }
    },
    handleToolChange: function(e) {
        var new_tool = e.target.value;
        this.setState({current_tool: new_tool});
    },
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
                currentTool={this.state.current_tool}
            />
        )
    },
    getTools: function() {
        return (
            <Tools
                currentTool={this.state.current_tool}
                onChange={this.handleToolChange}
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