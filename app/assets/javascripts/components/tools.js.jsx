var tools = ['square', 'line', 'triangle'];

var RadioButton = React.createClass({
    render: function() {
        var tool = this.props.tool;
        var checked = this.props.currentTool == tool;
        return (
            <div className="row">
                <input
                    type="radio"
                    name="tool"
                    value={tool}
                    checked={checked}
                    onChange={this.props.onChange}
                    id={tool}
                />
                <label htmlFor={tool}>
                    {tool.charAt(0).toUpperCase() + tool.slice(1)}
                </label>
            </div>
        )
    }
});

var Tools = React.createClass({
    render: function() {
        var object = this;
        return (
            <div className="col-xs-3" id="tools-container">
                <h1>Tools</h1>
                <div className="symbol-container">
                    {tools.map(function(tool, i) {
                        return <RadioButton
                            tool={tool}
                            key={i}
                            currentTool={object.props.currentTool}
                            onChange={object.props.onChange}
                        />
                    })}
                </div>
                <div className="button-container btn-group-vertical btn-group-sm" role="group">
                    <button
                        type="button"
                        onClick={this.props.addRow}
                        className="btn btn-default">Add row</button>
                    <button
                        type="button"
                        onClick={this.props.addCol}
                        className="btn btn-default">Add col</button>
                    <button
                        type="button"
                        onClick={this.props.removeRow}
                        className="btn btn-default">Remove row</button>
                    <button
                        type="button"
                        onClick={this.props.removeCol}
                        className="btn btn-default">Remove col</button>
                    <button
                        type="button"
                        onClick={this.props.save}
                        className="btn btn-default">Save</button>
                </div>
                <div id="color-picker"></div>
            </div>
        )
    }
});