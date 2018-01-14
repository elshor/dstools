Dstools - Data Science Tools for Javascript
===========================================

dstools is a collection of tools that assist in analyzing and visualizing data using Javascript code inside Jupyter notebooks. Its main features are:
* All functions are chainable (jQuery style)
* Import csv data files from the web or file system (using `csv` package)
* Statistical analysis using jStat package
* Show data as tables within Jupyter notebooks
* Visualize data using plotly javascript library within Jupyter notebooks

Installing dstools
-------------------
Install dstools using npm

```bash
npm install dstools
```

When using dstools from Jupyter notebooks with the IJavascript kernel, the package should be installed in the same directory as the notebook.

## Getting Started
First step in handling data is usually loading the data
```js
const Collection = require('dstools').Collection;
const data = Collection().loadCSV('data.csv');
```

Alternatively, the data can be wrapped using the Collection function:
```js
const data = Collection([{field1:2,field2:4},{field1:3,field2:5}]);
```

inside the Jupyter notebook, the data can be displayed as a table using the `show` function.
```js
data.show();
```
The data will be displayed as an HTML table.

Visualizations are possible using the various visualization functions.
```js
data.histogram('field1').show();
```
When the code is executed inside a Jupyter notebook, it will display a histogram using the plotly javascript library.

The `data` function can be used to get the underlying data
```js
console.log(data.data());
```
The html function can be used to wrap html text. Subsequent calls of the `show` function will display the html in the Jupyter notebook.

## Function Reference
* `loadCSV(path, options)` - load a csv file from file system or web. First argument is path to file or url of file. Second argument is options for csv load function as documented [here](http://csv.adaltas.com/parse/)
* `show()` - display a data collection as an HTML table or a visualization as HTML. When executed from within Jupyter notebook using the IJavascript kernel, displays the object in the notebook. Otherwise, prints the HTML to the standard output
* `do(function(data){})` - executes a function. the function takes as its argument the underlying data
* `column(field)` - extract a column from the data. First argument is property name or a function that takes the data object as input and returns the vector item value. Function returns an array of values. First argument can also be a vector of field definitions (field name or function). In this case, the return value will be an array of arrays
* `fields()` - list of fields of the underlying data
* `map(function(data))` - Similar to array map function
* `head(n)` - return the first n elements in the collection. Default to 5
* `tail(n)` - return the last n elements in the collection. Default to 5
* `groupBy(field)` - group all data element by a specific field. The response is an array of groups - each one in the format `{key:groupFieldName,data:[1,2,3]}`
* `filterEqual(field,value)` - filter data elements leaving all elements where field=value
* `describe(field)` - generate a table with key distribution measures such as average, stdev and quartiles
* `count(field)` - count number of elements in a field, ignoring `null` and `undefined`
* `plotly(data,options)` - Generate an HTML text displaying a plotly visualization. Consult [plotly](https://plot.ly/javascript/) documentation as reference.
* `boxPlot(groupField, dataField)` Generate a plotly boxplot.
* `corrmap()` - Generate a correlation map
* `scatterPlot(fieldX,fieldY)` - generate a scatter plot with fieldX on the X axis and fieldY on the Y axis

## Additional Statistical Functions
The following jStat functions take as argument the field name and return the jStat function with the column vector as its argument. The following functions are supported: `sum,sumsqrd,sumsqerr,product,min,max,mean,meansqerr,geomean,median,cumsum,cumprod,diff,rank,range,variance,deviation,stdev,skewness,kurtosis,coeffvar,quartiles,quantiles,percentile`. Consult the [jStat](https://jstat.github.io/all.html) documentation for details.

## License
Dstools is licensed under the MIT License