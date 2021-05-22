# belly_button_DOMAICA

## Main folder for solution is called: 'belly_button_DOMAICA'

Inside that root folder, we can find 3 files:

- 'index.html' with code for the webpage for the project.
- 'README.md' -> Markdown with project explanation.
- 'README.pptx' -> Powerpoint containing screenshots, explaining process and main images of the outcomes, of webpages and additional details.

And 2 additional folders in proper sequence:

- 'images'
- 'static'

### - Subfolder 'static' contains:

- 'static/data' subfolder which contains a 'samples.json' (data) file with the sample statistical infos collected for the project that will be used to analyze and plot visualizations.
    
- 'static/js' subfolder with and 'app.js' (coding) file invoked from html containing the javascript code.
  


### - Subfolder 'images': 

It is not very relevant. It contains initial pictures provided for instructions + color palettes with hexadecimal coding to be used as reference to choose colors for display visualizations.


### - Cross-origin resource sharing (CORS)

 CORS is a mechanism that restricts access to resources on a web page being requested from another domain outside the domain from which the first resource was served.
 
This project has been done by accessing the folder where "index.html" was located with command prompt, activate python and run the command 'python -m http.server'. This python command allows for separating Python code implementing an application’s logic from the HTML (or other) output that it produces. Therefore it lets us to work avoiding CORS security checks.

After running that command, you can access your webpage by browsing in 'localhost:8000' and see the results of your html and js development.

