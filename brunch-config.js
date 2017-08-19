exports.npm = {
    globals: {
        Inferno: 'inferno',
        Component: 'inferno-component'
    }
}

exports.files = {
    javascripts: {
        entryPoints: {
            'app/initialize.tsx': 'app.js'
        },
        joinTo: 'app.js'
    },
    stylesheets: {
        joinTo: 'app.css'
    }
}

exports.modules = {
    autoRequire: {
        'app.js': ['initialize']
    }
}

exports.plugins = {
    brunchTypescript: {
        strictNullChecks: true,
        jsx: 'preserve'
    }
}