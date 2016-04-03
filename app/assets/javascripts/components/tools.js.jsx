var symbols = ['square', 'line', 'triangle'];
var colors = [
	{'title': 'Blue',	'value':	'#0400FF'},
	{'title': 'Green',	'value':	'#1CFF00'},
	{'title': 'Red',	'value':	'#FF0000'},
	{'title': 'Gray',	'value':	'#FF02ED'},
	{'title': 'Black',	'value':	'#000000'},
	{'title': 'Pink',	'value':	'#FF01F2'},
];

var RadioButton = React.createClass({
    render: function() {
        var symbol = this.props.symbol;
        var checked = this.props.currentSymbol == symbol;
        return (
            <div className="row">
                <input
                    type="radio"
                    name="symbol"
                    value={symbol}
                    checked={checked}
					onChange={this.props.onToolChange}
                    id={symbol}
					className="symbol"
                />
                <label htmlFor={symbol}>
                    {symbol.charAt(0).toUpperCase() + symbol.slice(1)}
                </label>
            </div>
        )
    }
});

var Color = React.createClass({
	render: function() {
		return (
				<div className="color"
					 style={{backgroundColor: this.props.value}}
					 onClick={this.props.onToolChange}></div>
		)
	}
});

var ColorPicker = React.createClass({
	getColors: function() {
		var row = [];
		var rows = [];

		for (var index = 0; index <= colors.length; index++) {
			var color = colors[index];

			if (index % 3 == 0 && index !== 0) {
				rows.push(<div className="colorRow" key={index}>{row}</div>);
				row = [];
			}

			if (!color) break;

			row.push(<Color
					key={index}
					title={color.title}
					value={color.value}
					onToolChange={this.props.onToolChange} />);
		}
		return rows;
	},

	render: function() {
		var colors = this.getColors();

		return (
			<div id="color-picker">
				{colors}
			</div>
		)
	}
});

var Tools = React.createClass({
    render: function() {
        return (
            <div className="col-xs-3" id="tools-container">
                <h1>Tools</h1>
                <div className="symbol-container">
                    {symbols.map(function(symbol, i) {
                        return <RadioButton
							symbol={symbol}
                            key={i}
                            currentSymbol={this.props.currentSymbol}
							onToolChange={this.props.onToolChange}
                        />
                    }.bind(this))}
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
				<ColorPicker
						onToolChange={this.props.onToolChange} />
            </div>
        )
    }
});