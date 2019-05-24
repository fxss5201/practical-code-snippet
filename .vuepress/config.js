module.exports = {
    title: '实用代码段',
    description: '整理实用的代码段',
    base: '/practical-code-snippet/',
    dest: 'docs',
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    contentLoading: true,
    markdown: {
        lineNumbers: true,
        toc: { includeLevel: [1, 2, 3] }
    },
    plugins: [
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        ['@vuepress/back-to-top', true],
        ['@vuepress/blog', true], 
        ['@vuepress/pwa', {
            serviceWorker: true,
            updatePopup: true
        }],
        ['@vuepress/medium-zoom', true],
        ['@vuepress/google-analytics', {
            ga: 'UA-130628058-1'
        }],
        ['@vuepress/last-updated',{
            transformer: (timestamp, lang) => {
                // 不要忘了安装 moment
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).fromNow()
            }
        }]
    ],
    themeConfig: {
        repo: 'fxss5201/practical-code-snippet',
        editLinks: true, 
        editLinkText: '帮助我们改善此页面！',
        lastUpdated: '上次更新',
        nav: [
            { text: '首页', link: '/' },
            { text: 'javascript', link: '/js/' },
            { text: 'css', link: '/css/' },
            { text: 'html', link: '/html/' },
            { text: '工具', link: '/tool/' },
            { text: '面试题', link: '/interview/' },
            { text: '更新日志', link: '/version/' },
            {
                text: '博客',
                items: [
                    {
                        text: 'fxss5201',
                        items: [
                            { text: 'CSDN博客', link: 'https://blog.csdn.net/fxss5201' },
                            { text: '个人博客', link: 'http://www.fxss5201.cn/' }
                        ]
                    }
                ]
            },
        ],
        sidebar: {
            '/js/': [
                {
                    title: 'javascript',
                    collapsable: false,
                    children: [
                        '',
                        'jsArray',
                        'jsPolyfill',
                    ]
                },
                {
                    title: 'Vue',
                    collapsable: false,
                    children: [
                        'vue',
                        'vuePlugin'
                    ]
                },
                {
                    title: 'jQuery',
                    collapsable: false,
                    children: [
                        'jQuery'
                    ]
                },
                {
                    title: 'React',
                    collapsable: false,
                    children: [
                        'React'
                    ]
                }
            ],
            '/css/': [
                {
                    title: 'css',
                    collapsable: false,
                    children: [
                        ''
                    ]
                },
                {
                    title: 'sass',
                    collapsable: false,
                    children: [
                        'sass'
                    ]
                },
                {
                    title: 'stylus',
                    collapsable: false,
                    children: [
                        'stylus'
                    ]
                }
            ],
            '/html/': [
                {
                    title: 'html',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/tool/': [
                {
                    title: '工具',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/interview/': [
                {
                    title: '面试题',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/version/': [
                {
                    title: '更新日志',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ]
        },
        serviceWorker: {
            updatePopup: true, // Boolean | Object, 默认值是 undefined.
            // 如果设置为 true, 默认的文本配置将是: 
            updatePopup: {
                message: "有新内容，点击刷新按钮进行查看。",
                buttonText: "刷新"
            }
        }
    }
}