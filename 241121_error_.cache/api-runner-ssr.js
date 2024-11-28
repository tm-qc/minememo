var plugins = [{
      name: 'gatsby-remark-autolink-headers',
      plugin: require('F:/my_blog/static_genelator/gatsby/minememo/node_modules/gatsby-remark-autolink-headers/gatsby-ssr.js'),
      options: {"plugins":[],"className":"toc-icon","elements":["h2","h3","h4","h5"],"offsetY":0},
    },{
      name: 'gatsby-plugin-image',
      plugin: require('F:/my_blog/static_genelator/gatsby/minememo/node_modules/gatsby-plugin-image/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: '@isamrish/gatsby-plugin-google-adsense',
      plugin: require('F:/my_blog/static_genelator/gatsby/minememo/node_modules/@isamrish/gatsby-plugin-google-adsense/gatsby-ssr.js'),
      options: {"plugins":[],"googleAdClientId":"ca-pub-5030891386703426","head":false},
    },{
      name: 'default-site-plugin',
      plugin: require('F:/my_blog/static_genelator/gatsby/minememo/gatsby-ssr.js'),
      options: {"plugins":[]},
    },{
      name: 'partytown',
      plugin: require('F:/my_blog/static_genelator/gatsby/minememo/node_modules/gatsby/dist/internal-plugins/partytown/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
/* global plugins */
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

function augmentErrorWithPlugin(plugin, err) {
  if (plugin.name !== `default-site-plugin`) {
    // default-site-plugin is user code and will print proper stack trace,
    // so no point in annotating error message pointing out which plugin is root of the problem
    err.message += ` (from plugin: ${plugin.name})`
  }

  throw err
}

export function apiRunner(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  plugins.forEach(plugin => {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      return
    }

    try {
      const result = apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  })

  return results.length ? results : [defaultReturn]
}

export async function apiRunnerAsync(api, args, defaultReturn, argTransform) {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  const results = []
  for (const plugin of plugins) {
    const apiFn = plugin.plugin[api]
    if (!apiFn) {
      continue
    }

    try {
      const result = await apiFn(args, plugin.options)

      if (result && argTransform) {
        args = argTransform({ args, result })
      }

      // This if case keeps behaviour as before, we should allow undefined here as the api is defined
      // TODO V4
      if (typeof result !== `undefined`) {
        results.push(result)
      }
    } catch (e) {
      augmentErrorWithPlugin(plugin, e)
    }
  }

  return results.length ? results : [defaultReturn]
}
