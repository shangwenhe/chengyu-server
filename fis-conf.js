
// 删除部上线内容
    fis.set('project.ignore', [
        'output/**',
        'test/**',
        'browser/**',
        '**.sh',
        '**.md',
        'fis-conf.js'
    ])
    .match('**.js', {
        isMod: false,
        release: '$0',
        useHash: false
    })
    .match('*', {
        domain: 'http://v6.baidu.com',
        deploy: [
            fis.plugin('local-deliver', {
                to: '/home/wwwroot/yiajie/chengyu'
            })
        ]
    });
