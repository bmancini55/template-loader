template-loader
===============

Provides a simple template loader


You can register a template with the loader via:
```
// Registration with the page
templateLoader.register({ key: "ipcheck", path: "/content/templates/ipcheck.html" });
```

And then you can access the template via:

```
// Use the templates
function doSomething(obj)
  // compile the template
  var ipcheckTemplateCompiled = Handlebars.compile(templateLoader.html("ipcheck"));

  // run the temlate
  var html = ipcheckTemplateCompiled(myobj);

  // do stuff
})
```
