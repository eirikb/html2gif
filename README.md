Guys...  
guys  
Guys.  
Guys listen.  
I have the best ide  
guys listen  
I have the best idea ever  
guys  
I'll put HTML  
guys  
HTML  
I'll put HTML  
guys listen here  
I'll put HTML... into a GIF.


####Seriously guys, use like this:

Include:
```HTML
<script src="http://eirikb.github.io/html2gif/dist/html2gif.min.js"></script>
```

Code:
```JavaScript
var html2Gif = new Html2Gif(<element>);
html2Gif.oncomplete = function(dataUri) {};
html2Gif.start(<delay>, <times to run>);
```

Start/stop can be done manually by omitting delay and times to run, then calling `snap` and finally `end`:
```JavaScript
var html2Gif = new Html2Gif(<element>);
html2Gif.oncomplete = function(dataUri) {};
html2Gif.start();
html2Gif.snap();
html2Gif.end();
```
