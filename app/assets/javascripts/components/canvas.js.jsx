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
    getGrid: function() {
        return (
            <Grid
                getGrid="/grid"
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
            />
        )
    },
    render: function() {
        var tools = this.getTools();
        var grid = this.getGrid();
        return (
            <div>
                <div className="col-xs-3" id="tools-container">
                    {tools}
                </div>
                <div className="col-xs-9" id="grid-container">
                    {grid}
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <Canvas />,
    document.getElementById('canvas')
);