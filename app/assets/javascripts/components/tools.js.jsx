var tools = ['square', 'line', 'triangle'];

var RadioButton = React.createClass({
    render: function() {
        var tool = this.props.tool;
        return (
            <div className="row">
                <input
                    type="radio"
                    name="tool"
                    value={tool}
                    onChange={this.props.onChange}
                    id={tool} />
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
                            onChange={object.props.onChange}
                        />
                    })}
                </div>
            </div>
        )
    }
});