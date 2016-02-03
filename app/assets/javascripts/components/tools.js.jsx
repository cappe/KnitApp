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
            <div>
                <h1>Tools</h1>
                <div>
                    {tools.map(function(tool, i) {
                        return <RadioButton
                            tool={tool}
                            key={i}
                            currentTool={object.props.currentTool}
                            onChange={object.props.onChange}
                        />
                    })}
                </div>
            </div>
        )
    }
});