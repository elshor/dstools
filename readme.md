Dstools - Data Science Tools for Javascript
===========================================

dstools is a collection of tools that assist in analyzing and visualizing data using Javascript code inside Jupyter notebooks. Its main features are:
* All functions are chainable (jQuery style)
* Import csv data files from the web or file system (using `csv` package)
* Statistical analysis using jStat package
* Show data as tables within Jupyter notebooks
* Visualize data using plotly javascript library within Jupyter notebooks

Function reference and jsdoc based documentation can be found at https://elshor.github.io/dstools/

## Installing dstools
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

Here is a more elaborate example taken from a [medium post](https://medium.com/@elshor/learning-to-talk-about-wine-using-javascript-7b59d0e0a0f):
```js
const Collection = require('dstools').Collection;
Collection()
.loadCSV('/home/elshor/data/winemag-data-130k-v2.csv')//load the data
.terms({field:'description'}).dropStopwords('term')
.sortDesc('count').head(50)
.wordCloud('term','count')//arguments are label and measure
.show();//show the wordcloud in Jupyter notebook
```

## Function Reference
Function reference and jsdoc based documentation can be found at https://elshor.github.io/dstools/
## Additional Statistical Functions
The following jStat functions take as argument the field name and return the jStat function with the column vector as its argument. The following functions are supported: `sum,sumsqrd,sumsqerr,product,min,max,mean,meansqerr,geomean,median,cumsum,cumprod,diff,rank,range,variance,deviation,stdev,skewness,kurtosis,coeffvar,quartiles,quantiles,percentile`. Consult the [jStat](https://jstat.github.io/all.html) documentation for details.

## License
Dstools is licensed under the MIT License